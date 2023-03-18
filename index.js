// Imports and requires Express
const express = require("express");
// Imports and requires mysql2
const mysql = require("mysql2/promise");
// Imports and requires Inquirer
const inquirer = require("inquirer");
// Imports and requires console.table
const cTable = require("console.table");

// Defines port to use when establishing connection
const PORT = process.env.PORT || 3001;
// Defines call for express funciton
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "SQL1wax@QSZ",
    database: "organization_db"
  },
  console.log("Connected to the organization_db database.")
);

const menuPrompt = [
  {
    type: "list",
    name: "menu",
    message: "What would you like to do? (Use the arrow keys to cycle through options and Enter to select the highlighted one)\n",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role"
    ], 
  },
];

const trackerMenu = () => {
  inquirer.prompt(menuPrompt)
  .then((answers) => {
    switch (answers.menu) {
      case "View all departments": {
        return viewDepartments()
      }
      case "View all roles": {
        return viewRoles()
      }
      case "View all employees": {
        return viewEmployees()
      }
      case "Add a department": {
        return addDepartment()
      }
      case "Add a role": {
        return addRole()
      }
      case "Add an employee": {
        return addEmployee()
      }
      case "Update an employee role": {
        return updateEmployee()
      }
    }
  });
};

const viewDepartments = () => {
  app.get("/api/departments", (req, res) => {
    const sql = "SELECT id, department_name AS name FROM departments";
    
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
         return;
      }
      res.json({
        message: "success",
        data: rows
      });
    });
  });
};

const viewRoles = () => {
  app.get("/api/roles", (req, res) => {
    const sql = "SELECT id, role_name AS name FROM roles";
    
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
         return;
      }
      res.json({
        message: "success",
        data: rows
      });
    });
  });
};

const viewEmployees = () => {
  app.get("/api/employees", (req, res) => {
    const sql = "SELECT id, employee_name AS name FROM employees";
    
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
         return;
      }
      res.json({
        message: "success",
        data: rows
      });
    });
  });
};

/*
// Create a manager
app.post("/api/new-manager", ({ body }, res) => {
  const sql = "INSERT INTO employees (employee_name)
    VALUES (?)";
  const params = [body.employee_name];
  
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: body
    });
  });
});
*/

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const init = () => {
  trackerMenu();
}

init();