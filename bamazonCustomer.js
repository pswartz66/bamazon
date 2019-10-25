
require('dotenv').config();

var myKeys = require('./keys.js');
var mysql = require('mysql');
var inquirer = require('inquirer');


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: myKeys.ID.SECRET_ID,
    database: "bamazonDB"
});


connection.connect(function(err) {

    if (err) {
        throw err;
    }

    console.log("connected as id " + connection.threadId + "\n");

    testFunc();

    // connection.end();

});


function testFunc() {

    inquirer.prompt([
        {
            type: 'input',
            name: 'userInput',
            message: 'select any bottle'
        }
    ]).then(function(response){

        // var search = response.userInput;

        connection.query('SELECT * FROM bamazonDB.productsmain WHERE shelf_price > 2000',
        
        function(err, response){

            if (err) throw err;

            console.log(response)

        })
        
    }).catch(function(err){

        if (err) throw err;

    }


)};