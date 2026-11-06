/**
 * Master Curated Question Bank for CodeQuest Interview Lab
 * 
 * Contains rich, high-quality questions for:
 * - Mode 1: FIND_MISTAKE (Python, C, Java)
 * - Mode 2: WRITE_FROM_SCRATCH (Python, C, Java, SQL)
 * - Mode 3: PREDICT_OUTPUT (Python, C, Java)
 * - Mode 4: FILL_MISSING_CODE (Python, C, Java)
 * Across Easy, Medium, and Hard difficulties.
 */

export const CURATED_QUESTIONS = [
  // =========================================================================
  // MODE 2: WRITE CODE FROM SCRATCH — PYTHON
  // =========================================================================
  {
    id: 'm2-py-easy-1',
    mode: 'WRITE_FROM_SCRATCH',
    language: 'python',
    category: 'Arrays & Math',
    difficulty: 'Easy',
    title: 'Running Sum of 1D Array',
    question: 'Write a program to calculate the running sum of a list of integers.',
    description: 'Given a space-separated list of integers from stdin, print the running sum where runningSum[i] = sum(nums[0]...nums[i]).\n\nExample:\nInput: 1 2 3 4\nOutput: 1 3 6 10',
    starterCode: `# Write your solution from scratch
import sys

def running_sum():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    nums = [int(x) for x in input_data]
    # Calculate running sum and print space-separated
    result = []
    total = 0
    for num in nums:
        total += num
        result.append(str(total))
    print(' '.join(result))

running_sum()`,
    solutionCode: `import sys

def running_sum():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    nums = [int(x) for x in input_data]
    result = []
    total = 0
    for num in nums:
        total += num
        result.append(str(total))
    print(' '.join(result))

running_sum()`,
    testCases: [
      { id: 1, input: '1 2 3 4', expectedOutput: '1 3 6 10' },
      { id: 2, input: '1 1 1 1 1', expectedOutput: '1 2 3 4 5' },
      { id: 3, input: '3 1 2 10 1', expectedOutput: '3 4 6 16 17' },
    ]
  },
  {
    id: 'm2-py-easy-2',
    mode: 'WRITE_FROM_SCRATCH',
    language: 'python',
    category: 'Strings & HashMaps',
    difficulty: 'Easy',
    title: 'Valid Anagram Checker',
    question: 'Write a program to check if two strings are anagrams of each other.',
    description: 'Given two words separated by a space on stdin, print "True" if they are anagrams, or "False" otherwise (ignoring case).\n\nExample:\nInput: listen silent\nOutput: True',
    starterCode: `# Write your solution from scratch
import sys

def is_anagram():
    parts = sys.stdin.read().split()
    if len(parts) < 2:
        return
    s1, s2 = parts[0].lower(), parts[1].lower()
    print(str(sorted(s1) == sorted(s2)))

is_anagram()`,
    solutionCode: `import sys

def is_anagram():
    parts = sys.stdin.read().split()
    if len(parts) < 2:
        return
    s1, s2 = parts[0].lower(), parts[1].lower()
    print(str(sorted(s1) == sorted(s2)))

is_anagram()`,
    testCases: [
      { id: 1, input: 'anagram nagaram', expectedOutput: 'True' },
      { id: 2, input: 'rat car', expectedOutput: 'False' },
      { id: 3, input: 'Listen silent', expectedOutput: 'True' },
    ]
  },
  {
    id: 'm2-py-easy-3',
    mode: 'WRITE_FROM_SCRATCH',
    language: 'python',
    category: 'Arrays & Pointers',
    difficulty: 'Easy',
    title: 'Move Zeroes to End',
    question: 'Write a program to move all zeroes in an array to the end while maintaining relative order of non-zero elements.',
    description: 'Given space-separated integers on stdin, move all zeroes to the end and print the resulting space-separated array.\n\nExample:\nInput: 0 1 0 3 12\nOutput: 1 3 12 0 0',
    starterCode: `import sys

def move_zeroes():
    data = sys.stdin.read().split()
    if not data:
        return
    nums = [int(x) for x in data]
    non_zeroes = [x for x in nums if x != 0]
    zeroes = [0] * (len(nums) - len(non_zeroes))
    res = non_zeroes + zeroes
    print(' '.join(map(str, res)))

move_zeroes()`,
    solutionCode: `import sys

def move_zeroes():
    data = sys.stdin.read().split()
    if not data:
        return
    nums = [int(x) for x in data]
    non_zeroes = [x for x in nums if x != 0]
    zeroes = [0] * (len(nums) - len(non_zeroes))
    res = non_zeroes + zeroes
    print(' '.join(map(str, res)))

move_zeroes()`,
    testCases: [
      { id: 1, input: '0 1 0 3 12', expectedOutput: '1 3 12 0 0' },
      { id: 2, input: '0 0 1', expectedOutput: '1 0 0' },
      { id: 3, input: '4 2 4 0 0 3', expectedOutput: '4 2 4 3 0 0' },
    ]
  },
  {
    id: 'm2-py-med-1',
    mode: 'WRITE_FROM_SCRATCH',
    language: 'python',
    category: 'Dynamic Programming',
    difficulty: 'Medium',
    title: 'Maximum Subarray (Kadane)',
    question: 'Find the contiguous subarray with the largest sum and print that sum.',
    description: 'Given a space-separated sequence of integers on stdin, find the contiguous subarray which has the largest sum and print the maximum sum.\n\nExample:\nInput: -2 1 -3 4 -1 2 1 -5 4\nOutput: 6',
    starterCode: `import sys

def max_sub_array():
    data = sys.stdin.read().split()
    if not data:
        return
    nums = [int(x) for x in data]
    max_so_far = nums[0]
    curr_max = nums[0]
    for x in nums[1:]:
        curr_max = max(x, curr_max + x)
        max_so_far = max(max_so_far, curr_max)
    print(max_so_far)

max_sub_array()`,
    solutionCode: `import sys

def max_sub_array():
    data = sys.stdin.read().split()
    if not data:
        return
    nums = [int(x) for x in data]
    max_so_far = nums[0]
    curr_max = nums[0]
    for x in nums[1:]:
        curr_max = max(x, curr_max + x)
        max_so_far = max(max_so_far, curr_max)
    print(max_so_far)

max_sub_array()`,
    testCases: [
      { id: 1, input: '-2 1 -3 4 -1 2 1 -5 4', expectedOutput: '6' },
      { id: 2, input: '1', expectedOutput: '1' },
      { id: 3, input: '5 4 -1 7 8', expectedOutput: '23' },
    ]
  },
  {
    id: 'm2-py-med-2',
    mode: 'WRITE_FROM_SCRATCH',
    language: 'python',
    category: 'Two Pointers',
    difficulty: 'Medium',
    title: 'Container With Most Water',
    question: 'Find two lines that together with the x-axis form a container holding the most water.',
    description: 'Given space-separated integers representing heights on stdin, compute the maximum area of water the container can store.\n\nExample:\nInput: 1 8 6 2 5 4 8 3 7\nOutput: 49',
    starterCode: `import sys

def max_area():
    data = sys.stdin.read().split()
    if not data:
        return
    height = [int(x) for x in data]
    left, right = 0, len(height) - 1
    max_water = 0
    while left < right:
        h = min(height[left], height[right])
        max_water = max(max_water, h * (right - left))
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    print(max_water)

max_area()`,
    solutionCode: `import sys

def max_area():
    data = sys.stdin.read().split()
    if not data:
        return
    height = [int(x) for x in data]
    left, right = 0, len(height) - 1
    max_water = 0
    while left < right:
        h = min(height[left], height[right])
        max_water = max(max_water, h * (right - left))
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    print(max_water)

max_area()`,
    testCases: [
      { id: 1, input: '1 8 6 2 5 4 8 3 7', expectedOutput: '49' },
      { id: 2, input: '1 1', expectedOutput: '1' },
      { id: 3, input: '4 3 2 1 4', expectedOutput: '16' },
    ]
  },
  {
    id: 'm2-py-hard-1',
    mode: 'WRITE_FROM_SCRATCH',
    language: 'python',
    category: 'Dynamic Programming',
    difficulty: 'Hard',
    title: 'Longest Increasing Subsequence',
    question: 'Find the length of the longest strictly increasing subsequence in an array.',
    description: 'Given space-separated integers on stdin, print the length of the longest strictly increasing subsequence.\n\nExample:\nInput: 10 9 2 5 3 7 101 18\nOutput: 4',
    starterCode: `import sys
import bisect

def length_of_lis():
    data = sys.stdin.read().split()
    if not data:
        return
    nums = [int(x) for x in data]
    sub = []
    for x in nums:
        idx = bisect.bisect_left(sub, x)
        if idx == len(sub):
            sub.append(x)
        else:
            sub[idx] = x
    print(len(sub))

length_of_lis()`,
    solutionCode: `import sys
import bisect

def length_of_lis():
    data = sys.stdin.read().split()
    if not data:
        return
    nums = [int(x) for x in data]
    sub = []
    for x in nums:
        idx = bisect.bisect_left(sub, x)
        if idx == len(sub):
            sub.append(x)
        else:
            sub[idx] = x
    print(len(sub))

length_of_lis()`,
    testCases: [
      { id: 1, input: '10 9 2 5 3 7 101 18', expectedOutput: '4' },
      { id: 2, input: '0 1 0 3 2 3', expectedOutput: '4' },
      { id: 3, input: '7 7 7 7 7', expectedOutput: '1' },
    ]
  },

  // =========================================================================
  // MODE 2: WRITE CODE FROM SCRATCH — C
  // =========================================================================
  {
    id: 'm2-c-easy-1',
    mode: 'WRITE_FROM_SCRATCH',
    language: 'c',
    category: 'Arrays & Math',
    difficulty: 'Easy',
    title: 'Array Reversal in C',
    question: 'Write a C program to reverse an array of integers read from standard input.',
    description: 'Input format:\nFirst line: an integer N (the size).\nSecond line: N space-separated integers.\nOutput: The reversed array printed space-separated on a single line.',
    starterCode: `#include <stdio.h>

int main() {
    int n;
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    int arr[1000];
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }
    for (int i = n - 1; i >= 0; i--) {
        printf("%d", arr[i]);
        if (i > 0) printf(" ");
    }
    printf("\\n");
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main() {
    int n;
    if (scanf("%d", &n) != 1 || n <= 0) return 0;
    int arr[1000];
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }
    for (int i = n - 1; i >= 0; i--) {
        printf("%d", arr[i]);
        if (i > 0) printf(" ");
    }
    printf("\\n");
    return 0;
}`,
    testCases: [
      { id: 1, input: '4\n1 2 3 4', expectedOutput: '4 3 2 1' },
      { id: 2, input: '3\n10 20 30', expectedOutput: '30 20 10' },
      { id: 3, input: '1\n99', expectedOutput: '99' },
    ]
  },
  {
    id: 'm2-c-easy-2',
    mode: 'WRITE_FROM_SCRATCH',
    language: 'c',
    category: 'Loops & Counting',
    difficulty: 'Easy',
    title: 'Count Vowels and Consonants in C',
    question: 'Write a C program to count the number of vowels in a string.',
    description: 'Read a single word from standard input and print the count of vowel characters (a, e, i, o, u, case-insensitive).\n\nExample:\nInput: Hello\nOutput: 2',
    starterCode: `#include <stdio.h>
#include <ctype.h>
#include <string.h>

int main() {
    char str[256];
    if (scanf("%255s", str) != 1) return 0;
    int count = 0;
    for (int i = 0; str[i] != '\\0'; i++) {
        char ch = tolower(str[i]);
        if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') {
            count++;
        }
    }
    printf("%d\\n", count);
    return 0;
}`,
    solutionCode: `#include <stdio.h>
#include <ctype.h>
#include <string.h>

int main() {
    char str[256];
    if (scanf("%255s", str) != 1) return 0;
    int count = 0;
    for (int i = 0; str[i] != '\\0'; i++) {
        char ch = tolower(str[i]);
        if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') {
            count++;
        }
    }
    printf("%d\\n", count);
    return 0;
}`,
    testCases: [
      { id: 1, input: 'Hello', expectedOutput: '2' },
      { id: 2, input: 'Algorithm', expectedOutput: '3' },
      { id: 3, input: 'rhythm', expectedOutput: '0' },
    ]
  },
  {
    id: 'm2-c-med-1',
    mode: 'WRITE_FROM_SCRATCH',
    language: 'c',
    category: 'Searching',
    difficulty: 'Medium',
    title: 'Binary Search Implementation in C',
    question: 'Implement binary search on a sorted array.',
    description: 'Input format:\nFirst line: integer N (size) and target T.\nSecond line: N sorted integers.\nOutput: The 0-based index of T in the array, or -1 if not found.',
    starterCode: `#include <stdio.h>

int main() {
    int n, target;
    if (scanf("%d %d", &n, &target) != 2) return 0;
    int arr[1000];
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }
    int low = 0, high = n - 1, ans = -1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) {
            ans = mid;
            break;
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    printf("%d\\n", ans);
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main() {
    int n, target;
    if (scanf("%d %d", &n, &target) != 2) return 0;
    int arr[1000];
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }
    int low = 0, high = n - 1, ans = -1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) {
            ans = mid;
            break;
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    printf("%d\\n", ans);
    return 0;
}`,
    testCases: [
      { id: 1, input: '5 7\n1 3 5 7 9', expectedOutput: '3' },
      { id: 2, input: '5 4\n1 3 5 7 9', expectedOutput: '-1' },
      { id: 3, input: '1 42\n42', expectedOutput: '0' },
    ]
  },

  // =========================================================================
  // MODE 2: WRITE CODE FROM SCRATCH — JAVA
  // =========================================================================
  {
    id: 'm2-java-easy-1',
    mode: 'WRITE_FROM_SCRATCH',
    language: 'java',
    category: 'Strings',
    difficulty: 'Easy',
    title: 'Palindrome String Checker in Java',
    question: 'Write a Java program to check if a word is a palindrome.',
    description: 'Read a single word from standard input and print "true" if it reads the same forward and backward (case-insensitive), or "false" otherwise.',
    starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String s = sc.next().toLowerCase();
        int left = 0, right = s.length() - 1;
        boolean isPal = true;
        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) {
                isPal = false;
                break;
            }
            left++;
            right--;
        }
        System.out.println(isPal);
    }
}`,
    solutionCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String s = sc.next().toLowerCase();
        int left = 0, right = s.length() - 1;
        boolean isPal = true;
        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) {
                isPal = false;
                break;
            }
            left++;
            right--;
        }
        System.out.println(isPal);
    }
}`,
    testCases: [
      { id: 1, input: 'racecar', expectedOutput: 'true' },
      { id: 2, input: 'Java', expectedOutput: 'false' },
      { id: 3, input: 'Madam', expectedOutput: 'true' },
    ]
  },
  {
    id: 'm2-java-med-1',
    mode: 'WRITE_FROM_SCRATCH',
    language: 'java',
    category: 'Data Structures',
    difficulty: 'Medium',
    title: 'Valid Parentheses Checker in Java',
    question: 'Given a string containing just the characters ()[]{}, determine if the input string is valid.',
    description: 'Input: a string of brackets on stdin.\nOutput: "true" if valid, "false" otherwise.',
    starterCode: `import java.util.Scanner;
import java.util.Stack;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String s = sc.next();
        Stack<Character> stack = new Stack<>();
        boolean ok = true;
        for (char c : s.toCharArray()) {
            if (c == '(' || c == '{' || c == '[') {
                stack.push(c);
            } else {
                if (stack.isEmpty()) { ok = false; break; }
                char top = stack.pop();
                if ((c == ')' && top != '(') ||
                    (c == '}' && top != '{') ||
                    (c == ']' && top != '[')) {
                    ok = false;
                    break;
                }
            }
        }
        if (!stack.isEmpty()) ok = false;
        System.out.println(ok);
    }
}`,
    solutionCode: `import java.util.Scanner;
import java.util.Stack;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String s = sc.next();
        Stack<Character> stack = new Stack<>();
        boolean ok = true;
        for (char c : s.toCharArray()) {
            if (c == '(' || c == '{' || c == '[') {
                stack.push(c);
            } else {
                if (stack.isEmpty()) { ok = false; break; }
                char top = stack.pop();
                if ((c == ')' && top != '(') ||
                    (c == '}' && top != '{') ||
                    (c == ']' && top != '[')) {
                    ok = false;
                    break;
                }
            }
        }
        if (!stack.isEmpty()) ok = false;
        System.out.println(ok);
    }
}`,
    testCases: [
      { id: 1, input: '()[]{}', expectedOutput: 'true' },
      { id: 2, input: '(]', expectedOutput: 'false' },
      { id: 3, input: '([{}])', expectedOutput: 'true' },
    ]
  },

  // =========================================================================
  // MODE 2: WRITE CODE FROM SCRATCH — SQL
  // =========================================================================
  {
    id: 'm2-sql-easy-3',
    mode: 'WRITE_FROM_SCRATCH',
    language: 'sql',
    category: 'Aggregates',
    difficulty: 'Easy',
    title: 'Total Revenue by Customer',
    question: 'Write an SQL query to calculate total spending per customer.',
    description: 'Table: Orders\n+----------------+-----------------+---------------+\n| order_id (INT) | customer (TEXT) | amount (INT)  |\n+----------------+-----------------+---------------+\n| 1              | Alice           | 200           |\n| 2              | Bob             | 150           |\n| 3              | Alice           | 300           |\n| 4              | Charlie         | 500           |\n+----------------+-----------------+---------------+\n\nWrite a query to retrieve customer name and sum of amount as total_amount, grouped by customer and ordered by total_amount descending.',
    starterCode: `SELECT customer, SUM(amount) AS total_amount
FROM Orders
GROUP BY customer
ORDER BY total_amount DESC;`,
    solutionCode: `SELECT customer, SUM(amount) AS total_amount
FROM Orders
GROUP BY customer
ORDER BY total_amount DESC;`,
    sqlTable: {
      tableName: 'Orders',
      schema: 'CREATE TABLE Orders (order_id INT, customer TEXT, amount INT);',
      seedData: "INSERT INTO Orders VALUES (1, 'Alice', 200), (2, 'Bob', 150), (3, 'Alice', 300), (4, 'Charlie', 500);"
    },
    testCases: [
      { id: 1, input: '', expectedOutput: '' }
    ]
  },
  {
    id: 'm2-sql-med-3',
    mode: 'WRITE_FROM_SCRATCH',
    language: 'sql',
    category: 'JOINs & Grouping',
    difficulty: 'Medium',
    title: 'Customer Order Count',
    question: 'Write an SQL query to list all customers and their total number of orders.',
    description: 'Tables:\nCustomers: id, name\nOrders: order_id, customer_id, amount\n\nWrite a query to display customer name and the count of their orders as order_count, including customers with 0 orders (use LEFT JOIN). Order alphabetically by customer name.',
    starterCode: `SELECT c.name, COUNT(o.order_id) AS order_count
FROM Customers c
LEFT JOIN Orders o ON c.id = o.customer_id
GROUP BY c.name
ORDER BY c.name ASC;`,
    solutionCode: `SELECT c.name, COUNT(o.order_id) AS order_count
FROM Customers c
LEFT JOIN Orders o ON c.id = o.customer_id
GROUP BY c.name
ORDER BY c.name ASC;`,
    sqlTable: {
      tableName: 'Customers',
      schema: 'CREATE TABLE Customers (id INT, name TEXT); CREATE TABLE Orders (order_id INT, customer_id INT, amount INT);',
      seedData: "INSERT INTO Customers VALUES (1, 'Alice'), (2, 'Bob'), (3, 'Charlie'); INSERT INTO Orders VALUES (101, 1, 50), (102, 1, 120), (103, 3, 300);"
    },
    testCases: [
      { id: 1, input: '', expectedOutput: '' }
    ]
  },

  // =========================================================================
  // MODE 4: FILL THE MISSING CODE — PYTHON
  // =========================================================================
  {
    id: 'm4-py-easy-2',
    mode: 'FILL_MISSING_CODE',
    language: 'python',
    executionType: 'function',
    functionName: 'count_evens',
    category: 'Loops & Modulo',
    difficulty: 'Easy',
    title: 'Count Even Numbers in List',
    question: 'Complete the missing condition to check if a number is even.',
    description: 'Fill in the placeholder `________` so that `count_evens([1, 2, 3, 4, 6])` correctly counts and returns 3.',
    starterCode: `def count_evens(nums):
    count = 0
    for x in nums:
        if ________:
            count += 1
    return count

print(count_evens([1, 2, 3, 4, 6]))`,
    solutionCode: `def count_evens(nums):
    count = 0
    for x in nums:
        if x % 2 == 0:
            count += 1
    return count

print(count_evens([1, 2, 3, 4, 6]))`,
    missingCodePlaceholder: '________',
    testCases: [
      { id: 1, input: '[1, 2, 3, 4, 6]', expectedOutput: '3' },
      { id: 2, input: '[1, 3, 5]', expectedOutput: '0' },
      { id: 3, input: '[2, 4, 6, 8]', expectedOutput: '4' },
    ],
    explanation: 'A number `x` is even if `x % 2 == 0`.'
  },
  {
    id: 'm4-py-easy-3',
    mode: 'FILL_MISSING_CODE',
    language: 'python',
    executionType: 'function',
    functionName: 'reverse_string',
    category: 'Strings & Slicing',
    difficulty: 'Easy',
    title: 'String Reversal via Slicing',
    question: 'Fill in the Python slice syntax to reverse the string.',
    description: 'Fill in `________` so that `reverse_string("hello")` returns "olleh".',
    starterCode: `def reverse_string(s):
    return s[________]

print(reverse_string("hello"))`,
    solutionCode: `def reverse_string(s):
    return s[::-1]

print(reverse_string("hello"))`,
    missingCodePlaceholder: '________',
    testCases: [
      { id: 1, input: '"hello"', expectedOutput: 'olleh' },
      { id: 2, input: '"world"', expectedOutput: 'dlrow' },
      { id: 3, input: '"a"', expectedOutput: 'a' },
    ],
    explanation: 'Python slice with step `-1` (`[::-1]`) reverses the string.'
  },
  {
    id: 'm4-py-med-1',
    mode: 'FILL_MISSING_CODE',
    language: 'python',
    executionType: 'function',
    functionName: 'binary_search',
    category: 'Algorithms',
    difficulty: 'Medium',
    title: 'Binary Search Midpoint Calculation',
    question: 'Fill in the missing midpoint formula in binary search.',
    description: 'Fill in `________` to compute the middle index between low and high.',
    starterCode: `def binary_search(nums, target):
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = ________
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1

print(binary_search([1, 3, 5, 7, 9], 7))`,
    solutionCode: `def binary_search(nums, target):
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1

print(binary_search([1, 3, 5, 7, 9], 7))`,
    missingCodePlaceholder: '________',
    testCases: [
      { id: 1, input: '[1, 3, 5, 7, 9], 7', expectedOutput: '3' },
      { id: 2, input: '[1, 3, 5, 7, 9], 2', expectedOutput: '-1' },
      { id: 3, input: '[10], 10', expectedOutput: '0' },
    ],
    explanation: 'The integer midpoint is calculated as `(low + high) // 2`.'
  },

  // =========================================================================
  // MODE 4: FILL THE MISSING CODE — C
  // =========================================================================
  {
    id: 'm4-c-easy-2',
    mode: 'FILL_MISSING_CODE',
    language: 'c',
    category: 'Loops & Arrays',
    difficulty: 'Easy',
    title: 'Array Maximum Finder in C',
    question: 'Fill in the missing condition to update the maximum element.',
    description: 'Fill in `________` so the program finds and prints the maximum value in an array.',
    starterCode: `#include <stdio.h>

int find_max(int arr[], int n) {
    int max = arr[0];
    for (int i = 1; i < n; i++) {
        if (________) {
            max = arr[i];
        }
    }
    return max;
}

int main() {
    int arr[] = {3, 7, 2, 9, 5};
    printf("%d\\n", find_max(arr, 5));
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int find_max(int arr[], int n) {
    int max = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

int main() {
    int arr[] = {3, 7, 2, 9, 5};
    printf("%d\\n", find_max(arr, 5));
    return 0;
}`,
    missingCodePlaceholder: '________',
    testCases: [
      { id: 1, input: '', expectedOutput: '9' }
    ],
    explanation: 'To track the maximum, update `max` whenever `arr[i] > max`.'
  },

  // =========================================================================
  // MODE 4: FILL THE MISSING CODE — JAVA
  // =========================================================================
  {
    id: 'm4-java-easy-2',
    mode: 'FILL_MISSING_CODE',
    language: 'java',
    category: 'Strings & Conditionals',
    difficulty: 'Easy',
    title: 'Character Vowel Check in Java',
    question: 'Fill in the missing condition to check if char c is a lowercase vowel.',
    description: 'Fill in `________` so the program returns true if c is an English vowel.',
    starterCode: `public class Main {
    public static boolean isVowel(char c) {
        return ________;
    }

    public static void main(String[] args) {
        System.out.println(isVowel('e'));
        System.out.println(isVowel('z'));
    }
}`,
    solutionCode: `public class Main {
    public static boolean isVowel(char c) {
        return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';
    }

    public static void main(String[] args) {
        System.out.println(isVowel('e'));
        System.out.println(isVowel('z'));
    }
}`,
    missingCodePlaceholder: '________',
    testCases: [
      { id: 1, input: '', expectedOutput: 'true\nfalse' }
    ],
    explanation: 'Checking lowercase vowels requires `c == \'a\' || c == \'e\' || c == \'i\' || c == \'o\' || c == \'u\'`.'
  }
];
