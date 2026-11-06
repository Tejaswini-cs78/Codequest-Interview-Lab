/**
 * Question Bank Manager & Dynamic Generator for CodeQuest Interview Lab
 * 
 * Provides:
 * - Comprehensive curated question bank across Python, C, and Java
 * - 3 distinct difficulty tiers: Easy, Medium, Hard
 * - Guaranteed question uniqueness (title, code, mistake concept, test cases)
 * - Dynamic generation engine for unlimited continuous practice
 * - Automated quality validator (starter code MUST fail, solution code MUST pass)
 * - Session history tracking to prevent repetitions
 */

import { runCode } from './codeSandbox.js';
import { questions as staticQuestions } from '../data/questions.js';
import { CURATED_QUESTIONS } from '../data/masterCuratedBank.js';
import {
  generateWriteCodeQuestion,
  generatePredictOutputQuestion,
  generateFillBlankQuestion
} from './multiModeGenerator.js';

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

// Curated Master Question Bank for Mode 1: FIND_MISTAKE
const INITIAL_FIND_MISTAKE_QUESTIONS = [
  // ==========================================
  // PYTHON — EASY
  // ==========================================
  {
    id: 'm1-py-easy-1',
    mode: MODES.FIND_MISTAKE,
    language: LANGUAGES.PYTHON,
    executionType: 'function',
    functionName: 'sum_of_evens',
    category: 'Loops & Conditions',
    difficulty: 'Easy',
    conceptKey: 'py_loop_range_boundary',
    title: 'Off-by-One in Sum of Evens',
    question: 'Find and fix the off-by-one error in the range function so the upper bound is included.',
    description: 'The function `sum_of_evens(n)` should calculate the sum of all positive even integers up to and including `n`.',
    starterCode: `def sum_of_evens(n):
    total = 0
    # MISTAKE: range(1, n) stops before n, excluding n itself
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
    explanation: 'Python `range(start, stop)` is exclusive of `stop`. To include `n`, use `range(1, n + 1)`.'
  },
  {
    id: 'm1-py-easy-2',
    mode: MODES.FIND_MISTAKE,
    language: LANGUAGES.PYTHON,
    executionType: 'function',
    functionName: 'is_palindrome',
    category: 'Strings & Logic',
    difficulty: 'Easy',
    conceptKey: 'py_string_case_cleaning',
    title: 'Palindrome Case Sensitivity Bug',
    question: 'Fix the palindrome comparison so it compares the cleaned string with its reverse, ignoring case and non-alphanumeric characters.',
    description: 'The function `is_palindrome(s)` should return True if the alphanumeric characters of `s` form a palindrome, case-insensitively.',
    starterCode: `def is_palindrome(s):
    cleaned = ''.join(c.lower() for c in s if c.isalnum())
    # MISTAKE: Compares uncleaned string s with reversed cleaned string
    return s == cleaned[::-1]

print(is_palindrome("Racecar"))`,
    solutionCode: `def is_palindrome(s):
    cleaned = ''.join(c.lower() for c in s if c.isalnum())
    return cleaned == cleaned[::-1]

print(is_palindrome("Racecar"))`,
    testCases: [
      { id: 1, input: '"Racecar"', expectedOutput: 'True' },
      { id: 2, input: '"hello"', expectedOutput: 'False' },
      { id: 3, input: '"A man, a plan, a canal: Panama"', expectedOutput: 'True' },
    ],
    explanation: 'The code compared original string `s` ("Racecar") with `cleaned[::-1]` ("racecar"), causing case mismatches. Compare `cleaned` with `cleaned[::-1]`.'
  },
  {
    id: 'm1-py-easy-3',
    mode: MODES.FIND_MISTAKE,
    language: LANGUAGES.PYTHON,
    executionType: 'function',
    functionName: 'reverse_words',
    category: 'Strings & Arrays',
    difficulty: 'Easy',
    conceptKey: 'py_string_words_reverse',
    title: 'Reverse Words in a String',
    question: 'Find and fix the mistake so that the function reverses the order of words in a sentence, not the characters.',
    description: 'The function `reverse_words(s)` should take a sentence string and return a new string with the words in reverse order separated by single spaces.',
    starterCode: `def reverse_words(s):
    words = s.split()
    # MISTAKE: Reverses all characters in the string instead of the word list
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
    explanation: '`" ".join(words)[::-1]` reverses all individual characters ("eulb si yks eht"). Slicing the list `words[::-1]` reverses the word order.'
  },
  {
    id: 'm1-py-easy-4',
    mode: MODES.FIND_MISTAKE,
    language: LANGUAGES.PYTHON,
    executionType: 'function',
    functionName: 'is_prime',
    category: 'Math & Logic',
    difficulty: 'Easy',
    conceptKey: 'py_math_prime_boundary',
    title: 'Prime Number Checker Boundary Bug',
    question: 'Find and fix the condition and loop boundary error in the prime checking function.',
    description: 'The function `is_prime(n)` should return True if `n` is a prime number and False otherwise.',
    starterCode: `def is_prime(n):
    # MISTAKE: Considers 1 as prime and range(2, n + 1) checks n % n == 0
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
    explanation: '1 is not prime (use `n <= 1`). The loop should only check up to `int(n**0.5) + 1` to avoid dividing `n` by `n`.'
  },
  {
    id: 'm1-py-easy-5',
    mode: MODES.FIND_MISTAKE,
    language: LANGUAGES.PYTHON,
    executionType: 'function',
    functionName: 'count_vowels',
    category: 'Strings & Loops',
    difficulty: 'Easy',
    conceptKey: 'py_vowels_containment_check',
    title: 'Vowel Counting Equality Bug',
    question: 'Fix the vowel checking condition so that all vowels in a word are counted.',
    description: 'The function `count_vowels(s)` should return the total number of vowels (a, e, i, o, u) in string `s`, case-insensitively.',
    starterCode: `def count_vowels(s):
    count = 0
    vowels = "aeiou"
    for char in s.lower():
        # MISTAKE: Checks if char == vowels instead of char in vowels
        if char == vowels:
            count += 1
    return count

print(count_vowels("interview"))`,
    solutionCode: `def count_vowels(s):
    count = 0
    vowels = "aeiou"
    for char in s.lower():
        if char in vowels:
            count += 1
    return count

print(count_vowels("interview"))`,
    testCases: [
      { id: 1, input: '"interview"', expectedOutput: '4' },
      { id: 2, input: '"python"', expectedOutput: '1' },
      { id: 3, input: '"rhythm"', expectedOutput: '0' },
      { id: 4, input: '"AEIOU"', expectedOutput: '5' },
    ],
    explanation: '`char == vowels` checks if a single character equals the entire string "aeiou", which is never true. Use membership test `char in vowels`.'
  },
  {
    id: 'm1-py-easy-6',
    mode: MODES.FIND_MISTAKE,
    language: LANGUAGES.PYTHON,
    executionType: 'function',
    functionName: 'calc_power',
    category: 'Basic Operators',
    difficulty: 'Easy',
    conceptKey: 'py_power_operator_xor',
    title: 'Exponentiation Operator Bug',
    question: 'Fix the power operator in Python so that base is raised to exponent.',
    description: 'The function `calc_power(base, exp)` should compute and return `base` raised to the power of `exp`.',
    starterCode: `def calc_power(base, exp):
    # MISTAKE: ^ is bitwise XOR in Python, not exponentiation
    return base ^ exp

print(calc_power(2, 3))`,
    solutionCode: `def calc_power(base, exp):
    return base ** exp

print(calc_power(2, 3))`,
    testCases: [
      { id: 1, input: '2, 3', expectedOutput: '8' },
      { id: 2, input: '5, 2', expectedOutput: '25' },
      { id: 3, input: '3, 4', expectedOutput: '81' },
      { id: 4, input: '10, 0', expectedOutput: '1' },
    ],
    explanation: 'In Python, `^` represents bitwise XOR. For mathematical exponentiation, use the `**` operator.'
  },
  {
    id: 'm1-py-easy-7',
    mode: MODES.FIND_MISTAKE,
    language: LANGUAGES.PYTHON,
    executionType: 'function',
    functionName: 'find_minimum',
    category: 'Arrays & Logic',
    difficulty: 'Easy',
    conceptKey: 'py_find_min_initialization',
    title: 'Minimum Element Initialization Bug',
    question: 'Fix the minimum variable initialization so that it correctly finds the minimum in a list of positive numbers.',
    description: 'The function `find_minimum(nums)` should return the smallest number in a non-empty list `nums`.',
    starterCode: `def find_minimum(nums):
    # MISTAKE: Initializing min_val to 0 fails when all numbers are positive
    min_val = 0
    for num in nums:
        if num < min_val:
            min_val = num
    return min_val

print(find_minimum([5, 8, 2, 9, 3]))`,
    solutionCode: `def find_minimum(nums):
    min_val = nums[0]
    for num in nums:
        if num < min_val:
            min_val = num
    return min_val

print(find_minimum([5, 8, 2, 9, 3]))`,
    testCases: [
      { id: 1, input: '[5, 8, 2, 9, 3]', expectedOutput: '2' },
      { id: 2, input: '[10, 20, 30]', expectedOutput: '10' },
      { id: 3, input: '[1]', expectedOutput: '1' },
      { id: 4, input: '[100, 45, 60, 25]', expectedOutput: '25' },
    ],
    explanation: 'Initializing `min_val` to 0 fails because no positive number is strictly less than 0. Initialize to `nums[0]` or `float("inf")`.'
  },

  // ==========================================
  // PYTHON — MEDIUM
  // ==========================================
  {
    id: 'm1-py-med-1',
    mode: MODES.FIND_MISTAKE,
    language: LANGUAGES.PYTHON,
    executionType: 'function',
    functionName: 'binary_search',
    category: 'Searching & Algorithms',
    difficulty: 'Medium',
    conceptKey: 'py_binary_search_infinite_loop',
    title: 'Binary Search Boundary Loop Bug',
    question: 'Fix the pointer update in binary search to prevent an infinite loop.',
    description: 'The function `binary_search(nums, target)` should return the index of `target` in sorted list `nums`, or -1 if not found.',
    starterCode: `def binary_search(nums, target):
    low = 0
    high = len(nums) - 1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            # MISTAKE: low = mid causes an infinite loop when low + 1 == high
            low = mid
        else:
            high = mid - 1
    return -1

print(binary_search([1, 3, 5, 7, 9], 7))`,
    solutionCode: `def binary_search(nums, target):
    low = 0
    high = len(nums) - 1
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
    testCases: [
      { id: 1, input: '[1, 3, 5, 7, 9], 7', expectedOutput: '3' },
      { id: 2, input: '[1, 3, 5, 7, 9], 1', expectedOutput: '0' },
      { id: 3, input: '[1, 3, 5, 7, 9], 9', expectedOutput: '4' },
      { id: 4, input: '[1, 3, 5, 7, 9], 4', expectedOutput: '-1' },
    ],
    explanation: 'Setting `low = mid` leads to an infinite loop when `low` and `high` are adjacent and integer division rounds down. Set `low = mid + 1`.'
  },
  {
    id: 'm1-py-med-2',
    mode: MODES.FIND_MISTAKE,
    language: LANGUAGES.PYTHON,
    executionType: 'function',
    functionName: 'two_sum_sorted',
    category: 'Two Pointers & Arrays',
    difficulty: 'Medium',
    conceptKey: 'py_two_sum_sorted_pointer_direction',
    title: 'Two Pointers Target Adjustment Bug',
    question: 'Fix the two-pointer condition logic when the current sum is greater than the target.',
    description: 'The function `two_sum_sorted(nums, target)` accepts a sorted list and returns the 1-based indices `[left, right]` of two numbers that add up to `target`.',
    starterCode: `def two_sum_sorted(nums, target):
    left = 0
    right = len(nums) - 1
    while left < right:
        curr_sum = nums[left] + nums[right]
        if curr_sum == target:
            return [left + 1, right + 1]
        elif curr_sum < target:
            left += 1
        else:
            # MISTAKE: Incrementing left increases sum instead of decrementing right
            left += 1
    return []

print(two_sum_sorted([2, 7, 11, 15], 9))`,
    solutionCode: `def two_sum_sorted(nums, target):
    left = 0
    right = len(nums) - 1
    while left < right:
        curr_sum = nums[left] + nums[right]
        if curr_sum == target:
            return [left + 1, right + 1]
        elif curr_sum < target:
            left += 1
        else:
            right -= 1
    return []

print(two_sum_sorted([2, 7, 11, 15], 9))`,
    testCases: [
      { id: 1, input: '[2, 7, 11, 15], 9', expectedOutput: '[1, 2]' },
      { id: 2, input: '[1, 2, 3, 4, 6], 6', expectedOutput: '[2, 4]' },
      { id: 3, input: '[2, 3, 4], 6', expectedOutput: '[1, 3]' },
      { id: 4, input: '[-1, 0], -1', expectedOutput: '[1, 2]' },
    ],
    explanation: 'When `curr_sum > target`, the sum must be reduced by moving the right pointer inward (`right -= 1`), not advancing `left`.'
  },
  {
    id: 'm1-py-med-3',
    mode: MODES.FIND_MISTAKE,
    language: LANGUAGES.PYTHON,
    executionType: 'function',
    functionName: 'merge_sorted_lists',
    category: 'Lists & Merging',
    difficulty: 'Medium',
    conceptKey: 'py_merge_lists_remainder_append',
    title: 'Sorted Lists Merge Truncation Bug',
    question: 'Fix the list merge logic so that remaining elements from either list are not lost.',
    description: 'The function `merge_sorted_lists(l1, l2)` should merge two already sorted lists into a single sorted list.',
    starterCode: `def merge_sorted_lists(l1, l2):
    i = 0
    j = 0
    result = []
    while i < len(l1) and j < len(l2):
        if l1[i] <= l2[j]:
            result.append(l1[i])
            i += 1
        else:
            result.append(l2[j])
            j += 1
    # MISTAKE: Omits remaining elements when one list finishes before the other
    return result

print(merge_sorted_lists([1, 3, 5], [2, 4, 6, 8]))`,
    solutionCode: `def merge_sorted_lists(l1, l2):
    i = 0
    j = 0
    result = []
    while i < len(l1) and j < len(l2):
        if l1[i] <= l2[j]:
            result.append(l1[i])
            i += 1
        else:
            result.append(l2[j])
            j += 1
    result.extend(l1[i:])
    result.extend(l2[j:])
    return result

print(merge_sorted_lists([1, 3, 5], [2, 4, 6, 8]))`,
    testCases: [
      { id: 1, input: '[1, 3, 5], [2, 4, 6, 8]', expectedOutput: '[1, 2, 3, 4, 5, 6, 8]' },
      { id: 2, input: '[1, 2], [3, 4]', expectedOutput: '[1, 2, 3, 4]' },
      { id: 3, input: '[], [1, 2]', expectedOutput: '[1, 2]' },
      { id: 4, input: '[5], [1, 2, 3]', expectedOutput: '[1, 2, 3, 5]' },
    ],
    explanation: 'When one list reaches the end, the remaining elements in the other list must be appended (`result.extend(l1[i:])` and `result.extend(l2[j:])`).'
  },
  {
    id: 'm1-py-med-4',
    mode: MODES.FIND_MISTAKE,
    language: LANGUAGES.PYTHON,
    executionType: 'function',
    functionName: 'fibonacci_memo',
    category: 'Recursion & Memoization',
    difficulty: 'Medium',
    conceptKey: 'py_fibonacci_base_case_order',
    title: 'Fibonacci Recursion Base Case Bug',
    question: 'Fix the recursion base case so that fibonacci(1) returns 1 and 0 returns 0.',
    description: 'The function `fibonacci_memo(n)` computes the n-th Fibonacci number where F(0)=0, F(1)=1, F(2)=1, F(3)=2, etc.',
    starterCode: `def fibonacci_memo(n, memo=None):
    if memo is None:
        memo = {}
    # MISTAKE: If n <= 1 returns 0, so fibonacci(1) incorrectly returns 0
    if n <= 1:
        return 0
    if n in memo:
        return memo[n]
    memo[n] = fibonacci_memo(n - 1, memo) + fibonacci_memo(n - 2, memo)
    return memo[n]

print(fibonacci_memo(6))`,
    solutionCode: `def fibonacci_memo(n, memo=None):
    if memo is None:
        memo = {}
    if n <= 0:
        return 0
    if n == 1:
        return 1
    if n in memo:
        return memo[n]
    memo[n] = fibonacci_memo(n - 1, memo) + fibonacci_memo(n - 2, memo)
    return memo[n]

print(fibonacci_memo(6))`,
    testCases: [
      { id: 1, input: '6', expectedOutput: '8' },
      { id: 2, input: '1', expectedOutput: '1' },
      { id: 3, input: '0', expectedOutput: '0' },
      { id: 4, input: '10', expectedOutput: '55' },
    ],
    explanation: 'By returning 0 for `n <= 1`, the function loses the base value 1 for $F(1)$, resulting in 0 for all calls. Return $n$ or handle $0$ and $1$ separately.'
  },

  // ==========================================
  // PYTHON — HARD
  // ==========================================
  {
    id: 'm1-py-hard-1',
    mode: MODES.FIND_MISTAKE,
    language: LANGUAGES.PYTHON,
    executionType: 'function',
    functionName: 'length_of_lis',
    category: 'Dynamic Programming',
    difficulty: 'Hard',
    conceptKey: 'py_dp_lis_condition_inversion',
    title: 'Longest Increasing Subsequence DP Logic Bug',
    question: 'Fix the condition inside the nested dynamic programming loop for LIS.',
    description: 'The function `length_of_lis(nums)` should return the length of the longest strictly increasing subsequence in `nums`.',
    starterCode: `def length_of_lis(nums):
    if not nums:
        return 0
    dp = [1] * len(nums)
    for i in range(len(nums)):
        for j in range(i):
            # MISTAKE: Condition checks nums[i] < nums[j] instead of nums[i] > nums[j]
            if nums[i] < nums[j]:
                dp[i] = max(dp[i], dp[j] + 1)
    return max(dp)

print(length_of_lis([10, 9, 2, 5, 3, 7, 101, 18]))`,
    solutionCode: `def length_of_lis(nums):
    if not nums:
        return 0
    dp = [1] * len(nums)
    for i in range(len(nums)):
        for j in range(i):
            if nums[i] > nums[j]:
                dp[i] = max(dp[i], dp[j] + 1)
    return max(dp)

print(length_of_lis([10, 9, 2, 5, 3, 7, 101, 18]))`,
    testCases: [
      { id: 1, input: '[10, 9, 2, 5, 3, 7, 101, 18]', expectedOutput: '4' },
      { id: 2, input: '[0, 1, 0, 3, 2, 3]', expectedOutput: '4' },
      { id: 3, input: '[7, 7, 7, 7]', expectedOutput: '1' },
      { id: 4, input: '[1, 3, 6, 7, 9, 4, 10, 5, 6]', expectedOutput: '6' },
    ],
    explanation: 'An increasing subsequence requires `nums[i] > nums[j]`. Checking `nums[i] < nums[j]` computes the decreasing subsequence instead.'
  },
  {
    id: 'm1-py-hard-2',
    mode: MODES.FIND_MISTAKE,
    language: LANGUAGES.PYTHON,
    executionType: 'function',
    functionName: 'coin_change',
    category: 'Dynamic Programming',
    difficulty: 'Hard',
    conceptKey: 'py_dp_coin_change_initialization',
    title: 'Coin Change Minimum Coins DP Initialization Bug',
    question: 'Fix the DP array initialization and transition so unreachable amounts are not incorrectly returned as 0.',
    description: 'The function `coin_change(coins, amount)` returns the fewest number of coins needed to make up `amount`, or -1 if impossible.',
    starterCode: `def coin_change(coins, amount):
    # MISTAKE: Initializing with 0 makes min() choose 0 for all amounts
    dp = [0] * (amount + 1)
    dp[0] = 0
    for i in range(1, amount + 1):
        for c in coins:
            if i - c >= 0:
                dp[i] = min(dp[i], dp[i - c] + 1)
    return dp[amount] if dp[amount] != 0 else -1

print(coin_change([1, 2, 5], 11))`,
    solutionCode: `def coin_change(coins, amount):
    if amount == 0:
        return 0
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for i in range(1, amount + 1):
        for c in coins:
            if i - c >= 0:
                dp[i] = min(dp[i], dp[i - c] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1

print(coin_change([1, 2, 5], 11))`,
    testCases: [
      { id: 1, input: '[1, 2, 5], 11', expectedOutput: '3' },
      { id: 2, input: '[2], 3', expectedOutput: '-1' },
      { id: 3, input: '[1], 0', expectedOutput: '0' },
      { id: 4, input: '[2, 5, 10, 1], 27', expectedOutput: '4' },
    ],
    explanation: 'When computing minimum coins, initialize unreachable entries with infinity `float("inf")`, not 0. Otherwise `min(0, dp[i-c] + 1)` always chooses 0.'
  },

  // ==========================================
  // C — EASY
  // ==========================================
  {
    id: 'm1-c-easy-1',
    mode: MODES.FIND_MISTAKE,
    language: LANGUAGES.C,
    executionType: 'stdio',
    category: 'Pointers & Arrays',
    difficulty: 'Easy',
    conceptKey: 'c_loop_out_of_bounds',
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
    id: 'm1-c-easy-2',
    mode: MODES.FIND_MISTAKE,
    language: LANGUAGES.C,
    executionType: 'stdio',
    category: 'Data Types & Math',
    difficulty: 'Easy',
    conceptKey: 'c_float_integer_division',
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
    explanation: 'In C, dividing an integer by an integer performs integer division and truncates decimals (19 / 3 = 6). Dividing by `3.0f` promotes the operation to floating point.'
  },
  {
    id: 'm1-c-easy-3',
    mode: MODES.FIND_MISTAKE,
    language: LANGUAGES.C,
    executionType: 'stdio',
    category: 'Loops & Accumulators',
    difficulty: 'Easy',
    conceptKey: 'c_min_initialization_zero',
    title: 'Array Minimum Initialization Bug',
    question: 'Fix the initialization of the minimum variable so that it correctly finds the minimum of positive numbers.',
    description: 'The program finds the minimum value in an array of positive integers. Currently it always prints 0.',
    starterCode: `#include <stdio.h>

int main() {
    int nums[5] = {14, 28, 7, 42, 19};
    // MISTAKE: Initializing min to 0 means no positive number can be smaller
    int min = 0;
    
    for (int i = 0; i < 5; i++) {
        if (nums[i] < min) {
            min = nums[i];
        }
    }
    
    printf("Min: %d\\n", min);
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main() {
    int nums[5] = {14, 28, 7, 42, 19};
    int min = nums[0];
    
    for (int i = 1; i < 5; i++) {
        if (nums[i] < min) {
            min = nums[i];
        }
    }
    
    printf("Min: %d\\n", min);
    return 0;
}`,
    testCases: [
      { id: 1, input: '', expectedOutput: 'Min: 7' },
    ],
    explanation: 'Initializing `min` to 0 prevents any positive number from replacing it. Initialize `min` to `nums[0]`.'
  },

  // ==========================================
  // C — MEDIUM
  // ==========================================
  {
    id: 'm1-c-med-1',
    mode: MODES.FIND_MISTAKE,
    language: LANGUAGES.C,
    executionType: 'stdio',
    category: 'Functions & Pointers',
    difficulty: 'Medium',
    conceptKey: 'c_swap_pointers_pass_by_value',
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
    explanation: 'In C, parameters are passed by value. To modify caller variables, pass their memory addresses with `&x, &y` and dereference pointers in `swap`.'
  },
  {
    id: 'm1-c-med-2',
    mode: MODES.FIND_MISTAKE,
    language: LANGUAGES.C,
    executionType: 'stdio',
    category: 'Strings & Pointers',
    difficulty: 'Medium',
    conceptKey: 'c_string_null_terminator',
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
    id: 'm1-c-med-3',
    mode: MODES.FIND_MISTAKE,
    language: LANGUAGES.C,
    executionType: 'stdio',
    category: 'Pointers & Precedence',
    difficulty: 'Medium',
    conceptKey: 'c_pointer_dereference_precedence',
    title: 'Pointer Increment Precedence Bug',
    question: 'Fix the operator precedence when incrementing the value pointed to by a pointer.',
    description: 'The function `increment_counter` should increment the integer counter value by 1. Currently, it increments the pointer address instead.',
    starterCode: `#include <stdio.h>

void increment_counter(int *ptr) {
    // MISTAKE: *ptr++ increments the pointer address, not the integer value
    *ptr++;
}

int main() {
    int count = 10;
    increment_counter(&count);
    printf("Count: %d\\n", count);
    return 0;
}`,
    solutionCode: `#include <stdio.h>

void increment_counter(int *ptr) {
    (*ptr)++;
}

int main() {
    int count = 10;
    increment_counter(&count);
    printf("Count: %d\\n", count);
    return 0;
}`,
    testCases: [
      { id: 1, input: '', expectedOutput: 'Count: 11' },
    ],
    explanation: 'Due to operator precedence, postfix `++` binds tighter than `*`. `*ptr++` advances the pointer itself. Wrap with parentheses: `(*ptr)++`.'
  },

  // ==========================================
  // C — HARD
  // ==========================================
  {
    id: 'm1-c-hard-1',
    mode: MODES.FIND_MISTAKE,
    language: LANGUAGES.C,
    executionType: 'stdio',
    category: 'Matrix & Algorithms',
    difficulty: 'Hard',
    conceptKey: 'c_matrix_transpose_double_swap',
    title: 'In-Place Matrix Transpose Double Swap Bug',
    question: 'Fix the nested loop boundaries in the matrix transpose so that elements are not swapped twice back to their original positions.',
    description: 'The program performs an in-place transpose of a 3x3 matrix. Fix the inner loop boundary so that only the upper triangle is swapped.',
    starterCode: `#include <stdio.h>

int main() {
    int mat[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    
    // MISTAKE: j goes from 0 to 3, swapping elements twice and reverting them!
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            int temp = mat[i][j];
            mat[i][j] = mat[j][i];
            mat[j][i] = temp;
        }
    }
    
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            printf("%d ", mat[i][j]);
        }
        printf("\\n");
    }
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int main() {
    int mat[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    
    for (int i = 0; i < 3; i++) {
        for (int j = i + 1; j < 3; j++) {
            int temp = mat[i][j];
            mat[i][j] = mat[j][i];
            mat[j][i] = temp;
        }
    }
    
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            printf("%d ", mat[i][j]);
        }
        printf("\\n");
    }
    return 0;
}`,
    testCases: [
      { id: 1, input: '', expectedOutput: '1 4 7 \n2 5 8 \n3 6 9' },
    ],
    explanation: 'Transposing an in-place matrix requires swapping only the upper triangle (`j = i + 1; j < 3`). Iterating over all `j < 3` swaps every pair twice.'
  },
  {
    id: 'm1-c-hard-2',
    mode: MODES.FIND_MISTAKE,
    language: LANGUAGES.C,
    executionType: 'stdio',
    category: 'Searching & Algorithms',
    difficulty: 'Hard',
    conceptKey: 'c_binary_search_right_bound',
    title: 'Binary Search High Boundary Update Bug',
    question: 'Fix the high boundary update in binary search to prevent an infinite loop.',
    description: 'The binary search function returns the index of a target value in a sorted array, or -1 if not found.',
    starterCode: `#include <stdio.h>

int binary_search(int arr[], int n, int target) {
    int low = 0;
    int high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            // MISTAKE: high = mid causes an infinite loop when target is missing in left half
            high = mid;
        }
    }
    return -1;
}

int main() {
    int arr[] = {2, 5, 8, 12, 16, 23, 38};
    int idx = binary_search(arr, 7, 10);
    printf("Index: %d\\n", idx);
    return 0;
}`,
    solutionCode: `#include <stdio.h>

int binary_search(int arr[], int n, int target) {
    int low = 0;
    int high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return -1;
}

int main() {
    int arr[] = {2, 5, 8, 12, 16, 23, 38};
    int idx = binary_search(arr, 7, 10);
    printf("Index: %d\\n", idx);
    return 0;
}`,
    testCases: [
      { id: 1, input: '', expectedOutput: 'Index: -1' },
    ],
    explanation: 'When `arr[mid] > target`, the target must be in the left half, excluding `mid`. Setting `high = mid - 1` prevents infinite loops.'
  },

  // ==========================================
  // JAVA — EASY
  // ==========================================
  {
    id: 'm1-java-easy-1',
    mode: MODES.FIND_MISTAKE,
    language: LANGUAGES.JAVA,
    executionType: 'stdio',
    category: 'Strings',
    difficulty: 'Easy',
    conceptKey: 'java_string_reference_equality',
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
    id: 'm1-java-easy-2',
    mode: MODES.FIND_MISTAKE,
    language: LANGUAGES.JAVA,
    executionType: 'stdio',
    category: 'Arrays & Loops',
    difficulty: 'Easy',
    conceptKey: 'java_array_index_bounds',
    title: 'Array Index Out of Bounds in Count Evens',
    question: 'Fix the loop termination boundary condition to prevent an ArrayIndexOutOfBoundsException.',
    description: 'The program counts and prints how many integers in an array are even. Fix the loop boundary so that it does not exceed valid array indices.',
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
    explanation: 'Java arrays are 0-indexed with valid indices from `0` to `length - 1`. `i <= numbers.length` throws `ArrayIndexOutOfBoundsException`. Change to `i < numbers.length`.'
  },
  {
    id: 'm1-java-easy-3',
    mode: MODES.FIND_MISTAKE,
    language: LANGUAGES.JAVA,
    executionType: 'stdio',
    category: 'Data Types & Math',
    difficulty: 'Easy',
    conceptKey: 'java_int_division_percentage',
    title: 'Integer Division Truncation in Percentage',
    question: 'Fix the integer division bug so that the percentage calculation retains decimal precision.',
    description: 'The program calculates the percentage of points scored (36 out of 40 = 90.0%). Fix the calculation so it does not evaluate to 0.0%.',
    starterCode: `public class Main {
    public static void main(String[] args) {
        int scored = 36;
        int total = 40;
        // MISTAKE: Integer division 36 / 40 evaluates to 0 before casting or multiplying
        double percentage = (scored / total) * 100.0;
        System.out.printf("%.1f%%\\n", percentage);
    }
}`,
    solutionCode: `public class Main {
    public static void main(String[] args) {
        int scored = 36;
        int total = 40;
        double percentage = ((double) scored / total) * 100.0;
        System.out.printf("%.1f%%\\n", percentage);
    }
}`,
    testCases: [
      { id: 1, input: '', expectedOutput: '90.0%' },
    ],
    explanation: 'In Java, `36 / 40` performs integer division and truncates to `0`. Casting either operand with `(double) scored` promotes the division to floating point.'
  },

  // ==========================================
  // JAVA — MEDIUM
  // ==========================================
  {
    id: 'm1-java-med-1',
    mode: MODES.FIND_MISTAKE,
    language: LANGUAGES.JAVA,
    executionType: 'stdio',
    category: 'Arrays & Loops',
    difficulty: 'Medium',
    conceptKey: 'java_find_max_negative_array',
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
    id: 'm1-java-med-2',
    mode: MODES.FIND_MISTAKE,
    language: LANGUAGES.JAVA,
    executionType: 'stdio',
    category: 'Loops & Math',
    difficulty: 'Medium',
    conceptKey: 'java_factorial_accumulator_init',
    title: 'Factorial Accumulator Initialization Bug',
    question: 'Fix the variable initialization bug in the factorial program.',
    description: 'The program calculates the factorial of 5 (5! = 120). Currently, it incorrectly produces 0.',
    starterCode: `public class Main {
    public static void main(String[] args) {
        int n = 5;
        // MISTAKE: Initializing accumulator to 0 causes all subsequent multiplications to yield 0
        int fact = 0;
        for (int i = 1; i <= n; i++) {
            fact *= i;
        }
        System.out.println("Factorial: " + fact);
    }
}`,
    solutionCode: `public class Main {
    public static void main(String[] args) {
        int n = 5;
        int fact = 1;
        for (int i = 1; i <= n; i++) {
            fact *= i;
        }
        System.out.println("Factorial: " + fact);
    }
}`,
    testCases: [
      { id: 1, input: '', expectedOutput: 'Factorial: 120' },
    ],
    explanation: 'A multiplicative accumulator must be initialized to 1, not 0. Multiplying 0 by any number always results in 0.'
  },
  {
    id: 'm1-java-med-3',
    mode: MODES.FIND_MISTAKE,
    language: LANGUAGES.JAVA,
    executionType: 'stdio',
    category: 'Searching & Algorithms',
    difficulty: 'Medium',
    conceptKey: 'java_binary_search_low_update',
    title: 'Binary Search Lower Bound Infinite Loop',
    question: 'Fix the lower bound update in binary search to prevent an infinite loop.',
    description: 'The binary search method searches for a key in a sorted array and returns its index, or -1 if not found.',
    starterCode: `public class Main {
    public static int binarySearch(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] == target) {
                return mid;
            } else if (arr[mid] < target) {
                // MISTAKE: left = mid leads to an infinite loop when target is missing
                left = mid;
            } else {
                right = mid - 1;
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] arr = {1, 3, 5, 7, 9, 11};
        System.out.println(binarySearch(arr, 6));
    }
}`,
    solutionCode: `public class Main {
    public static int binarySearch(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] == target) {
                return mid;
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] arr = {1, 3, 5, 7, 9, 11};
        System.out.println(binarySearch(arr, 6));
    }
}`,
    testCases: [
      { id: 1, input: '', expectedOutput: '-1' },
    ],
    explanation: '`left = mid` causes an infinite loop when `left` and `right` converge. Update `left = mid + 1`.'
  },

  // ==========================================
  // JAVA — HARD
  // ==========================================
  {
    id: 'm1-java-hard-1',
    mode: MODES.FIND_MISTAKE,
    language: LANGUAGES.JAVA,
    executionType: 'stdio',
    category: 'Data Structures & Queues',
    difficulty: 'Hard',
    conceptKey: 'java_queue_bfs_size_evaluation',
    title: 'BFS Level Order Queue Size Loop Condition Bug',
    question: 'Fix the queue size evaluation inside the BFS level traversal loop.',
    description: 'The code processes nodes level by level using BFS. Currently, evaluating `queue.size()` inside the loop condition causes incomplete level processing.',
    starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Queue<Integer> queue = new LinkedList<>();
        queue.add(1);
        queue.add(2);
        queue.add(3);
        
        List<Integer> levelItems = new ArrayList<>();
        
        // MISTAKE: queue.size() is re-evaluated each iteration as items are removed!
        for (int i = 0; i < queue.size(); i++) {
            levelItems.add(queue.poll());
        }
        
        System.out.println("Processed: " + levelItems.size());
    }
}`,
    solutionCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Queue<Integer> queue = new LinkedList<>();
        queue.add(1);
        queue.add(2);
        queue.add(3);
        
        List<Integer> levelItems = new ArrayList<>();
        int levelSize = queue.size();
        for (int i = 0; i < levelSize; i++) {
            levelItems.add(queue.poll());
        }
        
        System.out.println("Processed: " + levelItems.size());
    }
}`,
    testCases: [
      { id: 1, input: '', expectedOutput: 'Processed: 3' },
    ],
    explanation: '`queue.size()` dynamically changes as elements are polled. The loop terminates early after processing only half the items. Snapshot `int levelSize = queue.size()` before the loop.'
  },
  {
    id: 'm1-java-hard-2',
    mode: MODES.FIND_MISTAKE,
    language: LANGUAGES.JAVA,
    executionType: 'stdio',
    category: 'Dynamic Programming',
    difficulty: 'Hard',
    conceptKey: 'java_dp_coin_change_unreachable',
    title: 'Coin Change DP Unreachable State Bug',
    question: 'Fix the DP initialization in Coin Change so unreachable amounts do not default to 0.',
    description: 'The program determines the minimum number of coins needed to make amount 7 using coins {2, 5}. Currently, unreachable subproblems incorrectly yield 0 coins.',
    starterCode: `public class Main {
    public static int coinChange(int[] coins, int amount) {
        // MISTAKE: Initializing with 0 causes Math.min to always pick 0
        int[] dp = new int[amount + 1];
        dp[0] = 0;
        
        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (i - coin >= 0) {
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                }
            }
        }
        return dp[amount];
    }

    public static void main(String[] args) {
        int[] coins = {2, 5};
        System.out.println("Coins: " + coinChange(coins, 7));
    }
}`,
    solutionCode: `import java.util.Arrays;

public class Main {
    public static int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        
        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (i - coin >= 0) {
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }

    public static void main(String[] args) {
        int[] coins = {2, 5};
        System.out.println("Coins: " + coinChange(coins, 7));
    }
}`,
    testCases: [
      { id: 1, input: '', expectedOutput: 'Coins: 2' },
    ],
    explanation: 'Java `new int[n]` initializes elements to 0. `Math.min(0, dp[i-coin] + 1)` will always return 0. Initialize array with `amount + 1` (a sentinel larger than any valid answer).'
  }
];

