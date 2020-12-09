var mysql = require('mysql');
var inquirer = require('inquirer');
var asciiart = require('asciiart-logo');
roleArray = [];
managerArray = [];

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
        switch (toDo.response) {
        case 'View All Employees':
            viewAllEmployees();
            break;
        case 'View All Employees By Department':
            viewByDept();
            break;
        case 'Add Employee':
            addEmployee();
            break;
        case 'Update Employee Role':
            updateEmployeeRole();
            break;
        case 'Add Role':
            addRole();
            break;
        case'View Roles':
            viewRoles();
            break;
        case 'Add Department':
            addDepartment();
            break;
        case 'View Departments':
            viewDepartments();
            break;
        case 'Exit':
            connection.end();
        }
    }
}

function viewAllEmployees() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        console.table(res);
    })
}

function viewByDept() {
    inquirer
    .prompt({
        name: 'deptQuery',
        type: 'list',
        message: 'You would like to see the employees of which department?',
        choices: [
            'C-level',
            'Legal',
            'Accounting',
            'Project Management',
            'Software',
            'Engineering'
        ]
    })
    .then(function(response) {
        let queryDept;
        switch (response.deptQuery) {
            case 'C-level':
            queryDept = "SELECT * FROM employee WHERE deparment_id = 6";
            break;
            case 'Legal':
            let queryDept = "SELECT * FROM employee WHERE deparment_id = 1";
            break;
            case 'Accounting':
            let queryDept = "SELECT * FROM employee WHERE deparment_id = 2";
            break;
            case 'Project Management':
            let queryDept = "SELECT * FROM employee WHERE deparment_id = 3";
            break;
            case 'Software':
            let queryDept = "SELECT * FROM employee WHERE deparment_id = 4";
            break;
            case 'Engineering':
            let queryDept = "SELECT * FROM employee WHERE deparment_id = 5";
        }
        connection.query(queryDept, function(err, res) {
            if (err) throw err;
            console.table(res)
        })
    })
}

function addEmployee() {
    inquirer
    .prompt({
        name: 'first_name',
        type: 'input',
        message: 'What is employees first name?',
    },
    {
        name: 'last_name',
        type: 'input',
        message: 'What is the employees last name?'
    },
    {
        name: 'role_id',
        type: 'list',
        message: 'What is the employees role?',
        choices: [
          roleChoices()
        ]
    },
    {
        name: 'manager_id',
        type: 'list',
        message: 'Who is the employees manager',
        choices: [
            managerChoices()
        ]
    })
    .then(function(response) {
    })
}

function viewRoles() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        console.table(res);
    })
}

function viewDepartments() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.table(res);
    })
}

function addRole() {
    inquirer
    .prompt({
        name: 'title',
        type: 'input',
        message: "What is the role's title?"
    },
    {
        name: 'department',
        type: 
    })

}

function roleChoices () {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            roleArray.push(res[i].title);
        }
    }); return roleArry;
}

function managerChoices() {
    connection.query("SELECT * FROM employee WHERE manager = 1", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            managerArray.push(res[i].first_name + " " + res[i].last_name);
        }
    }); return managerArray;
}

function departmentChoices() {
    connection.query("SELECT * FROM department")
}