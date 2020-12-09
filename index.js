var mysql = require('mysql');
var inquirer = require('inquirer');
var asciiart = require('asciiart-logo');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employeesDB'
});

connection.connect(function(err) {
    if (err) throw err;
    init();
});

function init() {
    inquirer
    .prompt({
        name: 'toDo',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View All Employees',
            'View All Employees By Department',
            'Add Employee',
            'Update Employee Role',
            'Add Role',
            'View Roles',
            'Add Department',
            'View Departments',
            'Exit'
        ]
    })
    .then(response) {
        if (toDo.response === 'View All Employees') {
            viewAllEmployees();
        } else if (toDo.respone === 'View All Employees By Department') {
            viewByDept();
        } else if (toDo.response === 'Add Employee') {
            addEmployee();
        } else if (toDo.response === 'Update Employee Role') {
            updateEmployeeRole();
        } else if (toDo.response === 'Add Role') {
            addRole();
        } else if (toDo.response === 'View Roles') {
            viewRoles();
        } else if ('Add Department') {
            addDepartment();
        } else if ('View Departments') {
            viewDepartments();
        } else if ('Exit') {
            connection.end();
        }
    }
}

function viewAllEmployees() {
    connection.query("SELECT first_name, last_name FROM employee", function (err, res) {
        if (err) throw err;
        console.table(res);
    })
}