// Active runtime in-memory database of all questions across all 4 modes
const seedQuestionsMap = new Map();
for (const q of INITIAL_FIND_MISTAKE_QUESTIONS) {
  if (q && q.id) seedQuestionsMap.set(q.id, q);
}
for (const q of staticQuestions) {
  if (q && q.id && !seedQuestionsMap.has(q.id)) {
    seedQuestionsMap.set(q.id, q);
  }
}
for (const q of CURATED_QUESTIONS) {
  if (q && q.id && !seedQuestionsMap.has(q.id)) {
    seedQuestionsMap.set(q.id, q);
  }
}
let masterQuestionBank = Array.from(seedQuestionsMap.values());

// Procedural dynamic question generator patterns for unlimited generation
const DYNAMIC_QUESTION_TEMPLATES = [
  // Template A: Python Array / List Window or Filter
  {
    language: 'python',
    difficulties: ['Easy', 'Medium'],
    category: 'Arrays & Math',
    generate: (idx) => {
      const step = 2 + (idx % 3);
      const limit = 10 + (idx * 2);
      return {
        id: `m1-gen-py-step-${idx}`,
        mode: MODES.FIND_MISTAKE,
        language: LANGUAGES.PYTHON,
        executionType: 'function',
        functionName: 'sum_multiples',
        difficulty: idx % 2 === 0 ? 'Easy' : 'Medium',
        category: 'Loops & Sequences',
        conceptKey: `py_gen_step_sum_${idx}`,
        title: `Sum of Multiples of ${step} Boundary Bug`,
        question: `Fix the loop range to correctly sum all positive multiples of ${step} up to ${limit}.`,
        description: `The function \`sum_multiples(n)\` should return the sum of all positive multiples of ${step} that are less than or equal to \`n\`.`,
        starterCode: `def sum_multiples(n):
    total = 0
    # MISTAKE: Starts from 0 or misses upper boundary n + 1
    for i in range(1, n, ${step}):
        total += i
    return total

print(sum_multiples(${limit}))`,
        solutionCode: `def sum_multiples(n):
    total = 0
    for i in range(${step}, n + 1, ${step}):
        total += i
    return total

print(sum_multiples(${limit}))`,
        testCases: [
          {
            id: 1,
            input: `${limit}`,
            expectedOutput: (() => {
              let s = 0;
              for (let i = step; i <= limit; i += step) s += i;
              return String(s);
            })()
          },
          {
            id: 2,
            input: `${step * 2}`,
            expectedOutput: String(step + step * 2)
          },
          {
            id: 3,
            input: `${step - 1}`,
            expectedOutput: '0'
          }
        ],
        explanation: `The range must start at \`${step}\` with step \`${step}\` and stop at \`n + 1\` so that \`n\` is included if it is a multiple.`
      };
    }
  },

  // Template B: C Array Frequency Counter
  {
    language: 'c',
    difficulties: ['Medium', 'Hard'],
    category: 'Arrays & Pointers',
    generate: (idx) => {
      const targetVal = 7;
      const otherVals = [1, 2, 3, 4, 5, 6, 8, 9, 10];
      const o1 = otherVals[(idx * 2) % otherVals.length];
      const o2 = otherVals[(idx * 3 + 1) % otherVals.length];
      const o3 = otherVals[(idx * 5 + 2) % otherVals.length];
      const expectedCount = 3;
      return {
        id: `m1-gen-c-count-${idx}`,
        mode: MODES.FIND_MISTAKE,
        language: LANGUAGES.C,
        executionType: 'stdio',
        difficulty: 'Medium',
        category: 'Arrays & Search',
        conceptKey: `c_gen_count_return_${idx}`,
        title: `Element Frequency Premature Return Bug (${idx + 1})`,
        question: 'Fix the function so it completes counting occurrences instead of returning on the first match.',
        description: `The program counts how many times the value ${targetVal} appears in an integer array. Fix the loop return logic.`,
        starterCode: `#include <stdio.h>

int count_occurrences(int arr[], int n, int target) {
    int count = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) {
            count++;
            // MISTAKE: Prematurely returns 1 instead of continuing the loop
            return count;
        }
    }
    return count;
}

int main() {
    int arr[6] = {${targetVal}, ${o1}, ${targetVal}, ${o2}, ${targetVal}, ${o3}};
    int res = count_occurrences(arr, 6, ${targetVal});
    printf("Occurrences: %d\\n", res);
    return 0;
}`,
        solutionCode: `#include <stdio.h>

int count_occurrences(int arr[], int n, int target) {
    int count = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) {
            count++;
        }
    }
    return count;
}

int main() {
    int arr[6] = {${targetVal}, ${o1}, ${targetVal}, ${o2}, ${targetVal}, ${o3}};
    int res = count_occurrences(arr, 6, ${targetVal});
    printf("Occurrences: %d\\n", res);
    return 0;
}`,
        testCases: [
          { id: 1, input: '', expectedOutput: `Occurrences: ${expectedCount}` }
        ],
        explanation: 'Removing the premature `return count;` inside the loop allows the loop to iterate through all elements.'
      };
    }
  },

  // Template C: Java String Character Deduplication or Accumulator
  {
    language: 'java',
    difficulties: ['Easy', 'Medium', 'Hard'],
    category: 'Strings & Algorithms',
    generate: (idx) => {
      return {
        id: `m1-gen-java-dup-${idx}`,
        mode: MODES.FIND_MISTAKE,
        language: LANGUAGES.JAVA,
        executionType: 'stdio',
        difficulty: idx % 2 === 0 ? 'Medium' : 'Hard',
        category: 'Strings & Collections',
        conceptKey: `java_gen_string_dedup_${idx}`,
        title: `Character Duplicate Filter String Order Bug (${idx + 1})`,
        question: 'Fix the index lookup in character deduplication.',
        description: 'The program removes duplicate characters from string "programming" while maintaining first-appearance order.',
        starterCode: `public class Main {
    public static void main(String[] args) {
        String input = "programming";
        StringBuilder sb = new StringBuilder();
        
        for (int i = 0; i < input.length(); i++) {
            char c = input.charAt(i);
            // MISTAKE: Checking input.indexOf instead of sb.indexOf checks against original string
            if (input.indexOf(c) != i) {
                sb.append(c);
            }
        }
        System.out.println(sb.toString());
    }
}`,
        solutionCode: `public class Main {
    public static void main(String[] args) {
        String input = "programming";
        StringBuilder sb = new StringBuilder();
        
        for (int i = 0; i < input.length(); i++) {
            char c = input.charAt(i);
            if (sb.indexOf(String.valueOf(c)) == -1) {
                sb.append(c);
            }
        }
        System.out.println(sb.toString());
    }
}`,
        testCases: [
          { id: 1, input: '', expectedOutput: 'progamin' }
        ],
        explanation: 'Checking `sb.indexOf(...) == -1` ensures characters that already exist in the deduplicated result are not appended again.'
      };
    }
  },

  // Template D: Python Matrix Center Double-Counting in Diagonal Sum
  {
    language: 'python',
    difficulties: ['Easy', 'Medium'],
    category: 'Matrices & Logic',
    generate: (idx) => {
      return {
        id: `m1-gen-py-matrix-${idx}`,
        mode: MODES.FIND_MISTAKE,
        language: LANGUAGES.PYTHON,
        executionType: 'function',
        functionName: 'diagonal_sum',
        difficulty: idx % 2 === 0 ? 'Easy' : 'Medium',
        category: 'Matrices & Loops',
        conceptKey: `py_gen_matrix_center_${idx}`,
        title: `Matrix Diagonal Sum Center Double-Count (${idx + 1})`,
        question: 'Fix the matrix diagonal sum so the center element of an odd-dimension square matrix is not added twice.',
        description: 'The function `diagonal_sum(mat)` calculates the sum of the primary and secondary diagonals of an n x n square matrix.',
        starterCode: `def diagonal_sum(mat):
    n = len(mat)
    total = 0
    # MISTAKE: When i == n - 1 - i (center element), it is added twice
    for i in range(n):
        total += mat[i][i]
        total += mat[i][n - 1 - i]
    return total

print(diagonal_sum([[1, 2, 3], [4, 5, 6], [7, 8, 9]]))`,
        solutionCode: `def diagonal_sum(mat):
    n = len(mat)
    total = 0
    for i in range(n):
        total += mat[i][i]
        if i != n - 1 - i:
            total += mat[i][n - 1 - i]
    return total

print(diagonal_sum([[1, 2, 3], [4, 5, 6], [7, 8, 9]]))`,
        testCases: [
          { id: 1, input: '[[1, 2, 3], [4, 5, 6], [7, 8, 9]]', expectedOutput: '25' },
          { id: 2, input: '[[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]]', expectedOutput: '8' },
          { id: 3, input: '[[5]]', expectedOutput: '5' }
        ],
        explanation: 'In an odd-sized matrix (e.g. 3x3), the center element `mat[1][1]` sits on both diagonals. Only add `mat[i][n-1-i]` when `i != n - 1 - i`.'
      };
    }
  },

  // Template E: C String In-Place Reversal Loop Bound
  {
    language: 'c',
    difficulties: ['Medium', 'Hard'],
    category: 'Strings & Pointers',
    generate: (idx) => {
      return {
        id: `m1-gen-c-rev-${idx}`,
        mode: MODES.FIND_MISTAKE,
        language: LANGUAGES.C,
        executionType: 'stdio',
        difficulty: 'Medium',
        category: 'Strings & Arrays',
        conceptKey: `c_gen_str_rev_${idx}`,
        title: `String In-Place Reversal Boundary Bug (${idx + 1})`,
        question: 'Fix the loop termination boundary in string reversal so characters are not swapped twice.',
        description: 'The program reverses the string "Interview" in place using two pointers. Fix the loop boundary so that it stops at the midpoint.',
        starterCode: `#include <stdio.h>
#include <string.h>

void reverse_str(char str[]) {
    int len = strlen(str);
    // MISTAKE: i < len swaps every element twice, restoring the original string!
    for (int i = 0; i < len; i++) {
        char temp = str[i];
        str[i] = str[len - 1 - i];
        str[len - 1 - i] = temp;
    }
}

int main() {
    char s[] = "Interview";
    reverse_str(s);
    printf("Reversed: %s\\n", s);
    return 0;
}`,
        solutionCode: `#include <stdio.h>
#include <string.h>

void reverse_str(char str[]) {
    int len = strlen(str);
    for (int i = 0; i < len / 2; i++) {
        char temp = str[i];
        str[i] = str[len - 1 - i];
        str[len - 1 - i] = temp;
    }
}

int main() {
    char s[] = "Interview";
    reverse_str(s);
    printf("Reversed: %s\\n", s);
    return 0;
}`,
        testCases: [
          { id: 1, input: '', expectedOutput: 'Reversed: weivretnI' }
        ],
        explanation: 'An in-place reversal must only iterate up to `len / 2`. Iterating up to `len` swaps each character twice.'
      };
    }
  },

  // Template F: Java Maximum Subarray Sum (Kadane's Algorithm) with Negative Numbers
  {
    language: 'java',
    difficulties: ['Medium', 'Hard'],
    category: 'Algorithms & Dynamic Programming',
    generate: (idx) => {
      return {
        id: `m1-gen-java-kadane-${idx}`,
        mode: MODES.FIND_MISTAKE,
        language: LANGUAGES.JAVA,
        executionType: 'stdio',
        difficulty: 'Hard',
        category: 'Dynamic Programming & Arrays',
        conceptKey: `java_gen_kadane_init_${idx}`,
        title: `Maximum Subarray Sum All-Negative Initialization Bug (${idx + 1})`,
        question: 'Fix the maxSoFar initialization in Kadane\'s algorithm for negative arrays.',
        description: 'The program finds the contiguous subarray with the largest sum in an array containing negative numbers. Currently, it outputs 0 instead of the maximum single negative number.',
        starterCode: `public class Main {
    public static int maxSubArray(int[] nums) {
        // MISTAKE: Initializing maxSoFar to 0 fails when all numbers are negative
        int maxSoFar = 0;
        int currentMax = nums[0];
        
        for (int i = 1; i < nums.length; i++) {
            currentMax = Math.max(nums[i], currentMax + nums[i]);
            maxSoFar = Math.max(maxSoFar, currentMax);
        }
        return maxSoFar;
    }

    public static void main(String[] args) {
        int[] arr = {-5, -2, -8, -1, -4};
        System.out.println("Max Sum: " + maxSubArray(arr));
    }
}`,
        solutionCode: `public class Main {
    public static int maxSubArray(int[] nums) {
        int maxSoFar = nums[0];
        int currentMax = nums[0];
        
        for (int i = 1; i < nums.length; i++) {
            currentMax = Math.max(nums[i], currentMax + nums[i]);
            maxSoFar = Math.max(maxSoFar, currentMax);
        }
        return maxSoFar;
    }

    public static void main(String[] args) {
        int[] arr = {-5, -2, -8, -1, -4};
        System.out.println("Max Sum: " + maxSubArray(arr));
    }
}`,
        testCases: [
          { id: 1, input: '', expectedOutput: 'Max Sum: -1' }
        ],
        explanation: 'In Kadane\'s algorithm, initialize `maxSoFar = nums[0]`. Initializing to 0 causes negative arrays to incorrectly report 0.'
      };
    }
  }
];

