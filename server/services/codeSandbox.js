import { execFile, exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { promisify } from 'util';

const execAsync = promisify(execFile);

const GCC_DEFAULT = 'gcc';
const GCC_FALLBACK = 'C:\\Program Files (x86)\\Dev-Cpp\\MinGW64\\bin\\gcc.exe';

async function getGccExecutable() {
  return new Promise((resolve) => {
    exec('gcc --version', (err) => {
      if (!err) resolve(GCC_DEFAULT);
      else resolve(GCC_FALLBACK);
    });
  });
}

/**
 * Normalizes stdout/expectedOutput for comparison
 */
function normalizeOutput(str) {
  if (str === null || str === undefined) return '';
  return str
    .toString()
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => line.trimEnd())
    .join('\n')
    .trim();
}

/**
 * Strips temporary system directory paths from error traces for clean display
 */
function cleanErrorMessage(err) {
  if (!err) return '';
  return err
    .replace(/[A-Za-z]:\\[^ \n\r\t]+[\\/](user_solution\.py|solution\.py|runner\.py|main\.c|Main\.java)/g, '$1')
    .replace(/\/tmp\/[^ \n\r\t]+[\\/](user_solution\.py|solution\.py|runner\.py|main\.c|Main\.java)/g, '$1');
}

/**
 * Execute Python code
 */
async function executePython(code, inputStr = '', options = {}, timeout = 5000) {
  const tmpDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'cq-py-'));
  const isFunction = options.isFunction && options.functionName;

  try {
    let scriptToRun;

    if (isFunction) {
      const userScriptPath = path.join(tmpDir, 'user_solution.py');
      const runnerScriptPath = path.join(tmpDir, 'runner.py');

      await fs.promises.writeFile(userScriptPath, code, 'utf-8');

      const runnerCode = `
import sys
import io

# Suppress sample top-level prints during script definition
dummy_out = io.StringIO()
old_stdout = sys.stdout
sys.stdout = dummy_out

namespace = {'__name__': '__test__'}
try:
    with open("user_solution.py", "r", encoding="utf-8") as f:
        user_code = f.read()
    exec(compile(user_code, "user_solution.py", "exec"), namespace)
finally:
    sys.stdout = old_stdout

func_name = ${JSON.stringify(options.functionName)}
if func_name not in namespace:
    callables = [k for k, v in namespace.items() if callable(v) and not k.startswith('__')]
    if len(callables) == 1:
        func_name = callables[0]
    else:
        sys.stderr.write(f"FunctionError: Could not find function '{func_name}' in submitted code.\\n")
        sys.exit(1)

func = namespace[func_name]

input_raw = sys.stdin.read().strip()
if input_raw:
    try:
        args = eval(f"({input_raw},)")
    except Exception:
        args = (input_raw,)
else:
    args = ()

try:
    ret = func(*args)
    if ret is not None:
        print(ret)
except Exception:
    import traceback
    traceback.print_exc()
    sys.exit(1)
`;
      await fs.promises.writeFile(runnerScriptPath, runnerCode, 'utf-8');
      scriptToRun = runnerScriptPath;
    } else {
      const scriptPath = path.join(tmpDir, 'solution.py');
      await fs.promises.writeFile(scriptPath, code, 'utf-8');
      scriptToRun = scriptPath;
    }

    return await new Promise((resolve) => {
      const child = execFile(
        'python',
        [scriptToRun],
        { timeout, cwd: tmpDir, maxBuffer: 1024 * 1024 },
        (error, stdout, stderr) => {
          if (error && error.killed) {
            resolve({
              output: '',
              error: 'Execution Timed Out (Infinite loop or process exceeded 5s)',
              verdict: 'TIMEOUT',
              exitCode: 1,
            });
            return;
          }

          if (error) {
            const isSyntax = stderr.includes('SyntaxError') || stderr.includes('IndentationError');
            resolve({
              output: stdout || '',
              error: cleanErrorMessage(stderr || error.message),
              verdict: isSyntax ? 'SYNTAX_ERROR' : 'RUNTIME_ERROR',
              exitCode: error.code || 1,
            });
            return;
          }

          resolve({
            output: stdout || '',
            error: cleanErrorMessage(stderr || ''),
            verdict: 'SUCCESS',
            exitCode: 0,
          });
        }
      );

      if (inputStr) {
        child.stdin.write(inputStr);
        child.stdin.end();
      } else {
        child.stdin.end();
      }
    });
  } finally {
    try {
      await fs.promises.rm(tmpDir, { recursive: true, force: true });
    } catch (e) {
      // Ignore cleanup error
    }
  }
}

