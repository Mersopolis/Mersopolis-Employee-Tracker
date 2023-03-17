DROP DATABASE IF EXISTS organization_db;
CREATE DATABASE organization_db;

USE organization_db;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(50) NOT NULL
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(100),
    ON DELETE SET NULL
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    employee_role VARCHAR(50),
    FOREIGN KEY (employee_role)
    REFERENCES roles(role_name)
    employee_department VARCHAR(50),
    FOREIGN KEY (employee_department)
    REFERENCES departments(department_name)
    ON DELETE SET NULL
);