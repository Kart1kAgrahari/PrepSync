// require('dotenv').config(); // This loads the .env file
const { GoogleGenerativeAI } = require("@google/generative-ai");
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

// const apiKey = "AIzaSyCWnQZ6jRUiQyzVbycdIwJniLjkMtGTzqw";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const courseOutline = model.startChat({
  generationConfig,
  history:[
    
  ]
});

export const generateNotesAiModel = model.startChat({
  generationConfig:{
    temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
  },
  history: [
    {
      role: "user",
      parts: [
        {
          text: `Generate exam material detail content for each chapter, Make syre to include all topic point in the content, also stylize chapter title and summary for HTML,make sure to give content in HTML,use previous responses for reference, the chapters:
    {
          "chapterTitle": "Core Java Fundamentals",
          "summary": "This chapter covers the essential concepts of Java programming, including data types, control structures, object-oriented programming principles, and exception handling.",
          "topics": [
            "Data Types and Operators",
            "Control Structures (if-else, loops)",
            "Object-Oriented Programming (OOP) principles: Encapsulation, Inheritance, Polymorphism, Abstraction",
            "Classes and Objects",
            "Exception Handling",
            "Working with Arrays and Collections"
          ]
        }
          Generate the content as if you are generating for a learning course, it should look like documentation 
    `,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `\`\`\`html
    <h1>Core Java Fundamentals</h1>
    <p>This chapter covers the essential concepts of Java programming, including data types, control structures, object-oriented programming principles, and exception handling.</p>
    
    <h2>Data Types and Operators</h2>
    <ul>
      <li>Primitive data types (int, float, double, char, boolean, etc.) and their sizes.</li>
      <li>Type casting and type conversion.</li>
      <li>Operators: Arithmetic, relational, logical, bitwise, assignment, and ternary operators.</li>
      <li>Operator precedence and associativity.</li>
    </ul>
    
    <h2>Control Structures (if-else, loops)</h2>
    <ul>
      <li>Conditional statements: if, if-else, nested if-else.</li>
      <li>Iteration statements: for, while, do-while loops.</li>
      <li>Break and continue statements.</li>
      <li>Switch statement.</li>
    </ul>
    
    <h2>Object-Oriented Programming (OOP) principles: Encapsulation, Inheritance, Polymorphism, Abstraction</h2>
    <ul>
      <li><strong>Encapsulation:</strong> Data hiding and access modifiers (public, private, protected).</li>
      <li><strong>Inheritance:</strong> Extending classes, superclasses and subclasses, method overriding, polymorphism.</li>
      <li><strong>Polymorphism:</strong> Method overloading and overriding, runtime polymorphism.</li>
      <li><strong>Abstraction:</strong> Abstract classes and interfaces.</li>
    </ul>
    
    <h2>Classes and Objects</h2>
    <ul>
      <li>Defining classes and creating objects.</li>
      <li>Constructors (default and parameterized).</li>
      <li>Instance variables and methods.</li>
      <li>Static variables and methods.</li>
      <li>this keyword.</li>
    </ul>
    
    <h2>Exception Handling</h2>
    <ul>
      <li>The try-catch-finally block.</li>
      <li>Types of exceptions (checked and unchecked).</li>
      <li>Throwing exceptions.</li>
      <li>Custom exceptions.</li>
    </ul>
    
    <h2>Working with Arrays and Collections</h2>
    <ul>
      <li>Arrays: declaration, initialization, and manipulation.</li>
      <li>Collections Framework: Introduction to Lists, Sets, and Maps.</li>
      <li>ArrayList, LinkedList, HashSet, TreeSet, HashMap, TreeMap.</li>
      <li>Iterating through collections.</li>
    </ul>
    \`\`\`
    `,
        },
      ],
    },
  ],
});