let dynamicCounter = 1;

/**
 * Validates a candidate question using the actual code sandbox.
 * Ensures:
 * 1. Starter code FAILS (verdict != CORRECT)
 * 2. Solution code PASSES (verdict == CORRECT)
 */
export async function validateQuestion(question) {
  try {
    // 1. Test starter code
    const starterRes = await runCode({
      language: question.language,
      code: question.starterCode,
      testCases: question.testCases,
      question,
    });

    if (starterRes.verdict === 'CORRECT') {
      console.warn(`[Validator] Rejected question "${question.title}": Starter code unexpectedly passed.`);
      return false;
    }

    // 2. Test solution code
    const solRes = await runCode({
      language: question.language,
      code: question.solutionCode,
      testCases: question.testCases,
      question,
    });

    if (solRes.verdict !== 'CORRECT' || solRes.passedCount !== solRes.totalCount) {
      console.warn(`[Validator] Rejected question "${question.title}": Solution code failed (${solRes.verdict}).`);
      return false;
    }

    return true;
  } catch (err) {
    console.error(`[Validator] Error validating question "${question.title}":`, err);
    return false;
  }
}

/**
 * Generates and validates a new question on-demand.
 */
export async function generateNewQuestion({ language, difficulty }) {
  const matchingTemplates = DYNAMIC_QUESTION_TEMPLATES.filter(
    (t) => t.language.toLowerCase() === language.toLowerCase()
  );

  const template = matchingTemplates[dynamicCounter % matchingTemplates.length];
  if (!template) {
    return null;
  }

  const candidate = template.generate(dynamicCounter++);
  if (difficulty) {
    candidate.difficulty = difficulty;
  }

  // Uniqueness check against existing bank
  const isDuplicate = masterQuestionBank.some(
    (q) =>
      q.id === candidate.id ||
      q.title.toLowerCase() === candidate.title.toLowerCase() ||
      q.starterCode.trim() === candidate.starterCode.trim()
  );

  if (isDuplicate) {
    candidate.id = `m1-gen-${language}-${Date.now()}`;
  }

  // Validate quality
  const isValid = await validateQuestion(candidate);
  if (isValid) {
    masterQuestionBank.push(candidate);
    return candidate;
  }

  return null;
}

