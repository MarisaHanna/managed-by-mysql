const inquirer = require('inquirer');
const db = require('../db/connection');
const start = require('../server');


const updateEmployee = () => {

    inquirer.prompt(

        {
            type: 'list',
            message: 'Would you like to update an employee\'s role?',
            choices:['Yes, I am updating an employee', 'Back To Main Menu', 'Exit'],
            name: 'update'


        }).then((data) => {

         switch (data.update){

            case 'Yes, I am updating and employee':
                 updateNow();
                 break;

             case 'Back To Main Menu':
                 start.start();
                 break;
                    
             case 'Exit':
                 db.end();
                 break;   
        } 
    });
}

const updateNow = () => {
    db.query(
        `SELECT e.first_name, e.last_name, e.id AS employee_id, r.title, r.id AS role_id, d.department_name
        FROM employee e
        LEFT JOIN employee em ON e.manager_id = em.id
        INNER JOIN roles r ON e.role_id = r.id
        INNER JOIN department d ON r.department_id = d.id
        ORDER BY r.id`, (err, results) => {
             
            if (err) {
                 throw err;
                }
             console.table(results)

             inquirer.prompt([

                 {
                     name: 'updateData',
                     type: 'list',
                     message: 'What employee would you like to update?',
                    choices: function () {
                        let updateArray = [];
                        for (let i = 0; i < results.length; i++){
                            updateArray.push(results[i].last_name);
                        }
                            return updateArray;
                    },
                },
                {
                    name: 'newRole',
                    type: 'list',
                    message: 'What role would you like to change this employee to?',
                    choices: function () {
                        let jobRoles = [];
                        for ( let i = 0; i < results.length; i++){
                            jobRoles.push(results[i].role_id);
                        }
                        
                        let deleteRoles = new Set(jobRoles);
                        let newJob = [...deleteRoles];
                        return newJob;
                         
                    },

                }
                ]).then((data) => {
                    db.query(
                       `UPDATE employee SET ? WHERE last_name = '${data.updateData}'`,

                       {
                           role_id: data.newRole,
                       },
                       function (err, results) {

                        if (err){
                            throw err;
                         }
                         console.log('Success! A new role has been added!')
                         updateEmployee();
                    
               }); 
          })
     })
}

module.exports = {updateEmployee}