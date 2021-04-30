DROP DATABASE IF EXISTS business_DB;
USE business_DB;

SELECT e.first_name, e.last_name, e.id AS employee_id, r.salary, r.title, d.department_name
FROM employee e
LEFT JOIN employee em ON e.manager_id = em.id
INNER JOIN roles r ON e.role_id = r.id
INNER JOIN department d ON r.department_id = d.id
ORDER BY e.id;

SELECT e.first_name, e.last_name, e.id AS employee_id, r.id AS role_id, r.title, d.department_name
FROM employee e
LEFT JOIN employee em ON e.manager_id = em.id
INNER JOIN roles r ON e.role_id = r.id
INNER JOIN department d ON r.department_id = d.id
ORDER BY e.id;


SELECT d.department_name, e.first_name, e.last_name, e.id AS employee_id, r.salary, r.title
FROM employee e
LEFT JOIN employee em ON e.manager_id = em.id
INNER JOIN roles r ON e.role_id = r.id
INNER JOIN department d ON r.department_id = d.id
ORDER BY d.department_name;


SELECT d.department_name AS Department, r.title AS Postion, r.salary AS Salary
FROM department d
RIGHT JOIN roles r ON r.department_id = d.id
ORDER BY d.department_name;

SELECT e.first_name, e.last_name, e.id AS employee_id, r.title, r.id AS role_id, d.department_name
FROM employee e
LEFT JOIN employee em ON e.manager_id = em.id
INNER JOIN roles r ON e.role_id = r.id
INNER JOIN department d ON r.department_id = d.id
ORDER BY r.id;

SELECT title, salary FROM roles
ORDER BY title; 


SELECT * FROM department;
SELECT * FROM roles;
SELECT * FROM employee;

INSERT INTO department (department_name) VALUES ('Information Technology');
INSERT INTO department (department_name) VALUES ('Software Engineering');
INSERT INTO department (department_name) VALUES ('Sales');


INSERT INTO roles (title, department_id, salary) VALUES ('IT Specialist', 1, 65000.00);
INSERT INTO roles (title, department_id, salary) VALUES ('Software Developer', 2, 82000.00);
INSERT INTO roles (title, department_id, salary) VALUES ('Sales Representative', 3, 56000.00);
INSERT INTO roles (title, department_id, salary) VALUES ('Lead IT Specialist', 1, 78000.00);
INSERT INTO roles (title, department_id, salary) VALUES ('Lead Software Developer', 2, 97000.00);
INSERT INTO roles (title, department_id, salary) VALUES ('Sales Lead', 3, 65000.00);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Allison','Bates', 4, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Peter','Smith', 5, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Juan','Sanchez', 6, 3);


INSERT INTO employee (first_name, last_name, role_id) VALUES ('Bob','Ross', 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Ray','Taylor', 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Mike','Gibbons', 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Sam','Wise', 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Sandra','Lee', 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Kim','Burton', 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Chris','Woodward', 3);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Blake','Anderson', 3);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Adam','Huda', 3);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Veronica','Stokes', 3);