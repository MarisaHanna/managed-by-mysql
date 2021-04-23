const express = require('express');
const sequelize = require('./config/connection');


const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

sequelize.sync({force: true}).then (() => {
    app.listen(PORT, () => console.log (`Now listening on port ${PORT}`))
});