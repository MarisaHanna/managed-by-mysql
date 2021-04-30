
const inquirer = require('inquirer');
const db = require('./db/connection');
const table = require('console.table');
const view = require('./Develop/view');
const add = require('./Develop/add');
const update = require('./Develop/update');
const deleteData = require('./Develop/delete');
const figlet = require('figlet');
const chalk = require('chalk');


 console.log(chalk.blueBright (figlet.textSync('Welcome To Your \n Business Database!', { horizontalLayout: 'full', verticalLayout: 'full'})));


const start = () => {
    inquirer.prompt (

        {
         type: 'list',
         message: 'Hello! Please choose a directory below.',
         choices: ['Add Employee or Role', 'View Employee or Role', 'Update Employee or Role', 'Delete Employee or Role', 'Exit'],
         name: 'directory'  
        }
    ).then((data) => {
       
        switch (data.directory){

            case 'Add Employee or Role':
                add.addData();
                break;

            case 'View Employee or Role':
                view.viewEmployee();
                break;
                

            case 'Update Employee or Role':
                update.updateEmployee();
                break;

            case 'Delete Employee or Role':
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