/**
 * Generates and validates a new question for any mode on-demand.
 */
export async function generateQuestionForMode({ mode = 'FIND_MISTAKE', language = 'python', difficulty = 'Easy' }) {
  const normMode = (mode || 'FIND_MISTAKE').toUpperCase();
  if (normMode === 'FIND_MISTAKE') {
    return generateNewQuestion({ language, difficulty });
  } else if (normMode === 'WRITE_FROM_SCRATCH' || normMode === 'WRITE_CODE') {
    const q = generateWriteCodeQuestion({ language, difficulty });
    if (q) {
      masterQuestionBank.push(q);
      return q;
    }
  } else if (normMode === 'PREDICT_OUTPUT') {
    const q = generatePredictOutputQuestion({ language, difficulty });
    if (q) {
      masterQuestionBank.push(q);
      return q;
    }
  } else if (normMode === 'FILL_MISSING_CODE') {
    const q = generateFillBlankQuestion({ language, difficulty });
    if (q) {
      masterQuestionBank.push(q);
      return q;
    }
  }
  return null;
}

/**
 * Retrieves questions matching criteria, excluding already attempted/seen IDs.
 * Works across ALL 4 practice modes.
 */
export async function getQuestions({ mode = 'FIND_MISTAKE', language, difficulty, category, excludeIds = [], limit = 4 }) {
  const excludeSet = new Set(Array.isArray(excludeIds) ? excludeIds : [excludeIds]);
  const normMode = mode ? mode.toUpperCase() : null;

  let pool = masterQuestionBank.filter((q) => {
    if (normMode && q.mode.toUpperCase() !== normMode) return false;
    if (language && q.language.toLowerCase() !== language.toLowerCase()) return false;
    if (difficulty && q.difficulty && q.difficulty.toLowerCase() !== difficulty.toLowerCase()) return false;
    if (category && q.category && q.category.toLowerCase() !== category.toLowerCase()) return false;
    return true;
  });

  // Separate unattempted vs attempted
  let unattempted = pool.filter((q) => !excludeSet.has(q.id));

  // If pool has fewer questions than requested limit, generate additional questions on the fly
  let attempts = 0;
  while (unattempted.length < limit && attempts < 10) {
    attempts++;
    const newQ = await generateQuestionForMode({
      mode: normMode || 'FIND_MISTAKE',
      language: language || 'python',
      difficulty: difficulty || 'Easy'
    });
    if (!newQ) break;
    if (!excludeSet.has(newQ.id) && !unattempted.some(q => q.id === newQ.id)) {
      unattempted.push(newQ);
    }
  }

  // If user has seen all available questions, cycle oldest to keep practice going
  if (unattempted.length < limit && pool.length > 0) {
    for (const q of pool) {
      if (!unattempted.some(u => u.id === q.id)) {
        unattempted.push(q);
        if (unattempted.length >= limit) break;
      }
    }
  }

  return unattempted.slice(0, limit);
}

