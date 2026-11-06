import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

/**
 * Executes user SQL query against a temporary SQLite database initialized with sqlTable schema and data.
 */
export async function runSqlQuery({ query, sqlTable, solutionQuery }) {
  if (!query || !query.trim()) {
    return {
      verdict: 'EMPTY_SUBMISSION',
      error: 'Please write your SQL query before running.',
    };
  }

  // Security check: Block destructive SQL operations if desired, though in-memory DB is safe
  const dangerousKeywords = ['DROP DATABASE', 'ATTACH DATABASE', 'DETACH DATABASE', 'PRAGMA'];
  for (const kw of dangerousKeywords) {
    if (query.toUpperCase().includes(kw)) {
      return {
        verdict: 'SQL_ERROR',
        error: `Forbidden operation: ${kw} is not allowed.`,
      };
    }
  }

  const schema = sqlTable?.schema || '';
  const seedData = sqlTable?.seedData || '';
  const solQuery = solutionQuery || '';

  const pyScript = `
import sqlite3
import json
import sys

schema = """${schema.replace(/"/g, '\\"')}"""
seed_data = """${seedData.replace(/"/g, '\\"')}"""
user_query = """${query.replace(/"/g, '\\"')}"""
sol_query = """${solQuery.replace(/"/g, '\\"')}"""

res = {
    "verdict": "SQL_ERROR",
    "error": None,
    "userResult": None,
    "expectedResult": None,
    "passed": False
}

try:
    conn = sqlite3.connect(":memory:")
    cursor = conn.cursor()
    
    if schema:
        cursor.executescript(schema)
    if seed_data:
        cursor.executescript(seed_data)
        
    # Execute user query
    cursor.execute(user_query)
    user_cols = [desc[0] for desc in cursor.description] if cursor.description else []
    user_rows = cursor.fetchall()
    res["userResult"] = {"columns": user_cols, "rows": user_rows}
    
    # Execute solution query if available
    if sol_query:
        cursor.execute(sol_query)
        sol_cols = [desc[0] for desc in cursor.description] if cursor.description else []
        sol_rows = cursor.fetchall()
        res["expectedResult"] = {"columns": sol_cols, "rows": sol_rows}
        
        # Check matching
        cols_match = [c.lower() for c in user_cols] == [c.lower() for c in sol_cols]
        rows_match = user_rows == sol_rows
        
        if rows_match:
            res["verdict"] = "CORRECT"
            res["passed"] = True
        else:
            res["verdict"] = "WRONG_ANSWER"
            res["passed"] = False
    else:
        res["verdict"] = "SUCCESS"
        res["passed"] = True

except sqlite3.Error as e:
    res["verdict"] = "SQL_ERROR"
    res["error"] = f"SQL Error: {str(e)}"
except Exception as e:
    res["verdict"] = "SQL_ERROR"
    res["error"] = f"Execution Error: {str(e)}"
finally:
    print(json.dumps(res))
`;

  try {
    const { stdout, stderr } = await execFileAsync('python', ['-c', pyScript], { timeout: 5000 });
    const result = JSON.parse(stdout.trim());
    return result;
  } catch (err) {
    return {
      verdict: 'SQL_ERROR',
      error: err.stderr || err.message || 'Failed to execute SQL query.',
    };
  }
}
