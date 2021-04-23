const express = require('express');
const inquirer = require('inquirer');
const sequelize = require('./config/connection');


const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

sequelize.sync({force: true}).then (() => {
    app.listen(PORT, () => console.log (`Now listening on port ${PORT}`))
});


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
                addEmployee();
                break;

            case 'View employee':
                viewEmployee();
                break;
                
            case 'Update employee':
                updateEmployee();
                break;

            case 'Exit':
                console.log('See you next time! Goodbye!');
                  

        }
    });
}
 exports.start = start;
start();