/**
 * Execute C code
 */
async function executeC(code, inputStr = '', options = {}, timeout = 5000) {
  const tmpDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'cq-c-'));
  const sourcePath = path.join(tmpDir, 'main.c');
  const exePath = path.join(tmpDir, os.platform() === 'win32' ? 'main.exe' : 'main');
  const gccCmd = await getGccExecutable();
  
  try {
    await fs.promises.writeFile(sourcePath, code, 'utf-8');
    
    // Compile step
    const compileResult = await new Promise((resolve) => {
      execFile(
        gccCmd,
        [sourcePath, '-std=c99', '-O2', '-Werror=aggressive-loop-optimizations', '-o', exePath],
        { cwd: tmpDir, timeout: 10000 },
        (error, stdout, stderr) => {
          if (error) {
            resolve({
              success: false,
              error: cleanErrorMessage(stderr || error.message),
              verdict: 'COMPILATION_ERROR',
            });
          } else {
            resolve({ success: true });
          }
        }
      );
    });

    if (!compileResult.success) {
      return {
        output: '',
        error: cleanErrorMessage(compileResult.error),
        verdict: compileResult.verdict,
        exitCode: 1,
      };
    }

    // Run step
    return await new Promise((resolve) => {
      const child = execFile(
        exePath,
        [],
        { timeout, cwd: tmpDir, maxBuffer: 1024 * 1024 },
        (error, stdout, stderr) => {
          if (error && error.killed) {
            resolve({
              output: '',
              error: 'Execution Timed Out (Infinite loop or process exceeded 5s)',
              verdict: 'TIMEOUT',
              exitCode: 1,
            });
            return;
          }

          if (error) {
            resolve({
              output: stdout || '',
              error: cleanErrorMessage(stderr || error.message),
              verdict: 'RUNTIME_ERROR',
              exitCode: error.code || 1,
            });
            return;
          }

          resolve({
            output: stdout || '',
            error: cleanErrorMessage(stderr || ''),
            verdict: 'SUCCESS',
            exitCode: 0,
          });
        }
      );

      if (inputStr) {
        child.stdin.write(inputStr);
        child.stdin.end();
      } else {
        child.stdin.end();
      }
    });
  } finally {
    try {
      await fs.promises.rm(tmpDir, { recursive: true, force: true });
    } catch (e) {
      // Ignore
    }
  }
}

/**
 * Execute Java code
 */
async function executeJava(code, inputStr = '', options = {}, timeout = 5000) {
  const tmpDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'cq-java-'));
  const sourcePath = path.join(tmpDir, 'Main.java');

  try {
    await fs.promises.writeFile(sourcePath, code, 'utf-8');

    // Compile step
    const compileResult = await new Promise((resolve) => {
      execFile(
        'javac',
        [sourcePath],
        { cwd: tmpDir, timeout: 10000 },
        (error, stdout, stderr) => {
          if (error) {
            resolve({
              success: false,
              error: cleanErrorMessage(stderr || error.message),
              verdict: 'COMPILATION_ERROR',
            });
          } else {
            resolve({ success: true });
          }
        }
      );
    });

    if (!compileResult.success) {
      return {
        output: '',
        error: cleanErrorMessage(compileResult.error),
        verdict: compileResult.verdict,
        exitCode: 1,
      };
    }

    // Run step
    return await new Promise((resolve) => {
      const child = execFile(
        'java',
        ['-cp', tmpDir, 'Main'],
        { timeout, cwd: tmpDir, maxBuffer: 1024 * 1024 },
        (error, stdout, stderr) => {
          if (error && error.killed) {
            resolve({
              output: '',
              error: 'Execution Timed Out (Infinite loop or process exceeded 5s)',
              verdict: 'TIMEOUT',
              exitCode: 1,
            });
            return;
          }

          if (error) {
            resolve({
              output: stdout || '',
              error: cleanErrorMessage(stderr || error.message),
              verdict: 'RUNTIME_ERROR',
              exitCode: error.code || 1,
            });
            return;
          }

          resolve({
            output: stdout || '',
            error: cleanErrorMessage(stderr || ''),
            verdict: 'SUCCESS',
            exitCode: 0,
          });
        }
      );

      if (inputStr) {
        child.stdin.write(inputStr);
        child.stdin.end();
      } else {
        child.stdin.end();
      }
    });
  } finally {
    try {
      await fs.promises.rm(tmpDir, { recursive: true, force: true });
    } catch (e) {
      // Ignore
    }
  }
}

