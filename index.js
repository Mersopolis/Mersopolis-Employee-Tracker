// Imports and requires Express
const express = require("express");
// Imports and requires mysql2
const mysql = require("mysql2");
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

