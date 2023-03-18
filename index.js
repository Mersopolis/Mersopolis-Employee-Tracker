// Imports and requires mysql2 and its promis wrapper
const mysql = require("mysql2");
const mysqlPromise = require("mysql2/promise");
// Imports and requires Inquirer
const inquirer = require("inquirer");
// Imports and requires console.table
const cTable = require("console.table");

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
  const sql = "SHOW * department_name AS name FROM departments";
  
  db.query(sql, (err, result) => {
    if (!result) {
      console.log("No departments found");
    }
    else {
      console.table(result);
    }
  });
};

const viewRoles = () => {
  const sql = "SELECT id, role_name AS name FROM roles";
  
  db.query(sql, (err, result) => {
    if (!result) {
      console.log("No roles found");
    }
    else {
      console.log(result);
    }
  });
};

const viewEmployees = () => {
  const sql = "SELECT id, first_name AS name FROM employees";
  
  db.query(sql, (err, result) => {
    if (!result) {
      console.log("No employees found");
    }
    else {
      console.log(result);
    }
  });
};

// Add a department
const addDepartment = () => {
  const sql = `INSERT INTO departments (name)
    VALUES (?)`;
  const params = [body.name];
  
  db.query(sql, params, (err, result) => {
    console.log(result);
  });
}

// Add a role
const addRole = () => {
  const sql = `INSERT INTO roles (name)
    VALUES (?)`;
  const params = [body.name];
  
  db.query(sql, params, (err, result) => {
    console.log(result);
  });
}

// Add an employee
const addEmployee = () => {
  const sql = `INSERT INTO employees (first_name)
    VALUES (?)`;
  const params = [body.first_name, body.last_name];
  
  db.query(sql, params, (err, result) => {
      console.log(result);
  });
}

const init = () => {
  trackerMenu();
}

init();