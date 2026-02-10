<div align="center">

# 🚀 Data Structures & Algorithms in JavaScript

**A journey from understanding syntax to mastering algorithms.**  
*Implemented in pure JavaScript with a focus on clean architecture and performance.*

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
    My "Notes" sections explain the *why* behind the *how*, breaking down complex patterns into simple, conversational logic.

---

## 📌 Repository Structure

I have organized my solutions by difficulty level to track my progression from foundational concepts to advanced problem-solving capabilities.

| Level | Badge | Description | Focus Areas |
| :--- | :---: | :--- | :--- |
| **Easy** | 🟢 | Foundational Problems | Basic Arrays, Strings, Simple Hash Maps |
| **Medium** | 🟡 | Core Logic & Patterns | Sliding Window, Two Pointers, Linked Lists, Trees |
| **Hard** | 🔴 | Advanced Optimization | DP, Graphs, Backtracking, System Design components |

---

## �️ Tech Stack & Tools

My development environment matches modern industry standards:

| Component | Technology | Details |
| :--- | :--- | :--- |
| **Language** | ![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) | ES6+ features (Arrow functions, Classes, Async/Await) |
| **Runtime** | ![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white) | Executed via Node.js runtime / Browser Console |
| **Testing** | ![Jest](https://img.shields.io/badge/-Jest-C21325?style=flat-square&logo=jest&logoColor=white) | *Planned implementation for Unit Testing* |

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

| Problem | Difficulty | Pattern/Concept | Solution Link |
| :--- | :---: | :--- | :---: |
| **Two Sum** | 🟢 | Hash Map | [Link](./Array/Easy/Two_Sum.js) |
| **Apply Transform Over Each Element** | 🟢 | Map Function | [Link](./Array/Easy/Apply_Transform_Over_Each_Element_in_Array.js) |
| **Array Prototype Last** | 🟢 | Prototype Extension | [Link](./Array/Easy/Array_Prototype_Last.js) |
| **Array Reduce Transformation** | 🟢 | Reduce Logic | [Link](./Array/Easy/Array_Reduce_Transformation.js) |
| **Chunk Array** | 🟢 | Slicing / Loops | [Link](./Array/Easy/Chunk_Array.js) |
| **Filter Elements from Array** | 🟢 | Filter Logic | [Link](./Array/Easy/Filter_Elements_from_Array.js) |
| **Is Object Empty** | 🟢 | JSON / Object Keys | [Link](./Array/Easy/Is_Object_Empty.js) |
| **Sort By** | 🟢 | Custom Sort | [Link](./Array/Easy/Sort_By.js) |
| **Join Arrays by ID** | 🟡 | Map / Merge Logic | [Link](./Array/Medium/Join_Two_Arrays_by_ID.js) |
| **Flatten Nested Array** | 🟡 | Recursion | [Link](./Array/Medium/Flatten_Deeply_Nested_Array.js) |
| **Group By** | 🟡 | Prototype / Hash Map | [Link](./Array/Medium/Group_By.js) |
| **Compact Object** | 🟡 | Recursion / DFS | [Link](./Array/Medium/Compact_Object.js) |
| **Median of Two Sorted Arrays** | 🔴 | Binary Search | [Link](./Array/Hard/Median_Of_Two_Sorted_Array.js) |
| **Sudoku Solver** | 🔴 | Backtracking | [Link](./Array/Hard/Sudoku_Solver.js) |
| **First Missing Positive** | 🔴 | Index as Hash Map | [Link](./Array/Hard/First_Missing_Positive.js) |
| **Trapping Rain Water** | 🔴 | Two Pointers | [Link](./Array/Hard/Trapping_Rain_Water.js) |
| **N-Queens** | 🔴 | Backtracking | [Link](./Array/Hard/N_Queens.js) |
| **Largest Rectangle in Histogram** | 🔴 | Monotonic Stack | [Link](./Array/Hard/Largest_Rectangle_In_Histogram.js) |
| **Palindrome Pairs** | 🔴 | Hash Map | [Link](./Array/Hard/Palindrome_Pairs.js) |
| **Text Justification** | 🔴 | String / Greedy | [Link](./Array/Hard/Text_Justification.js) |
| **Word Search II** | 🔴 | Trie & DFS | [Link](./Array/Hard/Word_Search_II.js) |
| **Maximal Rectangle** | 🔴 | Histogram / Monotonic Stack | [Link](./Array/Hard/Maximal_Rectangle.js) |
| **Perfect Rectangle** | 🔴 | Geometry / Arrays | [Link](./Array/Hard/Perfect_Rectangle.js) |
| **Word Break II** | 🔴 | Recursion / Memoization | [Link](./Array/Hard/Word_Break_II.js) |
| **Add Two Promises** | 🟢 | Async/Await | [Link](./Array/Easy/Add_Two_Promises.js) |
| **Interval Cancellation** | 🟢 | setInterval | [Link](./Array/Easy/Interval_Cancellation.js) |
| **Promise Time Limit** | 🟢 | Promise.race | [Link](./Array/Easy/Promise_Time_Limit.js) |
| **Sleep** | 🟢 | Promises | [Link](./Array/Easy/Sleep.js) |
| **Timeout Cancellation** | 🟢 | setTimeout | [Link](./Array/Easy/Timeout_Cancellation.js) |
| **Promise.all Polyfill** | 🟡 | Async/Parallel | [Link](./Array/Medium/Execute_Asynchronous_Functions_in_Parallel.js) |
| **Debounce** | 🟡 | Closures / Timer | [Link](./Array/Medium/Debounce.js) |

### Classes & OOP

| Problem | Difficulty | Pattern/Concept | Solution Link |
| :--- | :---: | :--- | :---: |
| **Array Wrapper** | 🟢 | Class / toString | [Link](./Classes_OOP/Easy/Array_Wrapper.js) |
| **Calculator with Method Chaining** | 🟢 | Method Chaining | [Link](./Classes_OOP/Easy/Calculator_with_Method_Chaining.js) |
| **Event Emitter** | 🟡 | Observer Pattern | [Link](./Classes_OOP/Medium/Event_Emitter.js) |
| **Cache With Time Limit** | 🟡 | Map / Timeouts | [Link](./Classes_OOP/Medium/Cache_With_Time_Limit.js) |

### Closures

| Problem | Difficulty | Pattern/Concept | Solution Link |
| :--- | :---: | :--- | :---: |
| **Allow One Function Call** | 🟢 | Closure / Flags | [Link](./Closures/Easy/Allow_One_Function_Call.js) |
| **Counter** | 🟢 | Closure | [Link](./Closures/Easy/Counter.js) |
| **Counter II** | 🟢 | Closure / Object | [Link](./Closures/Easy/Counter_II.js) |
| **Create Hello World** | 🟢 | Basic Function | [Link](./Closures/Easy/Create_Hello_World_Function.js) |
| **Return Arguments Length** | 🟢 | Rest Parameters | [Link](./Closures/Easy/Return_Length_of_Arguments_Passed.js) |
| **To Be Or Not To Be** | 🟢 | Error Handling | [Link](./Closures/Easy/To_Be_Or_Not_To_Be.js) |
| **Memoize** | 🟡 | Closures & Caching | [Link](./Closures/Medium/Memoize.js) |
| **Function Composition** | 🟡 | ReduceRight | [Link](./Closures/Medium/Function_Composition.js) |

---

## 📈 Big-O Cheat Sheet

A quick reference for the time and space complexity of common operations I encounter.

| Data Structure | Access | Search | Insertion | Deletion |
| :--- | :---: | :---: | :---: | :---: |
| **Array** | O(1) | O(n) | O(n) | O(n) |
| **Hash Table** | N/A | O(1) | O(1) | O(1) |
| **BST** | O(log n) | O(log n) | O(log n) | O(log n) |

---

<div align="center">

## 🤝 Connect with Me

If you find this repo helpful or want to discuss a solution, feel free to reach out!

[LinkedIn](https://www.linkedin.com/in/shilpilashkari/) • [GitHub](https://github.com/shilpiLashkari) • [Medium](https://medium.com/@shilpilashkari) • [Portfolio](https://shilpilashkari.netlify.app/)

*"To everyone on this journey: The expert in anything was once a beginner. Keep showing up, keep failing, and keep coding—your future self will thank you."*

</div>
