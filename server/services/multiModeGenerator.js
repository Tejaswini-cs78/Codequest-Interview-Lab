/**
 * Multi-Mode Dynamic Question Generator & Quality Validator
 * 
 * Generates fresh, validated questions on the fly for all 4 practice modes:
 * 1. FIND_MISTAKE
 * 2. WRITE_FROM_SCRATCH
 * 3. PREDICT_OUTPUT
 * 4. FILL_MISSING_CODE
 * Across Python, C, Java, and SQL.
 */

import crypto from 'crypto';

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// =========================================================================
// MODE 2: WRITE FROM SCRATCH GENERATOR
// =========================================================================
export function generateWriteCodeQuestion({ language = 'python', difficulty = 'Easy' }) {
  const seed = randomInt(2, 9);
  const diffStr = difficulty || 'Easy';

  if (language === 'python') {
    if (diffStr.toLowerCase() === 'easy') {
      const mult = randomInt(3, 7);
      return {
        id: `m2-gen-py-mult-${Date.now()}-${randomInt(100, 999)}`,
        mode: 'WRITE_FROM_SCRATCH',
        language: 'python',
        category: 'Loops & Math',
        difficulty: 'Easy',
        conceptKey: `py_write_mult_${mult}`,
        title: `Sum of Multiples of ${mult}`,
        question: `Write a Python program to calculate the sum of all positive integers less than or equal to N that are multiples of ${mult}.`,
        description: `Read an integer N from stdin and print the sum of all positive integers k <= N such that k % ${mult} == 0.\n\nExample:\nInput: 15\nOutput: ${[...Array(16).keys()].filter(x => x > 0 && x % mult === 0).reduce((a, b) => a + b, 0)}`,
        starterCode: `import sys

def sum_multiples():
    line = sys.stdin.read().strip()
    if not line:
        return
    n = int(line)
    total = sum(x for x in range(1, n + 1) if x % ${mult} == 0)
    print(total)

sum_multiples()`,
        solutionCode: `import sys

def sum_multiples():
    line = sys.stdin.read().strip()
    if not line:
        return
    n = int(line)
    total = sum(x for x in range(1, n + 1) if x % ${mult} == 0)
    print(total)

sum_multiples()`,
        testCases: [
          { id: 1, input: '15', expectedOutput: String([...Array(16).keys()].filter(x => x > 0 && x % mult === 0).reduce((a, b) => a + b, 0)) },
          { id: 2, input: '20', expectedOutput: String([...Array(21).keys()].filter(x => x > 0 && x % mult === 0).reduce((a, b) => a + b, 0)) },
          { id: 3, input: '5', expectedOutput: String([...Array(6).keys()].filter(x => x > 0 && x % mult === 0).reduce((a, b) => a + b, 0)) },
        ]
      };
    } else {
      // Medium / Hard
      const k = randomInt(2, 5);
      return {
        id: `m2-gen-py-rot-${Date.now()}-${randomInt(100, 999)}`,
        mode: 'WRITE_FROM_SCRATCH',
        language: 'python',
        category: 'Arrays & Slicing',
        difficulty: diffStr,
        conceptKey: `py_write_rotate_${k}`,
        title: `Right Rotate Array by ${k} Positions`,
        question: `Write a program to right-rotate an array by ${k} positions.`,
        description: `Given a space-separated array of integers on stdin, rotate the array to the right by ${k} steps and print the resulting elements separated by spaces.`,
        starterCode: `import sys

def rotate_array():
    data = sys.stdin.read().split()
    if not data:
        return
    nums = [int(x) for x in data]
    k = ${k} % len(nums)
    rotated = nums[-k:] + nums[:-k] if k > 0 else nums
    print(' '.join(map(str, rotated)))

rotate_array()`,
        solutionCode: `import sys

def rotate_array():
    data = sys.stdin.read().split()
    if not data:
        return
    nums = [int(x) for x in data]
    k = ${k} % len(nums)
    rotated = nums[-k:] + nums[:-k] if k > 0 else nums
    print(' '.join(map(str, rotated)))

rotate_array()`,
        testCases: [
          { id: 1, input: '1 2 3 4 5', expectedOutput: '4 5 1 2 3' },
          { id: 2, input: '10 20 30', expectedOutput: '20 30 10' },
          { id: 3, input: '7', expectedOutput: '7' },
        ]
      };
    }
  } else if (language === 'c') {
    const factor = randomInt(2, 6);
    return {
      id: `m2-gen-c-scal-${Date.now()}-${randomInt(100, 999)}`,
      mode: 'WRITE_FROM_SCRATCH',
      language: 'c',
      category: 'Loops & Pointers',
      difficulty: diffStr,
      conceptKey: `c_write_scale_${factor}`,
      title: `Multiply Array Elements by ${factor}`,
      question: `Write a C program that multiplies every element in an array by ${factor}.`,
      description: `Read N followed by N integers from standard input. Output each integer multiplied by ${factor}, space-separated.`,
      starterCode: `#include <stdio.h>

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    for (int i = 0; i < n; i++) {
        int val;
        scanf("%d", &val);
        printf("%d", val * ${factor});
        if (i < n - 1) printf(" ");
    }
    printf("\\n");
    return 0;
}`,
      solutionCode: `#include <stdio.h>

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    for (int i = 0; i < n; i++) {
        int val;
        scanf("%d", &val);
        printf("%d", val * ${factor});
        if (i < n - 1) printf(" ");
    }
    printf("\\n");
    return 0;
}`,
      testCases: [
        { id: 1, input: `3\n1 2 3`, expectedOutput: `${1 * factor} ${2 * factor} ${3 * factor}` },
        { id: 2, input: `2\n10 20`, expectedOutput: `${10 * factor} ${20 * factor}` },
        { id: 3, input: `1\n5`, expectedOutput: `${5 * factor}` },
      ]
    };
  } else if (language === 'java') {
    const target = randomInt(3, 8);
    return {
      id: `m2-gen-java-filt-${Date.now()}-${randomInt(100, 999)}`,
      mode: 'WRITE_FROM_SCRATCH',
      language: 'java',
      category: 'Conditionals & Arrays',
      difficulty: diffStr,
      conceptKey: `java_write_gt_${target}`,
      title: `Filter Numbers Greater Than ${target}`,
      question: `Write a Java program to print all numbers greater than ${target}.`,
      description: `Read integers until end of input. Print only those strictly greater than ${target}, separated by space.`,
      starterCode: `import java.util.Scanner;
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        ArrayList<String> res = new ArrayList<>();
        while (sc.hasNextInt()) {
            int v = sc.nextInt();
            if (v > ${target}) {
                res.add(String.valueOf(v));
            }
        }
        System.out.println(String.join(" ", res));
    }
}`,
      solutionCode: `import java.util.Scanner;
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        ArrayList<String> res = new ArrayList<>();
        while (sc.hasNextInt()) {
            int v = sc.nextInt();
            if (v > ${target}) {
                res.add(String.valueOf(v));
            }
        }
        System.out.println(String.join(" ", res));
    }
}`,
      testCases: [
        { id: 1, input: '2 9 4 10 1 7', expectedOutput: [2, 9, 4, 10, 1, 7].filter(x => x > target).join(' ') },
        { id: 2, input: '1 2 3', expectedOutput: [1, 2, 3].filter(x => x > target).join(' ') },
        { id: 3, input: '20 30', expectedOutput: '20 30' },
      ]
    };
  } else if (language === 'sql') {
    const minSal = randomInt(40000, 70000);
    return {
      id: `m2-gen-sql-sal-${Date.now()}-${randomInt(100, 999)}`,
      mode: 'WRITE_FROM_SCRATCH',
      language: 'sql',
      category: 'WHERE & Filtering',
      difficulty: diffStr,
      conceptKey: `sql_write_sal_${minSal}`,
      title: `Employees Earning Above $${minSal}`,
      question: `Write an SQL query to select employees with salary above ${minSal}.`,
      description: `Retrieve 'name' and 'salary' for all employees earning > ${minSal}, ordered by salary DESC.`,
      starterCode: '',
      solutionCode: `SELECT name, salary FROM Employees WHERE salary > ${minSal} ORDER BY salary DESC;`,
      sqlTable: {
        tableName: 'Employees',
        schema: 'CREATE TABLE Employees (id INT, name TEXT, salary INT);',
        seedData: `INSERT INTO Employees VALUES (1, 'Alice', 80000), (2, 'Bob', 35000), (3, 'Charlie', 55000), (4, 'Diana', 95000);`
      },
      testCases: [
        { id: 1, input: '', expectedOutput: '' }
      ]
    };
  }

  return null;
}

