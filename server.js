
const inquirer = require('inquirer');
const db = require('./db/connection');
const table = require('console.table');
const view = require('./routes/view');
const add = require('./routes/add');
const update = require('./routes/update');


const start = () => {
    inquirer.prompt (

        {
         type: 'list',
         message: 'Hello! Please choose a directory below.',
         choices: ['Add employee', 'View employee', 'Update employee', 'Delete employee', 'Exit'],
         name: 'directory'  
        }
    ).then((data) => {
       
        switch (data.directory){

            case 'Add employee':
                add.addData();
                break;

            case 'View employee':
                view.viewEmployee();
                break;
                

            case 'Update employee':
                update.updateEmployee();
                break;

            case 'Exit':
                console.table('See you next time! Goodbye!');
                 db.end(); 

        }
    });
}
 exports.start = start;
start();