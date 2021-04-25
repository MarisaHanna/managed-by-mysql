const inquirer = require('inquirer');
const db = require ('../db/connection');
const start = require('../server');


const addData = () => {
    inquirer.prompt (
        {
            type: 'list',
            message: 'What information would you like to add?',
            choices:['Department', 'Employee', 'Role', 'Main Menu', 'Exit' ],
            name: 'add'
        
        }).then ((data) => {

             switch (data.add){

                case 'Department':
                     addDepartment();
                     break;

                case 'Employee':
                    addEmployee();
                    break; 
                        
                case 'Role':
                    addRole();
                    break;

                case 'Main Menu':
                    start.start();
                    break;     
                        
                case 'Exit':
                    db.end();
                    break;   
        }
    })
}

const addDepartment = () => {
    inquirer.prompt(
        {
            type: 'input',
            message: 'What is the name of this department?',
            name: 'addDepartment'

        }).then ((data) => {
            const query =  `INSERT INTO department SET ?`
            db.query (query, {department_name: data.addDepartment}, (err, results) => {

                if(err){
                    throw err;
                }
                console.table('Success!',results)
                addData();
            })
        });   
    }

    const addEmployee = () => {
        db.query (
            `SELECT e.first_name, e.last_name, e.id AS employee_id, r.salary, r.title, d.department_name
            FROM employee e
            LEFT JOIN employee em ON e.manager_id = em.id
            INNER JOIN roles r ON e.role_id = r.id
            INNER JOIN department d ON r.department_id = d.id
            ORDER BY e.id;`, (err, results) =>{
                console.table(results),

                inquirer.prompt([
                    {
                        type: 'input',
                        message: 'What is the employee\'s first name?',
                        name: 'firstName'
                    },
                    {
                        type: 'input',
                        message: 'What is the employee\'s last name?',
                        name: 'lastName'
                    },
                    {
                        type: 'list',
                        message: 'What is the employee\'s role?',
                        name: 'addRole',

                    }
             ])}
    )}

               
   module.exports = {addData}             
                   
                
            