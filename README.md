<div align="center">

# 🚀 Data Structures & Algorithms in JavaScript

**A journey from understanding syntax to mastering algorithms.**  
_Implemented in pure JavaScript with a focus on clean architecture and performance._

[Overview](#-about-the-journey) • [Philosophy](#-project-philosophy) • [Structure](#-repository-structure) • [Tech Stack](#-tech-stack--tools) • [Connect](#-connect-with-me)

</div>

---

## 📖 About The Journey

Like many developers, I started with "tutorial hell" — watching videos but struggling to apply concepts. I created this repository to break that cycle.

My goal is simple: **Don't just solve it. Understand it.**

For every problem in this repo, I don't just paste a solution. I rewrite it, optimize it, and explain it to myself (and you) in plain English. This process forces me to convert abstract logic into concrete, readable code.

---

## 🌟 Project Philosophy

To make this repository useful for myself & for others, I adhere to three core principles:

1.  **Clean Code Architecture**  
    Code shouldn't look like a competitive programming snippet. I use descriptive variable names (e.g., `currentIndex` instead of `i`) and modular logic. It reads like a story.

2.  **Optimized Performance**  
    A working solution isn't enough. I strive for the optimal **Time & Space Complexity** (usually O(N) or O(1)), ensuring the code is production-ready.

3.  **Human-Readable Notes**  
    My "Notes" sections explain the _why_ behind the _how_, breaking down complex patterns into simple, conversational logic.

---

## 📌 Repository Structure

I have organized my solutions by difficulty level to track my progression from foundational concepts to advanced problem-solving capabilities.

| Level      | Badge | Description           | Focus Areas                                        |
| :--------- | :---: | :-------------------- | :------------------------------------------------- |
| **Easy**   |  🟢   | Foundational Problems | Basic Arrays, Strings, Simple Hash Maps            |
| **Medium** |  🟡   | Core Logic & Patterns | Sliding Window, Two Pointers, Linked Lists, Trees  |
| **Hard**   |  🔴   | Advanced Optimization | DP, Graphs, Backtracking, System Design components |

---

## �️ Tech Stack & Tools

My development environment matches modern industry standards:

| Component    | Technology                                                                                                       | Details                                               |
| :----------- | :--------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------- |
| **Language** | ![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) | ES6+ features (Arrow functions, Classes, Async/Await) |
| **Runtime**  | ![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)          | Executed via Node.js runtime / Browser Console        |

---

## �📚 Topics Covered

<details open>
<summary><strong>Click to collapse topics</strong></summary>

<br>

### Data Structures & Concepts

- [x] **Arrays & Strings** (e.g., Two Sum, Group By, Flatten)
- [x] **Closures & Functions** (e.g., Memoize, Debounce, Once)
- [x] **Asynchronous Programming** (e.g., Promise.all Polyfill, Cancellable Intervals)
- [x] **Classes & OOP** (e.g., Event Emitter, Method Chaining)
- [ ] Linked Lists (Singly & Doubly)
- [ ] Stacks & Queues
- [x] Trees (Binary, BST, AVL, Tries)
- [ ] Heaps (Min/Max Priority Queues)
- [ ] Graphs (Adjacency List/Matrix)

### Algorithms

- [x] **Sorting** (Custom Sort By)
- [ ] Searching (Binary Search)
- [x] Recursion & Backtracking
- [x] Dynamic Programming
- [ ] Greedy Algorithms
- [ ] Graph Traversal (BFS, DFS)
</details>

---

## 💡 Solution Index

A curated list of problems that significantly improved my understanding.

### Array & Strings

| Problem                                                           | Difficulty | Pattern/Concept             |                                      Solution Link                                       |
| :---------------------------------------------------------------- | :--------: | :-------------------------- | :--------------------------------------------------------------------------------------: |
| **Two Sum**                                                       |     🟢     | Hash Map                    |                             [Link](./Array/Easy/Two_Sum.js)                              |
| **Apply Transform Over Each Element**                             |     🟢     | Map Function                |            [Link](./Array/Easy/Apply_Transform_Over_Each_Element_in_Array.js)            |
| **Array Prototype Last**                                          |     🟢     | Prototype Extension         |                       [Link](./Array/Easy/Array_Prototype_Last.js)                       |
| **Array Reduce Transformation**                                   |     🟢     | Reduce Logic                |                   [Link](./Array/Easy/Array_Reduce_Transformation.js)                    |
| **Chunk Array**                                                   |     🟢     | Slicing / Loops             |                           [Link](./Array/Easy/Chunk_Array.js)                            |
| **Filter Elements from Array**                                    |     🟢     | Filter Logic                |                    [Link](./Array/Easy/Filter_Elements_from_Array.js)                    |
| **Is Object Empty**                                               |     🟢     | JSON / Object Keys          |                         [Link](./Array/Easy/Is_Object_Empty.js)                          |
| **Max Consecutive Ones**                                          |     🟢     | Array / Counting            |                       [Link](./Array/Easy/Max_Consecutive_Ones.js)                       |
| **Missing Number**                                                |     🟢     | Math / Summation            |                          [Link](./Array/Easy/Missing_number.js)                          |
| **Move Zeroes**                                                   |     🟢     | Two Pointers                |                           [Link](./Array/Easy/Move_Zeroes.js)                            |
| **Plus One**                                                      |     🟢     | Array Manipulation          |                             [Link](./Array/Easy/Plus_One.js)                             |
| **Remove Element**                                                |     🟢     | Two Pointers                |                          [Link](./Array/Easy/Remove_Element.js)                          |
| **Single Number**                                                 |     🟢     | Bit Manipulation / XOR      |                          [Link](./Array/Easy/Single_Number.js)                           |
| **Reverse String**                                                |     🟢     | Two Pointers                |                         [Link](./String/Easy/Reverse_String.js)                          |
| **Roman to Integer**                                              |     🟢     | Hash Map / Math             |                             [Link](./String/Easy/Roman_to_Integer.js)                           |
| **Check if Strings Can be Made Equal With Operations I**          |     🟢     | String / Swap Logic         | [Link](./String/Easy/Check_if_Strings_Can_be_Made_Equal_With_Operations_I.js) |
| **Check if Binary String Has at Most One Segment of Ones**        |     🟢     | String / Greedy             |         [Link](./String/Easy/Check_If_Binary_Has_At_Most_One_Segment_Of_Ones.js)         |
| **Robot Return to Origin**                                        |     🟢     | String / Simulation         |         [Link](./String/Easy/Robot_Return_to_Origin.js)                         |
| **Check if Strings Can be Made Equal With Operations II**         |     🟡     | String / Swap Logic / Freq  | [Link](./String/Medium/Check_if_Strings_Can_be_Made_Equal_With_Operations_II.js) |
| **Minimum Number of Flips to Make the Binary String Alternating** |     🟡     | Sliding Window / Greedy     | [Link](./String/Medium/Minimum_Number_of_Flips_to_Make_the_Binary_String_Alternating.js) |
| **Decode the Slanted Ciphertext**                                 |     🟡     | String / Matrix Traversal   | [Link](./String/Medium/Decode_the_Slanted_Ciphertext.js) |
| **Find All Possible Stable Binary Arrays I**                      |     🟡     | Dynamic Programming         |    [Link](./Dynamic%20Programming/Medium/Find_All_Possible_Stable_Binary_Arrays_I.js)    |
| **Sort By**                                                       |     🟢     | Custom Sort                 |                             [Link](./Array/Easy/Sort_By.js)                              |
| **Join Arrays by ID**                                             |     🟢     | Map / Merge Logic           |                      [Link](./Array/Easy/Join_Two_Arrays_by_ID.js)                       |
| **Compact Object**                                                |     🟢     | Recursion / DFS             |                          [Link](./Array/Easy/Compact_Object.js)                          |
| **Merge Sorted Array**                                            |     🟢     | Two Pointers                |                       [Link](./Array/Easy/Merge_Sorted_Arrays.js)                        |
| **Remove Duplicates From Sorted Array**                           |     🟢     | Two Pointers                |               [Link](./Array/Easy/Remove_Duplicates_From_Sorted_Array.js)                |
| **Flip Square Submatrix Vertically** |     🟢     | Array / Two Pointers | [Link](./Array/Easy/Flip_Square_Submatrix_Vertically.js) |
| **Determine Whether Matrix Can Be Obtained By Rotation** |     🟢     | Array / Matrix Simulation | [Link](./Array/Easy/Determine_Whether_Matrix_Can_Be_Obtained_By_Rotation.js) |
| **Matrix Similarity After Cyclic Shifts**                    |     🟢     | Array / Cyclic Shifts           | [Link](./Array/Easy/Matrix_Similarity_After_Cyclic_Shifts.js) |
| **Flatten Nested Array**                                          |     🟡     | Recursion                   |                  [Link](./Array/Medium/Flatten_Deeply_Nested_Array.js)                   |
| **Group By**                                                      |     🟡     | Prototype / Hash Map        |                            [Link](./Array/Medium/Group_By.js)                            |
| **Container With Most Water**                                     |     🟡     | Two Pointers / Greedy       |                   [Link](./Array/Medium/Container_With_Most_Water.js)                    |
| **Find Unique Binary String**                                     |     🟡     | Cantor's Diagonal Argument  |                   [Link](./Array/Medium/Find_Unique_Binary_String.js)                    |
| **Median of Two Sorted Arrays**                                   |     🔴     | Binary Search               |                    [Link](./Array/Hard/Median_Of_Two_Sorted_Array.js)                    |
| **First Missing Positive**                                        |     🔴     | Index as Hash Map           |                      [Link](./Array/Hard/First_Missing_Positive.js)                      |
| **Candy**                                                         |     🔴     | Greedy                      |                              [Link](./Array/Hard/Candy.js)                               |
| **Trapping Rain Water**                                           |     🔴     | Two Pointers                |                       [Link](./Array/Hard/Trapping_Rain_Water.js)                        |
| **Largest Rectangle in Histogram**                                |     🔴     | Monotonic Stack             |                  [Link](./Array/Hard/Largest_Rectangle_In_Histogram.js)                  |
| **Text Justification**                                            |     🔴     | String / Greedy             |                        [Link](./Array/Hard/Text_Justification.js)                        |
| **Lexicographically Smallest Generated String**                   |     🔴     | String / Greedy / Sorting   | [Link](./String/Hard/Lexicographically_Smallest_Generated_String.js) |
| **Maximal Rectangle**                                             |     🔴     | Histogram / Monotonic Stack |                        [Link](./Array/Hard/Maximal_Rectangle.js)                         |
| **Perfect Rectangle**                                             |     🔴     | Geometry / Arrays           |                        [Link](./Array/Hard/Perfect_Rectangle.js)                         |
| **Reverse Pairs**                                                 |     🔴     | Array / Merge Sort          |                          [Link](./Array/Hard/Reverse_Pairs.js)                           |
| **Equal Sum Grid Partition II**                                   |     🔴     | Array / Grid Partition / Case Analysis | [Link](./Array/Hard/Equal_Sum_Grid_Partition_II.js) |
| **Count of Smaller Numbers After Self**                           |     🔴     | Array / Fenwick Tree        |               [Link](./Array/Hard/Count_of_Smaller_Numbers_After_Self.js)                |
| **Max Points on a Line**                                          |     🔴     | Geometry / Hash Map         |                       [Link](./Array/Hard/Max_Points_on_a_Line.js)                       |
| **Self Crossing**                                                 |     🔴     | Geometry / Array            |                          [Link](./Array/Hard/Self_Crossing.js)                           |
| **Robot Collisions**                                              |     🔴     | Stack / Sorting             |                         [Link](./Array/Hard/Robot_Collisions.js)                         |
| **Sliding Window Maximum**                                        |     🔴     | Monotonic Deque             |                      [Link](./Array/Hard/Sliding_Window_Maximum.js)                      |
| **Split Array Largest Sum**                                       |     🔴     | Binary Search               |                     [Link](./Array/Hard/Split_Array_Largest_Sum.js)                      |
| **Erect the Fence**                                               |     🔴     | Monotone Chain              |                         [Link](./Array/Hard/Erect_The_Fence.js)                          |
| **Shortest Subarray with Sum at Least K**                         |     🔴     | Monotonic Deque             |              [Link](./Array/Hard/Shortest_Subarray_With_Sum_At_Least_K.js)               |
| **Count of Range Sum**                                            |     🔴     | Merge Sort                  |                        [Link](./Array/Hard/Count_of_Range_Sum.js)                        |
| **Find Minimum in Rotated Sorted Array II**                       |     🔴     | Binary Search               |             [Link](./Array/Hard/Find_Minimum_in_Rotated_Sorted_Array_II.js)              |
| **Reverse Pairs**                                                 |     🔴     | Merge Sort                  |                          [Link](./Array/Hard/Reverse_Pairs.js)                           |
| **Contains Duplicate III**                                        |     🔴     | Bucket Sort                 |                      [Link](./Array/Hard/Contains_Duplicate_III.js)                      |
| **Largest Submatrix With Rearrangements** |     🟡     | Array / Sorting / Greedy | [Link](./Array/Medium/Largest_Submatrix_With_Rearrangements.js) |
| **Count Submatrices with Top-Left Element and Sum Less Than k** |     🟡     | Array / 2D Prefix Sum | [Link](./Array/Medium/Count_Submatrices_with_Top_Left_Element_and_Sum_Less_Than_k.js) |
| **Count Submatrices With Equal Frequency of X and Y** |     🟡     | Array / 2D Prefix Sum | [Link](./Array/Medium/Count_Submatrices_With_Equal_Frequency_of_X_and_Y.js) |
| **Minimum Absolute Difference in Sliding Submatrix** |     🟡     | Array / Sliding Window / Sorting | [Link](./Array/Medium/Minimum_Absolute_Difference_in%20_Sliding_Submatrix.js) |
| **Construct Product Matrix**                         |     🟡     | Array / Prefix Sums             | [Link](./Array/Medium/Construct_Product_Matrix.js) |
| **Equal Sum Grid Partition I**                       |     🟡     | Array / Interval Merging        | [Link](./Array/Medium/Equal_Sum_Grid_Partition_I.js) |
| **Walking Robot Simulation**                         |     🟡     | Array / Simulation              | [Link](./Array/Medium/Walking_Robot_Simulation.js) |


### Asynchronous Programming

| Problem                   | Difficulty | Pattern/Concept |                                      Solution Link                                      |
| :------------------------ | :--------: | :-------------- | :-------------------------------------------------------------------------------------: |
| **Add Two Promises**      |     🟢     | Async/Await     |               [Link](./Asynchronous_Programming/Easy/Add_Two_Promises.js)               |
| **Interval Cancellation** |     🟢     | setInterval     |            [Link](./Asynchronous_Programming/Easy/Interval_Cancellation.js)             |
| **Promise Time Limit**    |     🟢     | Promise.race    |              [Link](./Asynchronous_Programming/Easy/Promise_Time_Limit.js)              |
| **Sleep**                 |     🟢     | Promises        |                    [Link](./Asynchronous_Programming/Easy/Sleep.js)                     |
| **Timeout Cancellation**  |     🟢     | setTimeout      |             [Link](./Asynchronous_Programming/Easy/Timeout_Cancellation.js)             |
| **Promise.all Polyfill**  |     🟡     | Async/Parallel  | [Link](./Asynchronous_Programming/Medium/Execute_Asynchronous_Functions_in_Parallel.js) |

### Classes & OOP

| Problem                             | Difficulty | Pattern/Concept  |                         Solution Link                         |
| :---------------------------------- | :--------: | :--------------- | :-----------------------------------------------------------: |
| **Array Wrapper**                   |     🟢     | Class / toString |          [Link](./Classes_OOP/Easy/Array_Wrapper.js)          |
| **Calculator with Method Chaining** |     🟢     | Method Chaining  | [Link](./Classes_OOP/Easy/Calculator_with_Method_Chaining.js) |
| **Event Emitter**                   |     🟡     | Observer Pattern |         [Link](./Classes_OOP/Medium/Event_Emitter.js)         |
| **Cache With Time Limit**           |     🟡     | Map / Timeouts   |     [Link](./Classes_OOP/Medium/Cache_With_Time_Limit.js)     |
| **Walking Robot Simulation II**      |     🟡     | Simulation / OOP |     [Link](./Classes_OOP/Medium/Robot_Walk_on_Grid.js)     |

### Closures

| Problem                     | Difficulty | Pattern/Concept    |                        Solution Link                         |
| :-------------------------- | :--------: | :----------------- | :----------------------------------------------------------: |
| **Allow One Function Call** |     🟢     | Closure / Flags    |      [Link](./Closures/Easy/Allow_One_Function_Call.js)      |
| **Counter**                 |     🟢     | Closure            |              [Link](./Closures/Easy/Counter.js)              |
| **Counter II**              |     🟢     | Closure / Object   |            [Link](./Closures/Easy/Counter_II.js)             |
| **Create Hello World**      |     🟢     | Basic Function     |    [Link](./Closures/Easy/Create_Hello_World_Function.js)    |
| **Return Arguments Length** |     🟢     | Rest Parameters    | [Link](./Closures/Easy/Return_Length_of_Arguments_Passed.js) |
| **To Be Or Not To Be**      |     🟢     | Error Handling     |        [Link](./Closures/Easy/To_Be_Or_Not_To_Be.js)         |
| **Memoize**                 |     🟡     | Closures & Caching |             [Link](./Closures/Medium/Memoize.js)             |
| **Function Composition**    |     🟡     | ReduceRight        |      [Link](./Closures/Medium/Function_Composition.js)       |
| **Debounce**                |     🟡     | Closures / Timer   |            [Link](./Closures/Medium/Debounce.js)             |

### Backtracking

| Problem           | Difficulty | Pattern/Concept |                Solution Link                 |
| :---------------- | :--------: | :-------------- | :------------------------------------------: |
| **Sudoku Solver** |     🔴     | Backtracking    | [Link](./Backtracking/Hard/Sudoku_Solver.js) |
| **N-Queens**      |     🔴     | Backtracking    |   [Link](./Backtracking/Hard/N_Queens.js)    |

### Dynamic Programming

| Problem                                       | Difficulty | Pattern/Concept |                                   Solution Link                                   |
| :-------------------------------------------- | :--------: | :-------------- | :-------------------------------------------------------------------------------: |
| **Best Time to Buy and Sell Stock**           |     🟢     | Greedy / DP     |      [Link](./Dynamic%20Programming/Easy/Best_Time_to_Buy_and_Sell_Stock.js)      |
| **Decode Ways**                                |     🟡     | Dynamic Programming | [Link](./Dynamic%20Programming/Medium/Decode_Ways.js) |
| **Maximum Non Negative Product in a Matrix**   |     🟡     | Dynamic Programming | [Link](./Dynamic%20Programming/Medium/Maximum_Non_Negative_Product_in_a_Matrix.js) |
| **Maximum Amount of Money Robot Can Earn**   |     🟡     | Dynamic Programming | [Link](./Dynamic%20Programming/Medium/Maximum_Amount_of_Money_Robot_Can_Earn.js) |
| **Best Time to Buy and Sell Stock III**       |     🔴     | DP              |    [Link](./Dynamic%20Programming/Hard/Best_Time_to_Buy_and_Sell_Stock_III.js)    |
| **Dungeon Game**                              |     🔴     | DP              |               [Link](./Dynamic%20Programming/Hard/Dungeon_Game.js)                |
| **Word Break II**                             |     🔴     | DP              |               [Link](./Dynamic%20Programming/Hard/Word_Break_II.js)               |
| **Find the String with LCP**                  |     🔴     | DP / Greedy     | [Link](./Dynamic%20Programming/Hard/Find_the_String_with_LCP.js) |
| **Find All Possible Stable Binary Arrays II** |     🔴     | DP              | [Link](./Dynamic%20Programming/Hard/Find_All_Possible_Stable_Binary_Arrays_II.js) |
| **Maximum Walls Destroyed by Robots**         |     🔴     | DP / Binary Search | [Link](./Dynamic%20Programming/Hard/Maximum_Walls_Destroyed_by_Robots.js) |

### Trie

| Problem              | Difficulty | Pattern/Concept |              Solution Link              |
| :------------------- | :--------: | :-------------- | :-------------------------------------: |
| **Palindrome Pairs** |     🔴     | Trie/Map        | [Link](./Trie/Hard/Palindrome_Pairs.js) |
| **Word Search II**   |     🔴     | Trie & DFS      |  [Link](./Trie/Hard/Word_Search_II.js)  |

### Graph Theory

| Problem                                          | Difficulty | Pattern/Concept             |                                 Solution Link                                  |
| :----------------------------------------------- | :--------: | :-------------------------- | :----------------------------------------------------------------------------: |
| **Maximize Spanning Tree Stability with Upgrades** |     🔴     | Binary Search / DSU / Union-Find | [Link](./Graphy%20Theory/Hard/Maximize_Spanning_Tree_Stability_with_Upgrades.js) |

### Math

| Problem               | Difficulty | Pattern/Concept         |              Solution Link               |
| :-------------------- | :--------: | :---------------------- | :--------------------------------------: |
| **Palindrome Number** |     🟢     | Math / Digit Reversal   | [Link](./Math/Easy/Palindrome_Number.js) |
| **Fibonacci Number**  |     🟢     | Math / Recursion / DP   | [Link](./Math/Easy/Fibonacci_Number.js)  |
| **Sqrt(x)**               |     🟢     | Math / Binary Search    |       [Link](./Math/Easy/Sqrt.js)        |
| **Happy Number**           |     🟢     | Math / Two Pointers     |   [Link](./Math/Easy/Happy_Number.js)    |
| **Power of Two**           |     🟢     | Math / Bit Manipulation |   [Link](./Math/Easy/Power_of_Two.js)    |
| **Complement of Base 10 Integer** |     🟢     | Math / Bit Manipulation | [Link](./Math/Easy/Complement_of_Base_10_Integer.js) |
| **Reverse Integer**               |     🟡     | Math / Digit Reversal   | [Link](./Math/Medium/Reverse_Integer.js) |
| **Minimum Number of Seconds to Make Mountain Height Zero** |     🟡     | Math / Binary Search / Greedy | [Link](./Math/Medium/Minimum_Number_of_Seconds_to_Make_Mountain_Height_Zero.js) |
| **The k-th Lexicographical String of All Happy Strings of Length n** |     🟡     | Math / Deductive Logic | [Link](./Math/Medium/The_k-th_Lexicographical_String_of_All_Happy_Strings_of_Length_n.js) |
| **Get Biggest Three Rhombus Sums in a Grid** |     🟡     | Math / Matrix Traversal | [Link](./Math/Medium/Get_Biggest_Three_Rhombus_Sums_in_a_Grid.js) |
| **Super Palindromes** |     🔴     | Math / Palindrome       | [Link](./Math/Hard/Super_Palindromes.js) |
| **Fancy Sequence** |     🔴     | Math / Modular Arithmetic / Design | [Link](./Math/Hard/Fancy_Sequence.js) |

---

## 📈 Big-O Cheat Sheet

A quick reference for the time and space complexity of common operations I encounter.

| Data Structure |  Access  |  Search  | Insertion | Deletion |
| :------------- | :------: | :------: | :-------: | :------: |
| **Array**      |   O(1)   |   O(n)   |   O(n)    |   O(n)   |
| **Hash Table** |   N/A    |   O(1)   |   O(1)    |   O(1)   |
| **BST**        | O(log n) | O(log n) | O(log n)  | O(log n) |

---

<div align="center">

## 🤝 Connect with Me

If you find this repo helpful or want to discuss a solution, feel free to reach out!

[LinkedIn](https://www.linkedin.com/in/shilpilashkari/) • [GitHub](https://github.com/shilpiLashkari) • [Medium](https://medium.com/@shilpilashkari) • [Portfolio](https://shilpilashkari.netlify.app/)

_"To everyone on this journey: The expert in anything was once a beginner. Keep showing up, keep failing, and keep coding—your future self will thank you."_

</div>
