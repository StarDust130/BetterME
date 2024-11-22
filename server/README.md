# BetterME Backend (Express)

The backend of **BetterME**, a web app to track daily tasks and habits like eating junk food, spending money, and more. This backend is built using **Node.js** and **Express**.

---

## Project Structure

```plaintext
betterme-backend/
│
├── routes/                # API route definitions (e.g., /tasks)
│   ├── taskRoutes.js      # Routes for task-related operations
│   └── expenseRoutes.js   # Routes for expense-related operations
│
├── controllers/           # Request handlers (controllers)
│   ├── taskController.js  # Handles logic for task-related requests
│   └── expenseController.js  # Handles logic for expense-related requests
│
├── models/                # Mongoose models (database schemas)
│   ├── taskModel.js       # Task schema/model
│   └── expenseModel.js    # Expense schema/model
│
├── index.js               # (Main entry point of the application - 🌟Starts the server)
├── app.js                 # Express server setup
├── package.json           # NPM package file (dependencies, scripts)
└── .gitignore             # Git ignore file (node_modules, etc.)
