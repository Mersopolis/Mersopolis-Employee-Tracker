// Imports and requires mysql2 and its promis wrapper
const mysql = require("mysql2/promise");
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
  const sql = "SELECT * FROM departments";
  
  db.query(sql, (err, result) => {
    if (err) {
      console.log("\n" + err.message + "\n");
    } 
    else if (result == []) {
      console.log("\nNo departments found\n");
    }
    else {
      console.log(result);
      console.table(result);
    }
  });
  trackerMenu();
};

const viewRoles = () => {
  const sql = "SELECT id, role_name AS name FROM roles";
  
  db.query(sql, (err, result) => {
    if (err) {
      console.log("\n" + err.message + "\n");
    } 
    else if (!result) {
      console.log("\nNo roles found\n");
    }
    else {
      console.log("\n" + result + "\n");
    }
  });
  trackerMenu();
};

const viewEmployees = () => {
  const sql = "SELECT id, first_name AS name FROM employees";
  
  db.query(sql, (err, result) => {
    if (err) {
      console.log("\n" + err.message + "\n");
    } 
    else if (!result) {
      console.log("\nNo employees found\n");
    } 
    else {
      console.log("\n" + result + "\n");
    }
  });
  trackerMenu();
};

const addDepartmentPrompts = [
  {
    type: "input",
    name: "name",
    message: "What is the department's name?\n"
  }
]

// Add a department
const promptForDepartment = () => {
  return inquirer.prompt(addDepartmentPrompts)
}

const addDepartment = () => {
  promptForDepartment()
  .then((response) => {
    console.log(response);
    const sql = `INSERT INTO departments (name) VALUES (${response.name})`; 

    console.log(sql);

    db.query(sql, (err, result) => {
      if (err) {
        console.log("\n" + err.message + "\n");
      }
      else {
        console.log("\n" + result + "\n");
      }
    });
  })
  .then(trackerMenu());
}

const addRolePrompts = [
  {
    type: "input",
    name: "title",
    message: "What is the role's title?\n"
  },
  {
    type: "input",
    name: "salary",
    message: "What is the role's salary?\n"
  },
  {
    type: "list",
    name: "department_id",
    message: "Which department does the role belong to?\n",
    choices: "Placeholder"/* TODO: Pull departments into dynamic list for choices */, 
  }
]

// Add a role
const addRole = () => {
  inquirer.prompt(addRolePrompts);
  const sql = `INSERT INTO roles (name)
    VALUES (?)`;
  
  db.query(sql, (err, result) => {
    if (err) {
      console.log("\n" + err.message + "\n");
    }
    else {
      console.log("\n" + result + "\n");
    }
  });
  trackerMenu();
}

const addEmployeePrompts = [
  {
    type: "input",
    name: "first_name",
    message: "What is the employee's first name?\n"
  },
  {
    type: "input",
    name: "last_name",
    message: "What is the employee's last name?\n"
  },
  {
    type: "list",
    name: "role_id",
    message: "What is the employee's role?\n",
    choices: "Placeholder"/* TODO: Pull roles into dynamic list for choices */, 
  },
  {
    type: "list",
    name: "manager_id",
    message: "Whos is the employee's manager?\n",
    choices: "Placeholder"/* TODO: Pull employees into dynamic list for choices */, 
  }
]

// Add an employee
const addEmployee = () => {
  inquirer.prompt(addEmployeePrompts);

  const sql = `INSERT INTO employees (first_name)
    VALUES (?)`;
  
  db.query(sql, (err, result) => {
    if (err) {
      console.log("\n" + err.message + "\n");
    }
    else {
      console.log("\n" + result + "\n");
    }
  });
  trackerMenu();
}

const init = () => {
  trackerMenu();
}

init();