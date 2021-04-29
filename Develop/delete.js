const inquirer = require('inquirer');
const start = require('../server');
const table = require('console.table');
const db = require('../db/connection');



const deleteEmployee = () => {

        inquirer.prompt(

        {
             type: 'list',
             message: 'What would you like to delete?',
             choices: ['Delete a Department', 'Delete a Role', 'Delete an Employee', 'Back To Main Menu'],
             name: 'delete'

        }).then((data) => {

            switch (data.delete){

                case 'Delete a Department':
                    deleteDepot();
                    break;

                case 'Delete a Role':
                    deleteRole();
                    break;

                case 'Delete an Employee':
                    deletePerson();
                    break;
                    
                 case 'Back To Main Menu':
                     start.start();
                     break;   
                        
            }
      });
}


const deleteDepot = () =>{

    const query = `SELECT * FROM department`;
    db.query(query, (err,results) => {

        if (err){
            throw err;
        }
            console.table(results);

       inquirer.prompt([

            {
                name: 'deleteDepot',
                type: 'list',
                message: 'What Department would you like to delete?',
                choices: function () {
                    let depotArray = [];
                    for (let i = 0; i < results.length; i++) {
                        depotArray.push(results[i].department_name);
                    }
                        return depotArray;
                }
            }
       ]).then((data) => {
           db.query(
               `DELETE FROM department WHERE ? `,
               {
                   department_name: data.deleteDepot
               },
                function (err, results){

                    if (err){
                        throw err;
                    }

                    console.log(`${data.deleteDepot} was successfully deleted!`);
                    deleteEmployee();

             })
         })     

     });
}

const deleteRole = () => {

    const query = `SELECT * FROM role`;
    db.query(query, (err, results) => {

        if (err){
            throw err;
        }

        console.table(results)

        inquirer.prompt([

            {
                name: 'deleteRole',
                type: 'list',
                message: 'What Role would you like to delete?',
                choices: function () {
                    let roleArray = [];
                    for (let i = 0; i < results.length; i++){
                        roleArray.push(results[i].title);
                    }
                        return roleArray;
                }
            }

        ]).then((data) => {
            db.query(
                `DELETE FROM role WHERE ?`,

                {
                    title: data.deleteRole
                },
                function(err, results){

                    if (err){
                        throw err;
                    }
                    console.log(`${data.deleteRole} was successfully deleted`);
                    deleteEmployee();

            })
        })
    });
}

const deletePerson = () => {

    const query = `SELECT * FROM employee`;
    db.query(query, (err, results) => {

            if (err){
                throw err;
            }

            console.table(results)

            inquirer.prompt([

                {
                    name: 'deletePerson',
                    type: 'list',
                    message: 'Please select the employee  by their ID number to delete them from your database',
                    choices: function () {
                        let peepsArray = [];
                        for (let i = 0; i < results.length; i++){
                            peepsArray.push(results[i].id);
                        }
                            return peepsArray;
                    }
                }

            ]).then((data) => {
                db.query(
                    `DELETE FROM employee WHERE ?`,

                    {
                        id: data.deletePerson
                    },

                    function (err, results) {

                        if (err){
                            throw err;
                        }

                        console.log(`Employee with the ID number ${data.deletePerson} has been deleted.`)
                        deleteEmployee();

                    })
            })
      });
}


module.exports = {deleteEmployee}


