// Imports and requires mysql2 and its promise wrapper
const mysql = require("mysql2");
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

const trackerMenu = () => {
  inquirer.prompt([
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
  ])
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
  const sql = "SELECT * FROM departments;";
  db.promise()
    .query({ sql, rowsAsArray: true })
    .then(([rows]) => {
      console.table("\n" + rows + "\n");
      trackerMenu();
    });
};

const viewRoles = () => {
  const sql = "SELECT * FROM roles";
  
  db.promise()
    .query({ sql, rowsAsArray: true })
    .then(([rows]) => {
      console.table("\n" + rows + "\n");
      trackerMenu();
    });
};

const viewEmployees = () => {
  const sql = "SELECT * FROM employees";
  
  db.promise()
    .query({ sql, rowsAsArray: true })
    .then(([rows]) => {
      console.table("\n" + rows + "\n");
      trackerMenu();
    });
};

// Add a department
const addDepartment = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the department's name?\n"
    }
  ])
  .then((response) => {
    const sql = `INSERT INTO departments (name) VALUES ("${response.name}");`; 

    db.promise().query(sql)
    .then(trackerMenu())
    .catch((err) => console.error("\n" + err + "\n"));
  });
};

// Add a role
const addRole = () => {
  inquirer.prompt([
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
      type: "input",
      name: "department_id",
      message: "What is the id number of the department that the role belong to?\n",
    }
  ])
  .then((response) => {
    const sql = `INSERT INTO roles (title, salary, department_id) VALUES(
      "${response.title}",
      "${response.salary}",
      "${response.department_id}"
    );`; 

    db.promise().query(sql)
    .then(trackerMenu())
    .catch((err) => console.error("\n" + err + "\n"));
  });
};

// Add an employee
const addEmployee = () => {
  inquirer.prompt([
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
      type: "input",
      name: "role_id",
      message: "What is the id number of the employee's role?\n",
    },
    {
      type: "input",
      name: "manager_id",
      message: "What is the id number of the employee's manager? (Put 0 for no manager)\n",
    }
  ])
  .then((response) => {
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES("${response.first_name}", "${response.last_name}", "${response.role_id}", "${response.manager_id}");`;

    db.promise().query(sql)
    .then(trackerMenu())
    .catch((err) => console.error("\n" + err + "\n"));
  });
};


const updateEmployee = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "employee_id",
      message: "What is the id number of the employee you're updating?\n"
    },
    {
      type: "id",
      name: "role_id",
      message: "What is the id number of the employee's new role?\n",
    }
  ])
  .then((response) => {
    const sql = 
`UPDATE employees SET role_id = "${response.role_id}" WHERE id = "${response.employee_id}";`; 

    db.promise().query(sql)
    .then(trackerMenu())
    .catch((err) => console.error("\n" + err + "\n"));
  });
};

trackerMenu();