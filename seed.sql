INSERT INTO department (name) 
VALUES ('Legal'), 
('Accounting'), 
('Project Management'), 
('Software'), 
('Engineering'),
('C-level');

INSERT INTO role (title, salary, department_id, manager)
VALUES ('President', 350000, 6, 1),
('In House Council', 125000, 1, 0), 
('CFO', 220000, 6, 1), 
('Accounts Payable', 50000, 2, 0), 
('Accounts Receivable', 50000, 2, 0),
('Project Manager', 75000, 3, 1),
('Jr Developer', 75000, 4, 0),
('Sr Developer', 125000, 4, 1),
('CTO', 220000, 6, 1),
('Engineer', 100000, 5, 0);

INSERT INTO employee (first_name, last_name, role_id)
VALUES('Lynda', 'Smith', 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Scott', 'Jackson', 2, 1),
('Melanie', 'Tran', 3, 1),
('Dave', 'Mathers', 4, 3),
('Sylvia', 'James', 5, 3),
('Mack', 'Hinkle', 6, 9),
('Daryl', 'Sheffield', 7, 9),
('Jamie', 'Brown', 8, 9),
('Jordan', 'Randall', 9, 1),
('Jocelyn', 'Valley', 10, 9);