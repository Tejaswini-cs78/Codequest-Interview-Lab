export const MODES = {
  FIND_MISTAKE: 'FIND_MISTAKE',
  WRITE_FROM_SCRATCH: 'WRITE_FROM_SCRATCH',
  PREDICT_OUTPUT: 'PREDICT_OUTPUT',
  FILL_MISSING_CODE: 'FILL_MISSING_CODE',
};

export const LANGUAGES = {
  PYTHON: 'python',
  C: 'c',
  JAVA: 'java',
  SQL: 'sql',
};

export const questions = [
  // ==========================================
  // MODE 1: FIND THE MISTAKE & RUN (Python, C, Java)
  // ==========================================
  {
    id: 'm1-py-1',
    mode: MODES.FIND_MISTAKE,
    language: LANGUAGES.PYTHON,
    executionType: 'function',
    functionName: 'sum_of_evens',
    category: 'Loops & Conditions',
    difficulty: 'Easy',
    title: 'Off-by-One in Sum of Evens',
    question: 'Find and fix the mistake in the code below so that it correctly calculates the sum of all even numbers from 1 to N (inclusive).',
    description: 'The code is supposed to take an integer N and print the sum of all even numbers between 1 and N inclusive. Currently, it misses N when N is even because of a loop range error.',
    starterCode: `def sum_of_evens(n):
    total = 0
    # MISTAKE: range(1, n) stops before n
    for i in range(1, n):
        if i % 2 == 0:
            total += i
    return total

print(sum_of_evens(10))`,
    solutionCode: `def sum_of_evens(n):
    total = 0
    for i in range(1, n + 1):
        if i % 2 == 0:
            total += i
    return total

print(sum_of_evens(10))`,
    testCases: [
      { id: 1, input: '10', expectedOutput: '30' },
      { id: 2, input: '6', expectedOutput: '12' },
      { id: 3, input: '1', expectedOutput: '0' },
    ],
    explanation: 'In Python, `range(1, n)` excludes `n`. Changing it to `range(1, n + 1)` includes `n` in the sum.'
  },
  {
    id: 'm1-py-2',
    mode: MODES.FIND_MISTAKE,
    language: LANGUAGES.PYTHON,
    executionType: 'function',
    functionName: 'is_palindrome',
    category: 'Strings',
    difficulty: 'Easy',
    title: 'Palindrome Check Logic Error',
    question: 'Find and fix the mistake in the palindrome checking function.',
    description: 'The function `is_palindrome` should return `True` if a string is a palindrome (reads same forward and backward) and `False` otherwise. Fix the string comparison bug.',
    starterCode: `def is_palindrome(s):
    # MISTAKE: s[::-1] is compared with s.lower(), but s is not lowercased first
    cleaned = s.lower()
    return s == cleaned[::-1]

print(is_palindrome("Racecar"))`,
    solutionCode: `def is_palindrome(s):
    cleaned = s.lower()
    return cleaned == cleaned[::-1]

print(is_palindrome("Racecar"))`,
    testCases: [
      { id: 1, input: '"Racecar"', expectedOutput: 'True' },
      { id: 2, input: '"hello"', expectedOutput: 'False' },
      { id: 3, input: '"Madam"', expectedOutput: 'True' },
    ],
    explanation: 'The code compared original string `s` ("Racecar") with `cleaned[::-1]` ("racecar"), causing case sensitivity mismatches. Compare `cleaned` with `cleaned[::-1]`.'
  },
  {
    id: 'm1-py-3',
    mode: MODES.FIND_MISTAKE,
    language: LANGUAGES.PYTHON,
    executionType: 'function',
    functionName: 'reverse_words',
    category: 'Strings & Arrays',
    difficulty: 'Easy',
    title: 'Reverse Words in a String',
    question: 'Find and fix the mistake so that the function reverses the order of words in a sentence, not the characters.',
    description: 'The function `reverse_words(s)` should take a sentence string and return a new string with the words in reverse order separated by spaces.',
    starterCode: `def reverse_words(s):
    words = s.split()
    # MISTAKE: Reverses the entire joined string characters instead of the word list
    return " ".join(words)[::-1]

print(reverse_words("the sky is blue"))`,
    solutionCode: `def reverse_words(s):
    words = s.split()
    return " ".join(words[::-1])

print(reverse_words("the sky is blue"))`,
    testCases: [
      { id: 1, input: '"the sky is blue"', expectedOutput: 'blue is sky the' },
      { id: 2, input: '"hello world"', expectedOutput: 'world hello' },
      { id: 3, input: '"CodeQuest Lab"', expectedOutput: 'Lab CodeQuest' },
    ],
    explanation: '`" ".join(words)[::-1]` reverses all individual characters ("eulb si yks eht"). Slicing the list `words[::-1]` reverses the word order ("blue is sky the").'
  },
  {
    id: 'm1-py-4',
    mode: MODES.FIND_MISTAKE,
    language: LANGUAGES.PYTHON,
    executionType: 'function',
    functionName: 'is_prime',
    category: 'Math & Logic',
    difficulty: 'Easy',
    title: 'Prime Number Checker',
    question: 'Find and fix the loop condition and boundary error in the prime checking function.',
    description: 'The function `is_prime(n)` should return `True` if `n` is a prime number and `False` otherwise. Currently it marks 1 as prime and divides `n` by `n`.',
    starterCode: `def is_prime(n):
    # MISTAKE: 1 is considered prime, and range(2, n + 1) checks n % n == 0
    if n < 1:
        return False
    for i in range(2, n + 1):
        if n % i == 0:
            return False
    return True

print(is_prime(7))`,
    solutionCode: `def is_prime(n):
    if n <= 1:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

print(is_prime(7))`,
    testCases: [
      { id: 1, input: '7', expectedOutput: 'True' },
      { id: 2, input: '4', expectedOutput: 'False' },
      { id: 3, input: '1', expectedOutput: 'False' },
      { id: 4, input: '13', expectedOutput: 'True' },
    ],
    explanation: '1 is not a prime number (condition should be `n <= 1`). The loop should only check up to `int(n**0.5) + 1` or `n`, without checking `n % n == 0`.'
  },
  {
    id: 'm1-c-1',
    mode: MODES.FIND_MISTAKE,
    language: LANGUAGES.C,
    category: 'Pointers & Arrays',
    difficulty: 'Easy',
    title: 'Array Sum Loop Condition Bug',
    question: 'Find the mistake in the C code that causes an out-of-bounds array access.',
    description: 'The program calculates the sum of elements in an array. Fix the loop condition so it does not access past the end of the array.',
    starterCode: `#include <stdio.h>

int main() {
    int arr[5] = {10, 20, 30, 40, 50};
    int sum = 0;
    
    // MISTAKE: i <= 5 accesses arr[5] which is out of bounds
    for (int i = 0; i <= 5; i++) {
        sum += arr[i];
    }
    
    printf("%d\\n", sum);
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main() {
    int arr[5] = {10, 20, 30, 40, 50};
    int sum = 0;
    
    for (int i = 0; i < 5; i++) {
        sum += arr[i];
    }
    
    printf("%d\\n", sum);
    return 0;
}`,
    testCases: [
      { id: 1, input: '', expectedOutput: '150' },
    ],
    explanation: 'An array of size 5 has valid indices 0 to 4. Using `i <= 5` reads index 5 (undefined memory). Change `i <= 5` to `i < 5`.'
  },
  {
    id: 'm1-c-2',
    mode: MODES.FIND_MISTAKE,
    language: LANGUAGES.C,
    category: 'Functions & Operators',
    difficulty: 'Medium',
    title: 'Incorrect Swap Parameters',
    question: 'Correct the function parameters and call in C so that swapping two integers works as expected.',
    description: 'The `swap` function is attempting to swap two variables by value instead of pass-by-reference using pointers.',
    starterCode: `#include <stdio.h>

// MISTAKE: Pass-by-value does not modify caller variables
void swap(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int x = 5, y = 10;
    swap(x, y);
    printf("x=%d, y=%d\\n", x, y);
    return 0;
}`,
    solutionCode: `#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 5, y = 10;
    swap(&x, &y);
    printf("x=%d, y=%d\\n", x, y);
    return 0;
}`,
    testCases: [
      { id: 1, input: '', expectedOutput: 'x=10, y=5' },
    ],
    explanation: 'In C, arguments are passed by value. To modify caller variables, pass their addresses (`&x, &y`) and use pointer dereferencing (`int *a, int *b`).'
  },
  {
    id: 'm1-c-3',
    mode: MODES.FIND_MISTAKE,
    language: LANGUAGES.C,
    executionType: 'stdio',
    category: 'Data Types & Operators',
    difficulty: 'Easy',
    title: 'Floating-Point Average Truncation',
    question: 'Fix the integer division mistake so that the floating-point average retains decimal places.',
    description: 'The program calculates the average of three integers (5, 6, 8) and prints it with two decimal places. Currently, integer division truncates the result to 6.00 instead of 6.33.',
    starterCode: `#include <stdio.h>

int main() {
    int a = 5, b = 6, c = 8;
    // MISTAKE: Integer division truncates the quotient before assigning to float
    float avg = (a + b + c) / 3;
    printf("%.2f\\n", avg);
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main() {
    int a = 5, b = 6, c = 8;
    float avg = (a + b + c) / 3.0f;
    printf("%.2f\\n", avg);
    return 0;
}`,
    testCases: [
      { id: 1, input: '', expectedOutput: '6.33' },
    ],
    explanation: 'In C, dividing an integer by an integer performs integer division and truncates the decimal part (19 / 3 = 6). Dividing by `3.0f` promotes the operation to floating point (6.33).'
  },
  {
    id: 'm1-c-4',
    mode: MODES.FIND_MISTAKE,
    language: LANGUAGES.C,
    executionType: 'stdio',
    category: 'Strings & Pointers',
    difficulty: 'Medium',
    title: 'String Copy Buffer Null Terminator',
    question: 'Fix the null-terminator assignment in the string copy program.',
    description: 'The program copies a source string into a destination buffer. Correct the buffer termination so that it produces a valid null-terminated string.',
    starterCode: `#include <stdio.h>

int main() {
    char src[] = "Interview";
    char dest[20];
    int i = 0;
    while (src[i] != '\\0') {
        dest[i] = src[i];
        i++;
    }
    // MISTAKE: Incorrectly terminates with 'X' instead of '\\0'
    dest[i] = 'X';
    dest[i + 1] = '\\0';
    printf("%s\\n", dest);
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main() {
    char src[] = "Interview";
    char dest[20];
    int i = 0;
    while (src[i] != '\\0') {
        dest[i] = src[i];
        i++;
    }
    dest[i] = '\\0';
    printf("%s\\n", dest);
    return 0;
}`,
    testCases: [
      { id: 1, input: '', expectedOutput: 'Interview' },
    ],
    explanation: 'Strings in C must be terminated with the null character `\\0`. Setting `dest[i] = \\0` cleanly terminates the copied string.'
  },
  {
    id: 'm1-java-1',
    mode: MODES.FIND_MISTAKE,
    language: LANGUAGES.JAVA,
    category: 'Strings',
    difficulty: 'Easy',
    title: 'String Equality Comparison Bug',
    question: 'Fix the bug in the Java program comparing string content.',
    description: 'In Java, comparing Strings using `==` checks reference equality rather than content equality. Fix the comparison so it correctly evaluates string contents.',
    starterCode: `public class Main {
    public static void main(String[] args) {
        String str1 = new String("interview");
        String str2 = new String("interview");
        
        // MISTAKE: Using == instead of .equals()
        if (str1 == str2) {
            System.out.println("MATCH");
        } else {
            System.out.println("NO MATCH");
        }
    }
}`,
    solutionCode: `public class Main {
    public static void main(String[] args) {
        String str1 = new String("interview");
        String str2 = new String("interview");
        
        if (str1.equals(str2)) {
            System.out.println("MATCH");
        } else {
            System.out.println("NO MATCH");
        }
    }
}`,
    testCases: [
      { id: 1, input: '', expectedOutput: 'MATCH' },
    ],
    explanation: '`str1 == str2` compares object memory addresses, which are distinct for `new String(...)`. Use `str1.equals(str2)` to compare characters.'
  },
  {
    id: 'm1-java-2',
    mode: MODES.FIND_MISTAKE,
    language: LANGUAGES.JAVA,
    category: 'Arrays & Loops',
    difficulty: 'Medium',
    title: 'Finding Maximum Element Bug',
    question: 'Fix the initialization error in finding the maximum element of an array of negative numbers.',
    description: 'The code attempts to find the maximum number in an array. Currently, if all numbers in the array are negative, it incorrectly outputs 0.',
    starterCode: `public class Main {
    public static int findMax(int[] numbers) {
        // MISTAKE: Initializing max to 0 fails when all numbers are negative
        int max = 0;
        for (int num : numbers) {
            if (num > max) {
                max = num;
            }
        }
        return max;
    }

    public static void main(String[] args) {
        int[] nums = {-10, -5, -20, -3};
        System.out.println(findMax(nums));
    }
}`,
    solutionCode: `public class Main {
    public static int findMax(int[] numbers) {
        int max = numbers[0];
        for (int num : numbers) {
            if (num > max) {
                max = num;
            }
        }
        return max;
    }

    public static void main(String[] args) {
        int[] nums = {-10, -5, -20, -3};
        System.out.println(findMax(nums));
    }
}`,
    testCases: [
      { id: 1, input: '', expectedOutput: '-3' },
    ],
    explanation: 'Initializing `max` to 0 fails if all elements in the array are negative. Initialize `max` to `numbers[0]` or `Integer.MIN_VALUE`.'
  },
  {
    id: 'm1-java-3',
    mode: MODES.FIND_MISTAKE,
    language: LANGUAGES.JAVA,
    executionType: 'stdio',
    category: 'Arrays & Loops',
    difficulty: 'Easy',
    title: 'Array Index Out of Bounds in Count Evens',
    question: 'Fix the loop termination boundary condition to prevent an ArrayIndexOutOfBoundsException.',
    description: 'The program counts and prints how many integers in an array are even. Fix the loop boundary so that it does not exceed the valid array indices.',
    starterCode: `public class Main {
    public static void main(String[] args) {
        int[] numbers = {12, 7, 19, 24, 30, 5};
        int count = 0;
        // MISTAKE: Using <= with numbers.length accesses index 6
        for (int i = 0; i <= numbers.length; i++) {
            if (numbers[i] % 2 == 0) {
                count++;
            }
        }
        System.out.println(count);
    }
}`,
    solutionCode: `public class Main {
    public static void main(String[] args) {
        int[] numbers = {12, 7, 19, 24, 30, 5};
        int count = 0;
        for (int i = 0; i < numbers.length; i++) {
            if (numbers[i] % 2 == 0) {
                count++;
            }
        }
        System.out.println(count);
    }
}`,
    testCases: [
      { id: 1, input: '', expectedOutput: '3' },
    ],
    explanation: 'Java arrays are 0-indexed with valid indices from `0` to `length - 1`. Changing `i <= numbers.length` to `i < numbers.length` prevents `ArrayIndexOutOfBoundsException`.'
  },
  {
    id: 'm1-java-4',
    mode: MODES.FIND_MISTAKE,
    language: LANGUAGES.JAVA,
    executionType: 'stdio',
    category: 'Loops & Math',
    difficulty: 'Medium',
    title: 'Factorial Accumulator Initialization Bug',
    question: 'Fix the variable initialization bug in the factorial calculation program.',
    description: 'The program calculates the factorial of 5 (5! = 120). Currently it outputs 0 because of an incorrect accumulator initialization.',
    starterCode: `public class Main {
    public static void main(String[] args) {
        int n = 5;
        // MISTAKE: Initializing product accumulator to 0 results in 0
        int fact = 0;
        for (int i = 1; i <= n; i++) {
            fact *= i;
        }
        System.out.println(fact);
    }
}`,
    solutionCode: `public class Main {
    public static void main(String[] args) {
        int n = 5;
        int fact = 1;
        for (int i = 1; i <= n; i++) {
            fact *= i;
        }
        System.out.println(fact);
    }
}`,
    testCases: [
      { id: 1, input: '', expectedOutput: '120' },
    ],
    explanation: 'Multiplicative accumulators must be initialized to `1`, because multiplying by `0` yields `0` on every iteration.'
  },

  // ==========================================
  // MODE 2: WRITE CODE FROM SCRATCH (Python, C, Java, SQL)
  // ==========================================
  {
    id: 'm2-py-1',
    mode: MODES.WRITE_FROM_SCRATCH,
    language: LANGUAGES.PYTHON,
    category: 'Strings & Algorithms',
    difficulty: 'Easy',
    title: 'Two Sum Problem',
    question: 'Write a Python script to find two numbers in an array that add up to a target sum.',
    description: `Given a list of integers \`nums\` and an integer \`target\`, write a function or program that prints the indices of the two numbers such that they add up to \`target\`.

Example:
Input: nums = [2, 7, 11, 15], target = 9
Output: 0 1`,
    starterCode: `# Write your solution from scratch
def two_sum(nums, target):
    pass

# Read input or test function
import sys
input_data = sys.stdin.read().split()
if input_data:
    target = int(input_data[-1])
    nums = [int(x) for x in input_data[:-1]]
    
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            print(f"{seen[diff]} {i}")
            break
        seen[num] = i
`,
    solutionCode: `import sys
input_data = sys.stdin.read().split()
if input_data:
    target = int(input_data[-1])
    nums = [int(x) for x in input_data[:-1]]
    
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            print(f"{seen[diff]} {i}")
            break
        seen[num] = i`,
    testCases: [
      { id: 1, input: '2 7 11 15 9', expectedOutput: '0 1' },
      { id: 2, input: '3 2 4 6', expectedOutput: '1 2' },
      { id: 3, input: '3 3 6', expectedOutput: '0 1' },
    ]
  },
  {
    id: 'm2-py-2',
    mode: MODES.WRITE_FROM_SCRATCH,
    language: LANGUAGES.PYTHON,
    category: 'Numbers',
    difficulty: 'Easy',
    title: 'FizzBuzz Classic',
    question: 'Write a Python program that prints numbers from 1 to N with FizzBuzz rules.',
    description: `Write a program that takes an integer N from standard input and prints numbers from 1 to N on separate lines.
- For multiples of 3, print "Fizz" instead of the number.
- For multiples of 5, print "Buzz" instead of the number.
- For numbers which are multiples of both 3 and 5, print "FizzBuzz".`,
    starterCode: `import sys

def fizz_buzz(n):
    # Write your solution here
    pass

if __name__ == '__main__':
    lines = sys.stdin.read().strip().split()
    if lines:
        n = int(lines[0])
        for i in range(1, n + 1):
            if i % 15 == 0:
                print("FizzBuzz")
            elif i % 3 == 0:
                print("Fizz")
            elif i % 5 == 0:
                print("Buzz")
            else:
                print(i)
`,
    solutionCode: `import sys
lines = sys.stdin.read().strip().split()
if lines:
    n = int(lines[0])
    for i in range(1, n + 1):
        if i % 15 == 0:
            print("FizzBuzz")
        elif i % 3 == 0:
            print("Fizz")
        elif i % 5 == 0:
            print("Buzz")
        else:
            print(i)`,
    testCases: [
      { id: 1, input: '5', expectedOutput: '1\n2\nFizz\n4\nBuzz' },
      { id: 2, input: '15', expectedOutput: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz' },
    ]
  },
  {
    id: 'm2-c-1',
    mode: MODES.WRITE_FROM_SCRATCH,
    language: LANGUAGES.C,
    category: 'Arrays & Math',
    difficulty: 'Easy',
    title: 'Reverse an Array in C',
    question: 'Write a C program to read N integers and print them in reverse order.',
    description: `Write a C program that reads an integer N followed by N space-separated integers, and prints the integers in reverse order separated by spaces.

Example Input:
5 10 20 30 40 50

Example Output:
50 40 30 20 10`,
    starterCode: `#include <stdio.h>

int main() {
    // Write your solution from scratch
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[100];
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }
    for (int i = n - 1; i >= 0; i--) {
        printf("%d%s", arr[i], i == 0 ? "" : " ");
    }
    printf("\n");
    return 0;
}`,
    testCases: [
      { id: 1, input: '5 10 20 30 40 50', expectedOutput: '50 40 30 20 10' },
      { id: 2, input: '3 1 2 3', expectedOutput: '3 2 1' },
    ]
  },
  {
    id: 'm2-java-1',
    mode: MODES.WRITE_FROM_SCRATCH,
    language: LANGUAGES.JAVA,
    category: 'Strings',
    difficulty: 'Easy',
    title: 'Count Vowels in String',
    question: 'Write a Java program to count the number of vowels in a given string.',
    description: `Write a Java program that reads a string input and prints the count of vowels (a, e, i, o, u - case insensitive).

Example Input:
Interview

Example Output:
4`,
    starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // Write your code here
    }
}`,
    solutionCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String str = sc.nextLine().toLowerCase();
            int count = 0;
            for (char c : str.toCharArray()) {
                if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') {
                    count++;
                }
            }
            System.out.println(count);
        }
    }
}`,
    testCases: [
      { id: 1, input: 'Interview', expectedOutput: '4' },
      { id: 2, input: 'CodeQuest', expectedOutput: '4' },
      { id: 3, input: 'Fly', expectedOutput: '0' },
    ]
  },
  {
    id: 'm2-sql-1',
    mode: MODES.WRITE_FROM_SCRATCH,
    language: LANGUAGES.SQL,
    category: 'WHERE & Filtering',
    difficulty: 'Easy',
    title: 'High Salary Employees',
    question: 'Write an SQL query to select all employees with a salary greater than 50,000.',
    description: `Table: Employees
+-------------+-------------+---------------+---------------+
| id (INT)    | name (TEXT) | salary (INT)  | department    |
+-------------+-------------+---------------+---------------+
| 1           | Alice       | 60000         | Engineering   |
| 2           | Bob         | 45000         | Sales         |
| 3           | Charlie     | 75000         | Engineering   |
| 4           | Diana       | 50000         | HR            |
| 5           | Evan        | 90000         | Management    |
+-------------+-------------+---------------+---------------+

Write a SELECT query to retrieve the \`name\` and \`salary\` of all employees whose salary is strictly greater than 50000, ordered by salary descending.`,
    starterCode: `-- Write your SQL query below
SELECT name, salary 
FROM Employees 
WHERE ...`,
    solutionCode: `SELECT name, salary FROM Employees WHERE salary > 50000 ORDER BY salary DESC;`,
    sqlTable: {
      tableName: 'Employees',
      schema: `CREATE TABLE Employees (id INT PRIMARY KEY, name TEXT, salary INT, department TEXT);`,
      seedData: `INSERT INTO Employees VALUES (1, 'Alice', 60000, 'Engineering'), (2, 'Bob', 45000, 'Sales'), (3, 'Charlie', 75000, 'Engineering'), (4, 'Diana', 50000, 'HR'), (5, 'Evan', 90000, 'Management');`
    },
    testCases: [
      {
        id: 1,
        input: '',
        expectedOutput: JSON.stringify({
          columns: ['name', 'salary'],
          rows: [
            ['Evan', 90000],
            ['Charlie', 75000],
            ['Alice', 60000]
          ]
        })
      }
    ]
  },
  {
    id: 'm2-sql-2',
    mode: MODES.WRITE_FROM_SCRATCH,
    language: LANGUAGES.SQL,
    category: 'GROUP BY & Aggregates',
    difficulty: 'Medium',
    title: 'Department Average Salary',
    question: 'Write an SQL query to calculate the average salary for each department.',
    description: `Table: Employees
+-------------+-------------+---------------+---------------+
| id (INT)    | name (TEXT) | salary (INT)  | department    |
+-------------+-------------+---------------+---------------+
| 1           | Alice       | 60000         | Engineering   |
| 2           | Bob         | 40000         | Sales         |
| 3           | Charlie     | 80000         | Engineering   |
| 4           | Diana       | 50000         | Sales         |
+-------------+-------------+---------------+---------------+

Write a query to display the \`department\` and the average salary (\`avg_salary\`) for each department, ordered alphabetically by department name.`,
    starterCode: `-- Write your SQL query below
SELECT department, AVG(salary) AS avg_salary
FROM Employees
...`,
    solutionCode: `SELECT department, AVG(salary) AS avg_salary FROM Employees GROUP BY department ORDER BY department ASC;`,
    sqlTable: {
      tableName: 'Employees',
      schema: `CREATE TABLE Employees (id INT PRIMARY KEY, name TEXT, salary INT, department TEXT);`,
      seedData: `INSERT INTO Employees VALUES (1, 'Alice', 60000, 'Engineering'), (2, 'Bob', 40000, 'Sales'), (3, 'Charlie', 80000, 'Engineering'), (4, 'Diana', 50000, 'Sales');`
    },
    testCases: [
      {
        id: 1,
        input: '',
        expectedOutput: JSON.stringify({
          columns: ['department', 'avg_salary'],
          rows: [
            ['Engineering', 70000],
            ['Sales', 45000]
          ]
        })
      }
    ]
  },

  // ==========================================
  // MODE 3: PREDICT THE OUTPUT (Python, C, Java)
  // ==========================================
  // --- PYTHON PREDICT OUTPUT ---
  {
    id: 'm3-py-1',
    mode: MODES.PREDICT_OUTPUT,
    language: LANGUAGES.PYTHON,
    category: 'Lists & Slicing',
    difficulty: 'Easy',
    title: 'Python List Slicing & Step',
    question: 'Analyze the Python code below and select the exact output it produces.',
    instructions: 'Predict what the following code prints to standard output.',
    description: 'Analyze list slicing with start, stop, and step indices.',
    sourceCode: `nums = [10, 20, 30, 40, 50, 60]
print(nums[1:5:2])`,
    starterCode: `nums = [10, 20, 30, 40, 50, 60]
print(nums[1:5:2])`,
    options: [
      { id: 'A', text: '[20, 30, 40, 50]' },
      { id: 'B', text: '[20, 40]' },
      { id: 'C', text: '[10, 30, 50]' },
      { id: 'D', text: '[20, 40, 60]' }
    ],
    correctOption: 'B',
    expectedOutput: '[20, 40]',
    explanation: '`nums[1:5:2]` starts at index 1 (value 20), ends before index 5 (value 60), stepping by 2. The selected elements are index 1 (20) and index 3 (40).'
  },
  {
    id: 'm3-py-2',
    mode: MODES.PREDICT_OUTPUT,
    language: LANGUAGES.PYTHON,
    category: 'Variable Scope & Mutability',
    difficulty: 'Medium',
    title: 'Default Argument Mutability',
    question: 'What is the output of calling a function with a default mutable argument multiple times?',
    instructions: 'Predict what the following code prints to standard output.',
    description: 'Analyze how default parameter binding works in Python.',
    sourceCode: `def append_to(element, target=[]):
    target.append(element)
    return target

print(append_to(1))
print(append_to(2))`,
    starterCode: `def append_to(element, target=[]):
    target.append(element)
    return target

print(append_to(1))
print(append_to(2))`,
    options: [
      { id: 'A', text: '[1]\n[2]' },
      { id: 'B', text: '[1]\n[1, 2]' },
      { id: 'C', text: '[1, 2]\n[1, 2]' },
      { id: 'D', text: 'TypeError' }
    ],
    correctOption: 'B',
    expectedOutput: '[1]\n[1, 2]',
    explanation: 'In Python, default parameter values are evaluated once when the function is defined. Subsequent calls reuse the same `target` list object.'
  },
  {
    id: 'm3-py-3',
    mode: MODES.PREDICT_OUTPUT,
    language: LANGUAGES.PYTHON,
    category: 'Strings & Operators',
    difficulty: 'Easy',
    title: 'String Multiplication and Concatenation',
    question: 'What will be the output of the string multiplication and concatenation expression?',
    instructions: 'Predict what the following code prints to standard output.',
    description: 'Analyze the precedence of repetition (*) and concatenation (+) on string objects.',
    sourceCode: `text = "ab" * 3 + "c"
print(text)`,
    starterCode: `text = "ab" * 3 + "c"
print(text)`,
    options: [
      { id: 'A', text: 'abababc' },
      { id: 'B', text: 'abcabcabc' },
      { id: 'C', text: 'ababac' },
      { id: 'D', text: 'ab3c' }
    ],
    correctOption: 'A',
    expectedOutput: 'abababc',
    explanation: 'The `*` operator on strings repeats the sequence: `"ab" * 3` produces `"ababab"`. Then `"c"` is appended with `+`, resulting in `"abababc"`.'
  },
  {
    id: 'm3-py-4',
    mode: MODES.PREDICT_OUTPUT,
    language: LANGUAGES.PYTHON,
    category: 'Dictionaries & Hash Keys',
    difficulty: 'Easy',
    title: 'Dictionary Key Overwrite with Hash Equality',
    question: 'What is the length and value in the dictionary after inserting 1, 1.0, and True?',
    instructions: 'Predict what the following code prints to standard output.',
    description: 'Analyze how Python dictionaries handle keys that compare equal and produce identical hash values.',
    sourceCode: `d = {1: "one", 1.0: "one point zero", True: "boolean true"}
print(len(d), d[1])`,
    starterCode: `d = {1: "one", 1.0: "one point zero", True: "boolean true"}
print(len(d), d[1])`,
    options: [
      { id: 'A', text: '3 one' },
      { id: 'B', text: '1 boolean true' },
      { id: 'C', text: '1 one' },
      { id: 'D', text: '3 boolean true' }
    ],
    correctOption: 'B',
    expectedOutput: '1 boolean true',
    explanation: 'In Python, `1 == 1.0 == True` and their hash values are identical (`hash(1) == hash(True)`). Each subsequent key overwrites the existing entry, leaving length 1 and value "boolean true".'
  },
  {
    id: 'm3-py-5',
    mode: MODES.PREDICT_OUTPUT,
    language: LANGUAGES.PYTHON,
    category: 'Tuples & Mutability',
    difficulty: 'Medium',
    title: 'Tuple With Mutable List Inside',
    question: 'What happens when appending an element to a list stored inside a tuple?',
    instructions: 'Predict what the following code prints to standard output.',
    description: 'Determine whether mutating a collection inside an immutable container succeeds or raises an error.',
    sourceCode: `data = (1, 2, [3, 4])
data[2].append(5)
print(data)`,
    starterCode: `data = (1, 2, [3, 4])
data[2].append(5)
print(data)`,
    options: [
      { id: 'A', text: "TypeError: 'tuple' object does not support item assignment" },
      { id: 'B', text: '(1, 2, [3, 4, 5])' },
      { id: 'C', text: '(1, 2, [3, 4], 5)' },
      { id: 'D', text: '(1, 2, 5)' }
    ],
    correctOption: 'B',
    expectedOutput: '(1, 2, [3, 4, 5])',
    explanation: 'Tuples cannot have elements reassigned, but mutable elements within them (like lists) can still be modified in place. `data[2].append(5)` succeeds.'
  },
  {
    id: 'm3-py-6',
    mode: MODES.PREDICT_OUTPUT,
    language: LANGUAGES.PYTHON,
    category: 'Lists & Memory References',
    difficulty: 'Medium',
    title: 'List Variable Aliasing vs Shallow Copy',
    question: 'What are the lengths of lists a, b, and c after mutations?',
    instructions: 'Predict what the following code prints to standard output.',
    description: 'Analyze reference assignment versus shallow slicing `[:]` in Python.',
    sourceCode: `a = [1, 2, 3]
b = a
b.append(4)
c = a[:]
c.append(5)
print(len(a), len(b), len(c))`,
    starterCode: `a = [1, 2, 3]
b = a
b.append(4)
c = a[:]
c.append(5)
print(len(a), len(b), len(c))`,
    options: [
      { id: 'A', text: '3 4 5' },
      { id: 'B', text: '4 4 5' },
      { id: 'C', text: '5 5 5' },
      { id: 'D', text: '4 4 4' }
    ],
    correctOption: 'B',
    expectedOutput: '4 4 5',
    explanation: '`b = a` assigns a reference to the same list, so `b.append(4)` modifies both `a` and `b` (length 4). `c = a[:]` creates a new shallow copy, so `c.append(5)` affects only `c` (length 5).'
  },
  {
    id: 'm3-py-7',
    mode: MODES.PREDICT_OUTPUT,
    language: LANGUAGES.PYTHON,
    category: 'Functions & Closures',
    difficulty: 'Hard',
    title: 'Late Binding in Python Closures',
    question: 'What is the evaluated result of calling closures created inside a list comprehension?',
    instructions: 'Predict what the following code prints to standard output.',
    description: 'Analyze late variable binding in Python lambda expressions.',
    sourceCode: `multipliers = [lambda x: x * i for i in range(3)]
result = [m(2) for m in multipliers]
print(result)`,
    starterCode: `multipliers = [lambda x: x * i for i in range(3)]
result = [m(2) for m in multipliers]
print(result)`,
    options: [
      { id: 'A', text: '[0, 2, 4]' },
      { id: 'B', text: '[4, 4, 4]' },
      { id: 'C', text: '[0, 1, 2]' },
      { id: 'D', text: '[2, 4, 6]' }
    ],
    correctOption: 'B',
    expectedOutput: '[4, 4, 4]',
    explanation: 'Python closures bind variables by reference at execution time (late binding). When the lambdas are called, the loop has completed and `i = 2`. Each lambda evaluates `x * 2` (2 * 2 = 4).'
  },
  {
    id: 'm3-py-8',
    mode: MODES.PREDICT_OUTPUT,
    language: LANGUAGES.PYTHON,
    category: 'Operators & Evaluation',
    difficulty: 'Hard',
    title: 'Chained Comparison Evaluation',
    question: 'What does the chained comparison evaluate to in Python?',
    instructions: 'Predict what the following code prints to standard output.',
    description: 'Analyze how Python evaluates chained equality and membership operators.',
    sourceCode: `x = (False == False in [False])
print(x)`,
    starterCode: `x = (False == False in [False])
print(x)`,
    options: [
      { id: 'A', text: 'True' },
      { id: 'B', text: 'False' },
      { id: 'C', text: 'TypeError' },
      { id: 'D', text: 'None' }
    ],
    correctOption: 'A',
    expectedOutput: 'True',
    explanation: 'Chained comparisons in Python evaluate as `(False == False) and (False in [False])`. Both conditions evaluate to True, so True and True yields True.'
  },

  // --- C PREDICT OUTPUT ---
  {
    id: 'm3-c-1',
    mode: MODES.PREDICT_OUTPUT,
    language: LANGUAGES.C,
    category: 'Operators & Precedence',
    difficulty: 'Easy',
    title: 'Post-Increment vs Pre-Increment in C',
    question: 'What will be the output of the following C program?',
    instructions: 'Predict what the following code prints to standard output.',
    description: 'Analyze how `a++` and `++b` behave in C arithmetic operations.',
    sourceCode: `#include <stdio.h>

int main() {
    int a = 5, b = 5;
    int x = a++;
    int y = ++b;
    printf("%d %d %d %d\\n", a, b, x, y);
    return 0;
}`,
    starterCode: `#include <stdio.h>

int main() {
    int a = 5, b = 5;
    int x = a++;
    int y = ++b;
    printf("%d %d %d %d\\n", a, b, x, y);
    return 0;
}`,
    options: [
      { id: 'A', text: '5 6 5 6' },
      { id: 'B', text: '6 6 5 6' },
      { id: 'C', text: '6 6 6 6' },
      { id: 'D', text: '5 5 5 5' }
    ],
    correctOption: 'B',
    expectedOutput: '6 6 5 6',
    explanation: '`x = a++` assigns 5 to x then increments a to 6. `y = ++b` increments b to 6 then assigns 6 to y. So a=6, b=6, x=5, y=6.'
  },
  {
    id: 'm3-c-2',
    mode: MODES.PREDICT_OUTPUT,
    language: LANGUAGES.C,
    category: 'Data Types & Math',
    difficulty: 'Easy',
    title: 'Integer Division Truncation in C',
    question: 'What is printed when dividing two integers and assigning to float?',
    instructions: 'Predict what the following code prints to standard output.',
    description: 'Determine whether integer division truncates decimals before type promotion.',
    sourceCode: `#include <stdio.h>

int main() {
    int a = 7, b = 2;
    float c = a / b;
    printf("%.1f\\n", c);
    return 0;
}`,
    starterCode: `#include <stdio.h>

int main() {
    int a = 7, b = 2;
    float c = a / b;
    printf("%.1f\\n", c);
    return 0;
}`,
    options: [
      { id: 'A', text: '3.5' },
      { id: 'B', text: '3.0' },
      { id: 'C', text: '3.00' },
      { id: 'D', text: '4.0' }
    ],
    correctOption: 'B',
    expectedOutput: '3.0',
    explanation: 'In C, dividing two integers performs integer truncation (7 / 2 evaluates to 3). Only after that is 3 promoted to float 3.0.'
  },
  {
    id: 'm3-c-3',
    mode: MODES.PREDICT_OUTPUT,
    language: LANGUAGES.C,
    category: 'Conditions & Short-Circuit',
    difficulty: 'Easy',
    title: 'Short-Circuit Logical AND Evaluation',
    question: 'What is the value of b after the if condition evaluates?',
    instructions: 'Predict what the following code prints to standard output.',
    description: 'Analyze short-circuit evaluation of logical operators in C.',
    sourceCode: `#include <stdio.h>

int main() {
    int a = 0, b = 5;
    if (a && ++b) {
        printf("True\\n");
    }
    printf("b=%d\\n", b);
    return 0;
}`,
    starterCode: `#include <stdio.h>

int main() {
    int a = 0, b = 5;
    if (a && ++b) {
        printf("True\\n");
    }
    printf("b=%d\\n", b);
    return 0;
}`,
    options: [
      { id: 'A', text: 'b=5' },
      { id: 'B', text: 'b=6' },
      { id: 'C', text: 'True\nb=6' },
      { id: 'D', text: 'b=0' }
    ],
    correctOption: 'A',
    expectedOutput: 'b=5',
    explanation: 'In C, `&&` short-circuits if the left condition is 0 (false). Because `a == 0`, `++b` is skipped and `b` remains 5.'
  },
  {
    id: 'm3-c-4',
    mode: MODES.PREDICT_OUTPUT,
    language: LANGUAGES.C,
    category: 'Pointers & Arrays',
    difficulty: 'Medium',
    title: 'Pointer Arithmetic with Integer Array',
    question: 'What does pointer dereferencing output after advancing two elements?',
    instructions: 'Predict what the following code prints to standard output.',
    description: 'Analyze pointer addition and relative offsets in C arrays.',
    sourceCode: `#include <stdio.h>

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int *ptr = arr;
    ptr += 2;
    printf("%d %d\\n", *ptr, *(ptr - 1));
    return 0;
}`,
    starterCode: `#include <stdio.h>

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int *ptr = arr;
    ptr += 2;
    printf("%d %d\\n", *ptr, *(ptr - 1));
    return 0;
}`,
    options: [
      { id: 'A', text: '30 20' },
      { id: 'B', text: '20 10' },
      { id: 'C', text: '30 40' },
      { id: 'D', text: '20 30' }
    ],
    correctOption: 'A',
    expectedOutput: '30 20',
    explanation: '`ptr` begins at index 0 (10). `ptr += 2` advances to index 2 (30). `*(ptr - 1)` dereferences index 1 (20).'
  },
  {
    id: 'm3-c-5',
    mode: MODES.PREDICT_OUTPUT,
    language: LANGUAGES.C,
    category: 'Strings & Memory',
    difficulty: 'Medium',
    title: 'String Sizeof vs Strlen in C',
    question: 'What are the values of sizeof and strlen for the string literal array?',
    instructions: 'Predict what the following code prints to standard output.',
    description: 'Compare byte allocation with `sizeof` against string length with `strlen`.',
    sourceCode: `#include <stdio.h>
#include <string.h>

int main() {
    char str[] = "Code";
    printf("%zu %zu\\n", sizeof(str), strlen(str));
    return 0;
}`,
    starterCode: `#include <stdio.h>
#include <string.h>

int main() {
    char str[] = "Code";
    printf("%zu %zu\\n", sizeof(str), strlen(str));
    return 0;
}`,
    options: [
      { id: 'A', text: '4 4' },
      { id: 'B', text: '5 4' },
      { id: 'C', text: '4 5' },
      { id: 'D', text: '8 4' }
    ],
    correctOption: 'B',
    expectedOutput: '5 4',
    explanation: '`sizeof(str)` counts all allocated bytes including the terminating null character `\\0` (5 bytes). `strlen(str)` counts characters preceding `\\0` (4).'
  },
  {
    id: 'm3-c-6',
    mode: MODES.PREDICT_OUTPUT,
    language: LANGUAGES.C,
    category: 'Preprocessor Macros',
    difficulty: 'Medium',
    title: 'C Preprocessor Macro Expansion Precedence',
    question: 'What is the output of the macro expansion without parentheses?',
    instructions: 'Predict what the following code prints to standard output.',
    description: 'Analyze textual macro substitution and standard operator precedence.',
    sourceCode: `#include <stdio.h>
#define MULTIPLY(a, b) a * b

int main() {
    int res = MULTIPLY(2 + 3, 4);
    printf("%d\\n", res);
    return 0;
}`,
    starterCode: `#include <stdio.h>
#define MULTIPLY(a, b) a * b

int main() {
    int res = MULTIPLY(2 + 3, 4);
    printf("%d\\n", res);
    return 0;
}`,
    options: [
      { id: 'A', text: '20' },
      { id: 'B', text: '14' },
      { id: 'C', text: '24' },
      { id: 'D', text: '12' }
    ],
    correctOption: 'B',
    expectedOutput: '14',
    explanation: 'Macros substitute text verbatim: `2 + 3 * 4`. By operator precedence, multiplication occurs first: `3 * 4 = 12`, followed by addition: `2 + 12 = 14`.'
  },
  {
    id: 'm3-c-7',
    mode: MODES.PREDICT_OUTPUT,
    language: LANGUAGES.C,
    category: 'Storage Classes & Lifetime',
    difficulty: 'Hard',
    title: 'Static Local Variable Lifetime',
    question: 'What is printed across multiple calls to the function containing a static local variable?',
    instructions: 'Predict what the following code prints to standard output.',
    description: 'Analyze the persistence of static local variables versus automatic local variables.',
    sourceCode: `#include <stdio.h>

void counter() {
    static int count = 1;
    int normal = 1;
    printf("%d%d ", count++, normal++);
}

int main() {
    counter();
    counter();
    counter();
    return 0;
}`,
    starterCode: `#include <stdio.h>

void counter() {
    static int count = 1;
    int normal = 1;
    printf("%d%d ", count++, normal++);
}

int main() {
    counter();
    counter();
    counter();
    return 0;
}`,
    options: [
      { id: 'A', text: '11 11 11 ' },
      { id: 'B', text: '11 21 31 ' },
      { id: 'C', text: '11 22 33 ' },
      { id: 'D', text: '12 23 34 ' }
    ],
    correctOption: 'B',
    expectedOutput: '11 21 31 ',
    explanation: 'A `static` local variable is initialized once and preserves its value across invocations (`count` becomes 1, then 2, then 3). `normal` is re-initialized to 1 each time.'
  },

  // --- JAVA PREDICT OUTPUT ---
  {
    id: 'm3-java-1',
    mode: MODES.PREDICT_OUTPUT,
    language: LANGUAGES.JAVA,
    category: 'Inheritance & Overriding',
    difficulty: 'Medium',
    title: 'Polymorphism & Method Overriding',
    question: 'What is printed when calling an overridden method through a superclass reference?',
    instructions: 'Predict what the following code prints to standard output.',
    description: 'Analyze dynamic method dispatch in Java inheritance.',
    sourceCode: `class Animal {
    void speak() {
        System.out.print("Animal ");
    }
}

class Dog extends Animal {
    void speak() {
        System.out.print("Woof ");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal a = new Dog();
        a.speak();
    }
}`,
    starterCode: `class Animal {
    void speak() {
        System.out.print("Animal ");
    }
}

class Dog extends Animal {
    void speak() {
        System.out.print("Woof ");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal a = new Dog();
        a.speak();
    }
}`,
    options: [
      { id: 'A', text: 'Animal' },
      { id: 'B', text: 'Woof ' },
      { id: 'C', text: 'Animal Woof ' },
      { id: 'D', text: 'Compilation Error' }
    ],
    correctOption: 'B',
    expectedOutput: 'Woof ',
    explanation: 'In Java, instance methods are resolved at runtime based on the actual object type (`Dog`), not the reference type (`Animal`).'
  },
  {
    id: 'm3-java-2',
    mode: MODES.PREDICT_OUTPUT,
    language: LANGUAGES.JAVA,
    category: 'Strings & Immutability',
    difficulty: 'Easy',
    title: 'String Immutability in Java',
    question: 'What is printed after calling concat on a String without reassignment?',
    instructions: 'Predict what the following code prints to standard output.',
    description: 'Analyze how Java String objects handle concatenation without variable reassignment.',
    sourceCode: `public class Main {
    public static void main(String[] args) {
        String str = "Hello";
        str.concat(" World");
        System.out.println(str);
    }
}`,
    starterCode: `public class Main {
    public static void main(String[] args) {
        String str = "Hello";
        str.concat(" World");
        System.out.println(str);
    }
}`,
    options: [
      { id: 'A', text: 'Hello World' },
      { id: 'B', text: 'Hello' },
      { id: 'C', text: 'World' },
      { id: 'D', text: 'NullPointerException' }
    ],
    correctOption: 'B',
    expectedOutput: 'Hello',
    explanation: 'Java `String` objects are immutable. `str.concat(...)` creates and returns a new String, but `str` is not reassigned, retaining "Hello".'
  },
  {
    id: 'm3-java-3',
    mode: MODES.PREDICT_OUTPUT,
    language: LANGUAGES.JAVA,
    category: 'Strings & Operators',
    difficulty: 'Easy',
    title: 'String Concatenation Order of Operations',
    question: 'What will be printed when mixing integer addition with string concatenation?',
    instructions: 'Predict what the following code prints to standard output.',
    description: 'Analyze left-to-right operator evaluation involving integers and Strings in Java.',
    sourceCode: `public class Main {
    public static void main(String[] args) {
        System.out.println(10 + 20 + "Java" + 10 + 20);
    }
}`,
    starterCode: `public class Main {
    public static void main(String[] args) {
        System.out.println(10 + 20 + "Java" + 10 + 20);
    }
}`,
    options: [
      { id: 'A', text: '1020Java1020' },
      { id: 'B', text: '30Java30' },
      { id: 'C', text: '30Java1020' },
      { id: 'D', text: '60Java' }
    ],
    correctOption: 'C',
    expectedOutput: '30Java1020',
    explanation: 'Java evaluates expressions from left to right. `10 + 20` is arithmetic addition (`30`). `30 + "Java"` yields `"30Java"`. From then on, `+` performs string concatenation: `"30Java10"` then `"30Java1020"`.'
  },
  {
    id: 'm3-java-4',
    mode: MODES.PREDICT_OUTPUT,
    language: LANGUAGES.JAVA,
    category: 'Wrapper Classes & Caching',
    difficulty: 'Easy',
    title: 'Integer Object Cache Pool (-128 to 127)',
    question: 'What is printed when comparing boxed Integer objects using the == operator?',
    instructions: 'Predict what the following code prints to standard output.',
    description: 'Determine how the JVM Integer cache pool affects reference equality.',
    sourceCode: `public class Main {
    public static void main(String[] args) {
        Integer a = 100, b = 100;
        Integer c = 200, d = 200;
        System.out.println((a == b) + " " + (c == d));
    }
}`,
    starterCode: `public class Main {
    public static void main(String[] args) {
        Integer a = 100, b = 100;
        Integer c = 200, d = 200;
        System.out.println((a == b) + " " + (c == d));
    }
}`,
    options: [
      { id: 'A', text: 'true true' },
      { id: 'B', text: 'false false' },
      { id: 'C', text: 'true false' },
      { id: 'D', text: 'false true' }
    ],
    correctOption: 'C',
    expectedOutput: 'true false',
    explanation: 'Java caches `Integer` objects between -128 and 127. Values in this range share the same object reference (`a == b` is true). For 200, separate objects are allocated (`c == d` is false).'
  },
  {
    id: 'm3-java-5',
    mode: MODES.PREDICT_OUTPUT,
    language: LANGUAGES.JAVA,
    category: 'Exceptions & Control Flow',
    difficulty: 'Medium',
    title: 'Try-Catch-Finally Return Value Override',
    question: 'What is the return value when both try and finally blocks execute return statements?',
    instructions: 'Predict what the following code prints to standard output.',
    description: 'Analyze control flow and return value precedence in finally blocks.',
    sourceCode: `public class Main {
    public static int getValue() {
        try {
            return 10;
        } finally {
            return 20;
        }
    }

    public static void main(String[] args) {
        System.out.println(getValue());
    }
}`,
    starterCode: `public class Main {
    public static int getValue() {
        try {
            return 10;
        } finally {
            return 20;
        }
    }

    public static void main(String[] args) {
        System.out.println(getValue());
    }
}`,
    options: [
      { id: 'A', text: '10' },
      { id: 'B', text: '20' },
      { id: 'C', text: '30' },
      { id: 'D', text: 'Compilation Error' }
    ],
    correctOption: 'B',
    expectedOutput: '20',
    explanation: 'A `return` statement in a `finally` block always executes before the method finishes, overriding any previously pending return value from the `try` block.'
  },
  {
    id: 'm3-java-6',
    mode: MODES.PREDICT_OUTPUT,
    language: LANGUAGES.JAVA,
    category: 'Classes & Static Members',
    difficulty: 'Medium',
    title: 'Static Field Inheritance in Java Classes',
    question: 'What is printed after modifying an inherited static variable via the subclass?',
    instructions: 'Predict what the following code prints to standard output.',
    description: 'Analyze how static fields belong to class definitions across inheritance hierarchies.',
    sourceCode: `class Base {
    static int value = 10;
}

class Derived extends Base {}

public class Main {
    public static void main(String[] args) {
        Derived.value = 50;
        System.out.println(Base.value);
    }
}`,
    starterCode: `class Base {
    static int value = 10;
}

class Derived extends Base {}

public class Main {
    public static void main(String[] args) {
        Derived.value = 50;
        System.out.println(Base.value);
    }
}`,
    options: [
      { id: 'A', text: '10' },
      { id: 'B', text: '50' },
      { id: 'C', text: '0' },
      { id: 'D', text: 'Compilation Error' }
    ],
    correctOption: 'B',
    expectedOutput: '50',
    explanation: 'Static variables belong to the defining class (`Base`). Accessing or modifying `Derived.value` directly mutates `Base.value`, printing 50.'
  },
  {
    id: 'm3-java-7',
    mode: MODES.PREDICT_OUTPUT,
    language: LANGUAGES.JAVA,
    category: 'Methods & Overloading',
    difficulty: 'Hard',
    title: 'Method Overloading Widening vs Autoboxing',
    question: 'Which overloaded method is invoked when passing an int argument?',
    instructions: 'Predict what the following code prints to standard output.',
    description: 'Determine compiler priority between primitive widening and reference autoboxing in Java.',
    sourceCode: `public class Main {
    static void test(long n) {
        System.out.println("long");
    }
    static void test(Integer n) {
        System.out.println("Integer");
    }

    public static void main(String[] args) {
        int val = 5;
        test(val);
    }
}`,
    starterCode: `public class Main {
    static void test(long n) {
        System.out.println("long");
    }
    static void test(Integer n) {
        System.out.println("Integer");
    }

    public static void main(String[] args) {
        int val = 5;
        test(val);
    }
}`,
    options: [
      { id: 'A', text: 'Integer' },
      { id: 'B', text: 'long' },
      { id: 'C', text: 'int' },
      { id: 'D', text: 'Ambiguous method call compilation error' }
    ],
    correctOption: 'B',
    expectedOutput: 'long',
    explanation: 'In Java method resolution rules, primitive widening (`int` -> `long`) takes priority over reference autoboxing (`int` -> `Integer`). Thus, `test(long)` is invoked.'
  },

  // ==========================================
  // MODE 4: FILL THE MISSING CODE (Python, C, Java)
  // ==========================================
  {
    id: 'm4-py-1',
    mode: MODES.FILL_MISSING_CODE,
    language: LANGUAGES.PYTHON,
    executionType: 'function',
    functionName: 'factorial',
    category: 'Recursion',
    difficulty: 'Easy',
    title: 'Factorial Function Base Case',
    question: 'Complete the missing code in the recursive factorial function.',
    description: 'Fill in the placeholder `________` so that `factorial(5)` returns 120.',
    starterCode: `def factorial(n):
    if n <= 1:
        return ________
    return n * factorial(n - 1)

print(factorial(5))`,
    solutionCode: `def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(factorial(5))`,
    missingCodePlaceholder: '________',
    testCases: [
      { id: 1, input: '5', expectedOutput: '120' },
      { id: 2, input: '3', expectedOutput: '6' },
      { id: 3, input: '1', expectedOutput: '1' }
    ],
    explanation: 'The base case of factorial requires returning `1` when `n <= 1`.'
  },
  {
    id: 'm4-py-2',
    mode: MODES.FILL_MISSING_CODE,
    language: LANGUAGES.PYTHON,
    executionType: 'function',
    functionName: 'binary_search',
    category: 'Algorithms',
    difficulty: 'Medium',
    title: 'Binary Search Midpoint Calculation',
    question: 'Fill in the missing loop condition and mid calculation in Binary Search.',
    description: 'Complete the missing parts `________` and `________` in the binary search implementation.',
    starterCode: `def binary_search(arr, target):
    low = 0
    high = len(arr) - 1
    
    while low ________ high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1

print(binary_search([10, 20, 30, 40, 50], 40))`,
    solutionCode: `def binary_search(arr, target):
    low = 0
    high = len(arr) - 1
    
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1

print(binary_search([10, 20, 30, 40, 50], 40))`,
    missingCodePlaceholder: '________',
    testCases: [
      { id: 1, input: '[10, 20, 30, 40, 50], 40', expectedOutput: '3' },
      { id: 2, input: '[10, 20, 30, 40, 50], 20', expectedOutput: '1' },
      { id: 3, input: '[10, 20, 30, 40, 50], 99', expectedOutput: '-1' }
    ],
    explanation: 'In Binary Search, the loop runs while `low <= high`.'
  },
  {
    id: 'm4-c-1',
    mode: MODES.FILL_MISSING_CODE,
    language: LANGUAGES.C,
    category: 'Strings',
    difficulty: 'Easy',
    title: 'String Length Calculation in C',
    question: 'Fill in the missing character condition in the string length function.',
    description: 'Complete the missing condition `________` that checks for the end of a C string.',
    starterCode: `#include <stdio.h>

int str_length(char *str) {
    int length = 0;
    while (str[length] != ________) {
        length++;
    }
    return length;
}

int main() {
    char greeting[] = "CodeQuest";
    printf("%d\\n", str_length(greeting));
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int str_length(char *str) {
    int length = 0;
    while (str[length] != '\\0') {
        length++;
    }
    return length;
}

int main() {
    char greeting[] = "CodeQuest";
    printf("%d\\n", str_length(greeting));
    return 0;
}`,
    missingCodePlaceholder: '________',
    testCases: [
      { id: 1, input: '', expectedOutput: '9' }
    ],
    explanation: "C strings are null-terminated with the null character '\\0'."
  },
  {
    id: 'm4-java-1',
    mode: MODES.FILL_MISSING_CODE,
    language: LANGUAGES.JAVA,
    category: 'Classes & Objects',
    difficulty: 'Easy',
    title: 'Class Constructor Initialization',
    question: 'Fill in the missing keyword in the Java constructor.',
    description: 'Complete the constructor assignment using the missing keyword `________`.',
    starterCode: `public class Main {
    static class Student {
        String name;
        int age;
        
        Student(String name, int age) {
            ________.name = name;
            this.age = age;
        }
    }

    public static void main(String[] args) {
        Student s = new Student("Alex", 21);
        System.out.println(s.name + " " + s.age);
    }
}`,
    solutionCode: `public class Main {
    static class Student {
        String name;
        int age;
        
        Student(String name, int age) {
            this.name = name;
            this.age = age;
        }
    }

    public static void main(String[] args) {
        Student s = new Student("Alex", 21);
        System.out.println(s.name + " " + s.age);
    }
}`,
    missingCodePlaceholder: '________',
    testCases: [
      { id: 1, input: '', expectedOutput: 'Alex 21' }
    ],
    explanation: 'Use the `this` keyword in Java to refer to the current object instance fields.'
  }
];