/**
 * Main Code Execution Evaluator
 */
export async function runCode({ language, code, testCases = [], question = null }) {
  if (!code || !code.trim()) {
    return {
      verdict: 'EMPTY_SUBMISSION',
      passedCount: 0,
      totalCount: testCases.length,
      error: 'Please write your code before running.',
      testCaseResults: [],
    };
  }

  let execFunc;
  if (language === 'python') execFunc = executePython;
  else if (language === 'c') execFunc = executeC;
  else if (language === 'java') execFunc = executeJava;
  else {
    return { verdict: 'UNSUPPORTED_LANGUAGE', error: `Unsupported language: ${language}` };
  }

  const isFunction = (question?.executionType === 'function') || 
                     (language === 'python' && question?.functionName) ||
                     (language === 'python' && question?.mode === 'FIND_MISTAKE' && code.includes('def '));

  let functionName = question?.functionName;
  if (!functionName && isFunction && language === 'python') {
    const match = code.match(/def\s+([a-zA-Z0-9_]+)\s*\(/);
    if (match) functionName = match[1];
  }

  const execOptions = { isFunction, functionName };

  // If no test cases provided, run once with empty input
  if (!testCases || testCases.length === 0) {
    const res = await execFunc(code, '', execOptions);
    return {
      verdict: res.verdict === 'SUCCESS' ? 'CORRECT' : res.verdict,
      passedCount: res.verdict === 'SUCCESS' ? 1 : 0,
      totalCount: 1,
      output: res.output,
      error: cleanErrorMessage(res.error),
      testCaseResults: [],
    };
  }

  const testCaseResults = [];
  let allPassed = true;
  let firstErrorVerdict = null;

  for (const tc of testCases) {
    const res = await execFunc(code, tc.input || '', execOptions);
    const actualNorm = normalizeOutput(res.output);
    const expectedNorm = normalizeOutput(tc.expectedOutput);

    const passed = res.verdict === 'SUCCESS' && actualNorm === expectedNorm;

    if (!passed) {
      allPassed = false;
      if (!firstErrorVerdict && res.verdict !== 'SUCCESS') {
        firstErrorVerdict = res.verdict;
      }
    }

    testCaseResults.push({
      id: tc.id,
      input: tc.input,
      expectedOutput: tc.expectedOutput,
      actualOutput: res.output,
      error: cleanErrorMessage(res.error),
      passed,
    });

    // If compilation or syntax error occurred, stop running further test cases
    if (res.verdict === 'COMPILATION_ERROR' || res.verdict === 'SYNTAX_ERROR') {
      return {
        verdict: res.verdict,
        passedCount: 0,
        totalCount: testCases.length,
        error: cleanErrorMessage(res.error),
        testCaseResults,
      };
    }
  }

  const passedCount = testCaseResults.filter((tc) => tc.passed).length;
  const totalCount = testCaseResults.length;

  return {
    verdict: allPassed ? 'CORRECT' : (firstErrorVerdict || 'WRONG_ANSWER'),
    passedCount,
    totalCount,
    output: testCaseResults.map(tc => tc.actualOutput).filter(Boolean).join('\n'),
    testCaseResults,
  };
}