export const generateStudyTypeContentAiModel= model.startChat({
  generationConfig,
  history:[
     {
      role: 'user',
      parts: [
        {
          text: `generate the flashcard on topic: Introduction to Java,Java Fundamentals,Introduction to Databases (SQL),Introduction to Web Development,Introduction to REST APIs, in JSON format with front and back content, Maximum 15`,
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: `\`\`\`json
[
  {
    "front": "What is Java?",
    "back": "Java is a high-level, class-based, object-oriented programming language that is widely used for developing applications for various platforms."
  },
  {
    "front": "What is a Java Virtual Machine (JVM)?",
    "back": "The JVM is an interpreter that executes Java bytecode, making Java platform-independent."
  },
  {
    "front": "What are the basic data types in Java?",
    "back": "int, float, double, char, boolean, byte, short, long"
  },
  {
    "front": "What is an object in Java?",
    "back": "An object is an instance of a class, representing a specific entity with data (fields) and behavior (methods)."
  },
  {
    "front": "What is a class in Java?",
    "back": "A class is a blueprint for creating objects. It defines the data and methods that objects of that class will have."
  },
  {
    "front": "What is SQL?",
    "back": "SQL (Structured Query Language) is a language used to manage and manipulate data in relational database management systems (RDBMS)."
  },
  {
    "front": "What is a relational database?",
    "back": "A relational database organizes data into tables with rows (records) and columns (fields), linked through relationships."
  },
  {
    "front": "Give an example of a SQL query to select all data from a table named 'users'.",
    "back": "SELECT * FROM users;"
  },
  {
    "front": "What is Web Development?",
    "back": "Web development is the work involved in developing and maintaining websites; it's a broad term encompassing various aspects like front-end, back-end, and database development."
  },
  {
    "front": "What is a REST API?",
    "back": "A REST (Representational State Transfer) API is an architectural style for building web services that use HTTP methods (GET, POST, PUT, DELETE) to interact with resources."
  },
  {
    "front": "What is JSON?",
    "back": "JSON (JavaScript Object Notation) is a lightweight data-interchange format commonly used for transmitting data between a server and a web application."
  },
  {
    "front": "Give an example of a JSON object.",
    "back": "{\\n  \\"name\\": \\"John Doe\\",\\n  \\"age\\": 30,\\n  \\"city\\": \\"New York\\"\\n}"
  },
  {
    "front": "What does HTTP GET request do?",
    "back": "Retrieves data from a specified resource."
  },
  {
    "front": "What does HTTP POST request do?",
    "back": "Submits data to be processed to the identified resource."
  },
  {
    "front": "What is the difference between front-end and back-end development?",
    "back": "Front-end development focuses on the user interface (UI) and user experience (UX) – what the user sees and interacts with. Back-end development focuses on the server-side logic, databases, and APIs."
  }
]
\`\`\``,
        },
      ],
    },
    {
      role: 'user',
      parts: [
        {
          text: `INSERT_INPUT_HERE`,
        },
      ],
    },
  ]
})





export const GenerateQuizAiModel= model.startChat({
  generationConfig,
  history:[
       {
      role: 'user',
      parts: [
        {
          text: `generate quiz on topic :Introduction to Graphs and BFS, BFS Algorithm Implementation,Applications of BFS with questions along with correct answer in JSON format`,
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: `\`\`\`json
{
  "quizTitle": "Introduction to Graphs and BFS",
  "questions": [
    {
      "question": "What is a graph in the context of computer science?",
      "options": [
        "A linear data structure",
        "A non-linear data structure consisting of nodes and edges",
        "A tree-like structure",
        "A sorted list of numbers"
      ],
      "answer": "A non-linear data structure consisting of nodes and edges",
      "explanation": "A graph is a collection of nodes (vertices) and edges connecting pairs of nodes."
    },
    {
      "question": "What does BFS stand for?",
      "options": [
        "Binary File System",
        "Breadth-First Search",
        "Best-First Search",
        "Branch and Bound Search"
      ],
      "answer": "Breadth-First Search",
      "explanation": "BFS is a graph traversal algorithm that explores the graph level by level."
    },
    {
      "question": "Which data structure is commonly used to implement BFS?",
      "options": [
        "Stack",
        "Binary Tree",
        "Queue",
        "Linked List"
      ],
      "answer": "Queue",
      "explanation": "A queue is used to store the nodes to be visited, ensuring that nodes at the same level are visited before nodes at deeper levels."
    },
    {
      "question": "In BFS, nodes are visited in which order?",
      "options": [
        "Depth-first order",
        "Level order",
        "Random order",
        "Alphabetical order"
      ],
      "answer": "Level order",
      "explanation": "BFS explores nodes level by level, visiting all nodes at a given distance from the starting node before moving to the next level."
    },
    {
      "question": "Consider a graph represented by an adjacency list.  What is the time complexity of BFS?",
      "options": [
        "O(n)",
        "O(log n)",
        "O(n+m)",
        "O(n^2)"
      ],
      "answer": "O(n+m)",
      "explanation": "where n is the number of nodes and m is the number of edges.  It visits each node and each edge at most once."
    },
    {
      "question": "Which of the following is NOT a common application of BFS?",
      "options": [
        "Finding the shortest path in an unweighted graph",
        "Searching a maze",
        "Finding the minimum spanning tree",
        "Determining connected components in a graph"
      ],
      "answer": "Finding the minimum spanning tree",
      "explanation": "Minimum spanning trees are typically found using algorithms like Prim's or Kruskal's algorithm. BFS finds shortest paths in unweighted graphs."
    },
    {
      "question": "What is the purpose of a visited array/set in a BFS implementation?",
      "options":[
        "To store the order in which nodes are visited",
        "To prevent cycles and ensure that each node is visited only once",
        "To store the distance from the starting node",
        "To store the parent node of each node"
      ],
      "answer": "To prevent cycles and ensure that each node is visited only once",
      "explanation": "The visited array keeps track of nodes already processed to avoid infinite loops in graphs with cycles."
    },
    {
      "question": "In a BFS implementation using a queue, what operation is performed when a node is added to the queue?",
      "options": [
        "Enqueue",
        "Dequeue",
        "Push",
        "Pop"
      ],
      "answer": "Enqueue",
      "explanation": "Enqueue adds an element to the rear of the queue."
    }
  ]
}
\`\`\`
`,
        },
      ],
    },
    {
      role: 'user',
      parts: [
        {
          text: `INSERT_INPUT_HERE`,
        },
      ],
    },
  ]
})




// const result = await chatSession.sendMessage(prompt);
// const response = result.response;
// console.log(response.text());
// return response.text();
