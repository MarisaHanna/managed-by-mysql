
const inquirer = require('inquirer');
const db = require('./db/connection');
const table = require('console.table');
const view = require('./Develop/view');
const add = require('./Develop/add');
const update = require('./Develop/update');
const deleteData = require('./Develop/delete');


const start = () => {
    inquirer.prompt (

        {
         type: 'list',
         message: 'Hello! Please choose a directory below.',
         choices: ['Add employee or role', 'View employee or role', 'Update employee or role', 'Delete employee or role', 'Exit'],
         name: 'directory'  
        }
    ).then((data) => {
       
        switch (data.directory){

            case 'Add employee or role':
                add.addData();
                break;

            case 'View employee or role':
                view.viewEmployee();
                break;
                

            case 'Update employee or role':
                update.updateEmployee();
                break;

            case 'Delete employee or role':
                deleteData.deleteEmployee();
                break;    

            case 'Exit':
                console.table('See you next time! Goodbye!');
                 db.end(); 

        }
    });
}
 exports.start = start;
start();