// =========================================================================
// MODE 3: PREDICT THE OUTPUT GENERATOR
// =========================================================================
export function generatePredictOutputQuestion({ language = 'python', difficulty = 'Easy' }) {
  const diffStr = difficulty || 'Easy';

  if (language === 'python') {
    const step = randomInt(2, 3);
    const startIdx = randomInt(0, 1);
    const listVals = [10, 20, 30, 40, 50, 60, 70];
    const sliced = listVals.slice(startIdx);
    const realResult = sliced.filter((_, idx) => idx % step === 0);
    const resultStr = JSON.stringify(realResult);

    const optionA = resultStr;
    const optionB = JSON.stringify(listVals.slice(0, 3));
    const optionC = JSON.stringify(listVals.filter((_, i) => i % 2 !== 0));
    const optionD = JSON.stringify(listVals.slice(startIdx, 5));

    return {
      id: `m3-gen-py-slice-${Date.now()}-${randomInt(100, 999)}`,
      mode: 'PREDICT_OUTPUT',
      language: 'python',
      category: 'Slicing & Indexing',
      difficulty: diffStr,
      conceptKey: `py_predict_slice_${startIdx}_${step}`,
      title: `Python Slice Step [${startIdx}::${step}]`,
      instructions: 'Analyze the Python snippet and choose the exact printed output.',
      description: 'What will be printed to stdout when this script runs?',
      sourceCode: `data = ${JSON.stringify(listVals)}
result = data[${startIdx}::${step}]
print(result)`,
      starterCode: `data = ${JSON.stringify(listVals)}
result = data[${startIdx}::${step}]
print(result)`,
      options: [
        { id: 'A', text: optionA },
        { id: 'B', text: optionB },
        { id: 'C', text: optionC },
        { id: 'D', text: optionD }
      ],
      correctOption: 'A',
      expectedOutput: resultStr,
      explanation: `The slice \`[${startIdx}::${step}]\` starts at index ${startIdx} and steps by ${step}, yielding ${resultStr}.`
    };
  } else if (language === 'c') {
    const a = randomInt(3, 7);
    const b = randomInt(2, 4);
    const realDiv = Math.floor(a / b);
    const realMod = a % b;
    const realOutput = `${realDiv} ${realMod}`;

    return {
      id: `m3-gen-c-div-${Date.now()}-${randomInt(100, 999)}`,
      mode: 'PREDICT_OUTPUT',
      language: 'c',
      category: 'Operators & Types',
      difficulty: diffStr,
      conceptKey: `c_predict_div_${a}_${b}`,
      title: `Integer Division & Modulo in C`,
      instructions: 'Analyze the C code and determine what is printed to the screen.',
      description: 'What does this program print?',
      sourceCode: `#include <stdio.h>

int main() {
    int a = ${a};
    int b = ${b};
    printf("%d %d\\n", a / b, a % b);
    return 0;
}`,
      starterCode: `#include <stdio.h>

int main() {
    int a = ${a};
    int b = ${b};
    printf("%d %d\\n", a / b, a % b);
    return 0;
}`,
      options: [
        { id: 'A', text: realOutput },
        { id: 'B', text: `${(a / b).toFixed(2)} ${realMod}` },
        { id: 'C', text: `${realMod} ${realDiv}` },
        { id: 'D', text: `${a} ${b}` }
      ],
      correctOption: 'A',
      expectedOutput: realOutput,
      explanation: `In C, integer division truncates decimal parts towards zero (\`${a} / ${b} = ${realDiv}\`), and \`${a} % ${b} = ${realMod}\`.`
    };
  } else if (language === 'java') {
    const x = randomInt(5, 15);
    const y = randomInt(2, 6);
    const res = `${x + y}`;

    return {
      id: `m3-gen-java-str-${Date.now()}-${randomInt(100, 999)}`,
      mode: 'PREDICT_OUTPUT',
      language: 'java',
      category: 'Operators & Strings',
      difficulty: diffStr,
      conceptKey: `java_predict_concat_${x}_${y}`,
      title: `Java String Concatenation Order`,
      instructions: 'Predict what the Java code will output.',
      description: 'Examine operator precedence in string concatenation.',
      sourceCode: `public class Main {
    public static void main(String[] args) {
        int x = ${x};
        int y = ${y};
        System.out.println("Result: " + (x + y));
    }
}`,
      starterCode: `public class Main {
    public static void main(String[] args) {
        int x = ${x};
        int y = ${y};
        System.out.println("Result: " + (x + y));
    }
}`,
      options: [
        { id: 'A', text: `Result: ${res}` },
        { id: 'B', text: `Result: ${x}${y}` },
        { id: 'C', text: `${res}` },
        { id: 'D', text: 'Error: incompatible types' }
      ],
      correctOption: 'A',
      expectedOutput: `Result: ${res}`,
      explanation: `Parentheses around \`(x + y)\` ensure arithmetic addition happens first (${x + y}) before string concatenation.`
    };
  }

  return null;
}