/**
 * Retrieves the NEXT single unattempted question for continuous practice across ALL 4 modes.
 */
export async function getNextQuestion({ mode = 'FIND_MISTAKE', language, difficulty, category, excludeIds = [] }) {
  const excludeSet = new Set(Array.isArray(excludeIds) ? excludeIds : [excludeIds]);
  const normMode = mode ? mode.toUpperCase() : null;

  // Find candidate among existing pool
  const candidate = masterQuestionBank.find((q) => {
    if (normMode && q.mode.toUpperCase() !== normMode) return false;
    if (language && q.language.toLowerCase() !== language.toLowerCase()) return false;
    if (difficulty && q.difficulty && q.difficulty.toLowerCase() !== difficulty.toLowerCase()) return false;
    if (category && q.category && q.category.toLowerCase() !== category.toLowerCase()) return false;
    if (excludeSet.has(q.id)) return false;
    return true;
  });

  if (candidate) {
    return candidate;
  }

  // If exhausted, generate a new valid question on the fly
  for (let attempt = 0; attempt < 5; attempt++) {
    const newQ = await generateQuestionForMode({
      mode: normMode || 'FIND_MISTAKE',
      language: language || 'python',
      difficulty: difficulty || 'Easy'
    });
    if (newQ && !excludeSet.has(newQ.id)) {
      return newQ;
    }
  }

  // Fallback to least recently seen if absolutely no more can be generated
  return masterQuestionBank.find((q) => {
    if (normMode && q.mode.toUpperCase() !== normMode) return false;
    if (language && q.language.toLowerCase() !== language.toLowerCase()) return false;
    return true;
  }) || null;
}

/**
 * Look up question by ID across the entire bank.
 */
export function getQuestionById(id) {
  return masterQuestionBank.find((q) => q.id === id);
}

/**
 * Get all questions in the bank.
 */
export function getAllQuestions() {
  return masterQuestionBank;
}
