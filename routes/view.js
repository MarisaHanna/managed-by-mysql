const inquirer = require('inquirer');
const start = require('../server');
const table = require('console.table');
const db = require('../db/connection');




const viewEmployee = () => {
    inquirer.prompt (
       
        {
            type: 'list',
            message: 'What would you like to view?',
            choices: ['View all employees', 'View Employee by Department', 'View Departments', 'View Positions', 'Main Menu', 'Exit'],
            name: 'view'
        }
    ).then((data) => {

        switch (data.view){

            case 'View all employees':
                allEmployees();
                break;

            case 'View Employee by Department':
                byDepartment();
                break;
                
            case 'View Departments':
                allDepartments();
                break;
                
            case 'View Positions':
                byPosition();
                break;

            case 'Main Menu':
                start.start();
                break;    

            case 'Exit':
                db.end();
                break;     
        }
         
    });
}

const allEmployees = () => {
    db.query(
        `SELECT e.first_name, e.last_name, e.id AS employee_id, r.salary, r.title, d.department_name
        FROM employee e
        LEFT JOIN employee em ON e.manager_id = em.id
        INNER JOIN roles r ON e.role_id = r.id
        INNER JOIN department d ON r.department_id = d.id
        ORDER BY e.id`, (err,results) => {
            
            if(err){
                throw err;
            }
            console.table(results)
            viewEmployee();
        });
}

const byDepartment = () => {
    db.query (
        `SELECT d.department_name, e.first_name, e.last_name, e.id AS employee_id, r.salary, r.title
        FROM employee e
        LEFT JOIN employee em ON e.manager_id = em.id
        INNER JOIN roles r ON e.role_id = r.id
        INNER JOIN department d ON r.department_id = d.id
        ORDER BY d.department_name;`, (err,results) => {
            
            if(err){
                throw err;
            }
            console.table(results)
            viewEmployee();
        });
}

const allDepartments = () => {
    db.query(
        `SELECT d.department_name AS Department, r.title AS Postion, r.salary AS Salary
        FROM department d
        RIGHT JOIN roles r ON r.department_id = d.id
        ORDER BY d.department_name;`, (err,results) => {
           
            if(err){
                throw err;
            }
            console.table(results)
            viewEmployee();
        });
}

const byPosition = () => {
    db.query(
        `SELECT title, salary FROM roles
        ORDER BY title;`, (err,results) => {
            
            if(err){
                throw err;
            }
            console.table(results)
            viewEmployee();
        });
}



module.exports = {viewEmployee}