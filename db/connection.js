const mysql = require('mysql');
const util = require('util');


const db = mysql.createConnection({

        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'business_DB',
        port: '3306'

       
    });

    db.connect ((err) => {
        if (err){
            throw err;
        }
    });

db.query = util.promisify(db.query);
module.exports = db;