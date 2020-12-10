var mysql = require('mysql');
var inquirer = require('inquirer');
var managerArray = [];
var deptArray = [];
var roleArray = [];
var employeeArray = [];

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employeesDB'
});

//connect to database
connection.connect(function (err) {
    if (err) throw err;
    init();
});

//initialize CLI
function init() {
    inquirer
        .prompt([{
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
        }])
        .then(function (response) {
            switch (response.toDo) {
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
                    updateRole();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'View Roles':
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
        });
}
//view All employees
function viewAllEmployees() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        console.log('\n');
        console.table(res);
        continueQuestions();
    });
}
//View Employees by Department
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
        .then(function (response) {
            let queryDept;
            switch (response.deptQuery) {
                case 'C-level':
                    queryDept = 6;
                    break;
                case 'Legal':
                    queryDept = 1;
                    break;
                case 'Accounting':
                    queryDept = 2;
                    break;
                case 'Project Management':
                    queryDept = 3;
                    break;
                case 'Software':
                    queryDept = 4;
                    break;
                case 'Engineering':
                    queryDept = 5;
            }
            connection.query("SELECT * FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE department.id =?", (queryDept), function (err, res) {
                if (err) throw err;
                console.table(res)
                continueQuestions();
            })
        })
}
//Add an Employee
function addEmployee() {
    roleChoices();
    managerChoices();
    inquirer
        .prompt([
            {
                name: 'first_name',
                type: 'input',
                message: "What is employee's first name?",
            },
            {
                name: 'last_name',
                type: 'input',
                message: "What is the employee's last name?"
            },
            {
                name: 'role_id',
                type: 'list',
                message: "What is the employee's role?",
                choices: roleArray
            },
            {
                name: 'manager_id',
                type: 'list',
                message: "Who is the employee's manager?",
                choices: managerArray
            }])
        .then(function (response) {
            let empRole = roleArray.indexOf(response.role_id) + 1;
            let empManager = managerArray.indexOf(response.manager_id) + 1;
            connection.query("INSERT INTO employee SET ?",
                {
                    first_name: response.first_name,
                    last_name: response.last_name,
                    role_id: empRole,
                    manager_id: empManager
                },
                function (err) {
                    if (err) throw err;
                }
            ); continueQuestions();
        })
};
//update an employees role
function updateRole() {
    roleChoices();
    employeeChoices();
    inquirer
        .prompt([
            {
                name: 'chooseEmp',
                type: 'list',
                message: 'Which employee would you like to update?',
                choices: employeeArray
            },
            {
                name: 'newRole',
                type: 'list',
                message: "What is the employee's new role?",
                choices: roleArray
            }])
            .then(function (response) {
                let chooseEmp = employeeArray.indexOf(response.chooseEmployee) + 1;
                let newRole = roleArray.indexOf(response.newRole) + 1;
                connection.query("UPDATE employee SET WHERE?",
                {
                    id: chooseEmp
                },
                {
                    role_id: newRole,
                },
                function (err) {
                    if (err) throw err;
                }
            ); continueQuestions();
            })
};
//View all roles
function viewRoles() {
    connection.query("SELECT title, salary, department.name FROM role JOIN department ON role.department_id = department.id", function (err, res) {
        if (err) throw err;
        console.table(res);
        continueQuestions();
    })
};
//View all Departments
function viewDepartments() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.table(res);
        continueQuestions();
    })
};
//Add a role
function addRole() {
    departmentChoices();
    inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: "What is the role's title?"
        },
        {
            name: 'salary',
            type: 'input',
            message: "What is the role's salary?"
        },
        {
            name: 'department',
            type: 'list',
            message: 'What department does this role belong to?',
            choices: deptArray
        }])
        .then(function (response) {
            //convert dept choice into dept ID
            let deptID;
            connection.query("SELECT * FROM department", function (err, res) {
                if (err) throw err;
                for (d = 0; d < res.length; d++) {
                    if (res[d].name == response.department) {
                        deptID = res[d].id;
                        //Add new role data to role table
                        connection.query("INSERT INTO role SET ?",
                            {
                                title: response.title,
                                salary: response.salary,
                                department_id: deptID
                            },
                            function (err) {
                                if (err) throw err;
                            })
                    }
                }
            });
            continueQuestions();
        })
};
//pull all roles from role table
function roleChoices() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            roleArray.push(res[i].title);
        }
    }); return roleArray;
};
//pull all managers from employee table
function managerChoices() {
    connection.query("SELECT * FROM employee JOIN role ON employee.role_id = role.id WHERE manager = 1", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            managerArray.push(res[i].first_name + " " + res[i].last_name);
        }
    }); return managerArray;
};
//pull all departments from dept table
function departmentChoices() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            deptArray.push(res[i].name)
        }
    }); return deptArray;
};
//pull all employees from employee table
function employeeChoices() {
    function managerChoices() {
        connection.query("SELECT * FROM employee", function (err, res) {
            if (err) throw err;
            for (let i = 0; i < res.length; i++) {
                employeeArray.push(res[i].first_name + " " + res[i].last_name);
            }
        }); return employeeArray;
    };
}
//Continue wiht more queries/adds or exit CLI
function continueQuestions() {
    inquirer
        .prompt([
            {
                name: 'continue',
                type: 'list',
                message: 'Would you like to do anything else?',
                choices: [
                    'Yes',
                    'No'
                ]
            }
        ])
        .then(function (response) {
            if (response.continue === 'Yes') {
                init();
            } else {
                connection.end();
            }
        })
};
//add new dept to dept table
function addDepartment() {
    inquirer
        .prompt([
            {
                name: 'name',
                type: 'input',
                message: 'What is the name of the department you would like to add?'
            }
        ])
        .then(function (response) {
            connection.query("INSERT INTO department SET ?", { name: response.name }, function (err) {
                if (err) throw err;
                console.log('Department added');
            })
        })
};