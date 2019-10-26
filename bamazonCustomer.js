
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


    buyProduct();

    // connection.end();

});



function buyProduct() {

    inquirer.prompt([
        {
            type: 'list',
            name: 'userInput',
            message: 'Welcome to bamazonLiquor, What are you looking to buy today?',
            choices: [
                'Bottle',
                'Case'
            ]
        }
    ]).then(function(response){

        var introGreeting = response.userInput;

        displaySampleProducts();

        switch (introGreeting) {
            case 'Bottle':

            bottleQuery();

            break;

            case 'Case':

            break;

        }

        
        
    }).catch(function(err){

        if (err) throw err;

    }


)};

function displaySampleProducts(){

    connection.query('SELECT item_no, item_description,'+
    'proof, shelf_price, case_cost' +
    ' FROM '+
        'bamazonDB.productsmain ORDER BY item_no LIMIT 10',
        
    function(err, response){

        if (err) throw err;

        // console.log(response);

        console.log('\n');
        console.log('---------------------------------------');
        console.log('Below is a sample list of our inventory');
        console.log('---------------------------------------');

        for (var i = 0; i < response.length; i++) {

            console.log(response[i].item_no + ' || ' + response[i].item_description + 
            ' || ' + response[i].proof + ' || ' + response[i].shelf_price + ' || ' + 
            response[i].case_cost
            );

        }

        console.log('\n');


    })

}


function bottleQuery() {

    inquirer.prompt([
        {
            type: 'list',
            name: 'userInput',
            message: 'Please select a price range',
            choices: [
                ' $1 to $10',
                ' $11 to $20',
                ' $20 to $50',
                ' $50 to $100',
                ' $100+'
            ]
        }
    ]).then(function(response) {

        var bottleQuery = response.userInput;
        



    }).catch(function(err){

        if (err) throw err;
        

    })
}