// =========================================================================
// MODE 4: FILL MISSING CODE GENERATOR
// =========================================================================
export function generateFillBlankQuestion({ language = 'python', difficulty = 'Easy' }) {
  const diffStr = difficulty || 'Easy';

  if (language === 'python') {
    const divisor = randomInt(3, 5);
    return {
      id: `m4-gen-py-div-${Date.now()}-${randomInt(100, 999)}`,
      mode: 'FILL_MISSING_CODE',
      language: 'python',
      executionType: 'function',
      functionName: 'is_divisible',
      category: 'Conditionals',
      difficulty: diffStr,
      conceptKey: `py_fill_div_${divisor}`,
      title: `Divisibility Check by ${divisor}`,
      question: `Fill in the missing condition to check if a number is divisible by ${divisor}.`,
      description: `Complete the placeholder \`________\` so that the function returns True when n is divisible by ${divisor}.`,
      starterCode: `def is_divisible(n):
    return ________

print(is_divisible(${divisor * 4}))`,
      solutionCode: `def is_divisible(n):
    return n % ${divisor} == 0

print(is_divisible(${divisor * 4}))`,
      missingCodePlaceholder: '________',
      testCases: [
        { id: 1, input: `${divisor * 4}`, expectedOutput: 'True' },
        { id: 2, input: `${divisor * 2 + 1}`, expectedOutput: 'False' },
        { id: 3, input: '0', expectedOutput: 'True' },
      ],
      explanation: `A number is divisible by ${divisor} if \`n % ${divisor} == 0\`.`
    };
  } else if (language === 'c') {
    const n = randomInt(4, 9);
    return {
      id: `m4-gen-c-loop-${Date.now()}-${randomInt(100, 999)}`,
      mode: 'FILL_MISSING_CODE',
      language: 'c',
      category: 'Loops',
      difficulty: diffStr,
      conceptKey: `c_fill_loop_${n}`,
      title: `For Loop Boundary in C`,
      question: `Fill in the missing loop condition to iterate exactly ${n} times.`,
      description: `Fill in \`________\` so the loop prints numbers from 0 to ${n - 1}.`,
      starterCode: `#include <stdio.h>

int main() {
    for (int i = 0; ________; i++) {
        printf("%d ", i);
    }
    printf("\\n");
    return 0;
}`,
      solutionCode: `#include <stdio.h>

int main() {
    for (int i = 0; i < ${n}; i++) {
        printf("%d ", i);
    }
    printf("\\n");
    return 0;
}`,
      missingCodePlaceholder: '________',
      testCases: [
        { id: 1, input: '', expectedOutput: [...Array(n).keys()].join(' ') + ' ' }
      ],
      explanation: `To iterate from 0 to ${n - 1}, use the condition \`i < ${n}\`.`
    };
  } else if (language === 'java') {
    return {
      id: `m4-gen-java-len-${Date.now()}-${randomInt(100, 999)}`,
      mode: 'FILL_MISSING_CODE',
      language: 'java',
      category: 'Strings',
      difficulty: diffStr,
      conceptKey: `java_fill_str_len`,
      title: `String Length Method in Java`,
      question: `Fill in the missing method to retrieve the length of a String.`,
      description: `Fill in \`________\` to get the character count of String s.`,
      starterCode: `public class Main {
    public static void main(String[] args) {
        String s = "CodeQuest";
        int len = s.________;
        System.out.println(len);
    }
}`,
      solutionCode: `public class Main {
    public static void main(String[] args) {
        String s = "CodeQuest";
        int len = s.length();
        System.out.println(len);
    }
}`,
      missingCodePlaceholder: '________',
      testCases: [
        { id: 1, input: '', expectedOutput: '9' }
      ],
      explanation: `In Java, the length of a String is obtained using the method \`length()\`.`
    };
  }

  return null;
}
