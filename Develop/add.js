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
            const query =  `INSERT INTO department SET ?`;
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
            `SELECT e.first_name, e.last_name, e.id AS employee_id, r.id AS role_id, r.title, d.department_name
            FROM employee e
            LEFT JOIN employee em ON e.manager_id = em.id
            INNER JOIN roles r ON e.role_id = r.id
            INNER JOIN department d ON r.department_id = d.id
            ORDER BY e.id`, (err, results) => {
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
                        choices: function() {
                            let rolesArray = [];
                            for (let i = 0; i < results.length; i++){
                                rolesArray.push(results[i].role_id);
                            }
                            let deleteDups = new Set(rolesArray)
                            let newArray = [...deleteDups];
                            return newArray;
                        },
                    },
             ]).then ((data) => {
                 db.query (
                     `INSERT INTO employee SET ?`,
                     {
                         first_name: data.firstName,
                         last_name: data.lastName,
                         role_id: data.addRole,
                     }, (err, results) =>{
                         if (err){
                            throw err;
                         }
                            console.log('Your new employee has been added!')
                            addData();
                     })
                })
            })
        }


  const addRole = () => {
      db.query(
          `SELECT * FROM department`, (err, results) => {

                if (err){
                 throw err;
                }
                 console.table(results);

              inquirer.prompt([

                {
                name: 'addDepot',
                type: 'list',
                message: 'What department will you be adding this role to?',
                choices: function () {
                    let depoArray = [];
                    for (let i = 0; i < results.length; i++) {
                        depoArray.push(results[i].id);
                    }
                        return depoArray;
            },

            },
            {
                 type: 'input',
                 message: 'What would you like to name this role?',  
                 name: 'addRole'    
            },
            {
                type: 'input',
                message: 'What is the Salary for this position?',
                name: 'addMoney'
            },

            ]).then((data) => {
                db.query(
                    `INSERT INTO roles SET ?`,
                    {
                        title: data.addRole,
                        salary: data.addMoney,
                        department_id: data.addDepot
                    },
                    function (err, results) {
                        if (err){
                        throw err;
                        }
                        console.log('Your new role has been added!')
                        addData();         
                    }
                )
            })   
      }
 )}      
               
   module.exports = {addData}             
                   
                
            