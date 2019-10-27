
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


connection.connect(function (err) {

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
            message: 'Welcome to bamazonBeverage, What are you looking to buy today?',
            choices: [
                'Bottle',
                'Case'
            ]
            
        }
        
    ]).then(function (response) {

        var introGreeting = response.userInput;

        switch (introGreeting) {
            case 'Bottle':

                displaySampleProducts();
                
                // call Bottle Query function
                bottleQuery();

                break;

            case 'Case':

                break;
        }

    }).catch(function (err) {

        if (err) throw err;

    });
};

function displaySampleProducts() {
    var query = 'SELECT item_no, item_description, proof, shelf_price, case_cost '+
    'FROM bamazonDB.productsmain ORDER BY item_no LIMIT 10'
    connection.query(query, function (err, response) {

            if (err) throw err;

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
                ' $21 to $50',
                ' $51 to $100',
                ' $100+'
            ]
        }
    ]).then(function (response) {

        var matrix = {
            one_ten: [1, 10],
            eleven_twenty: [11, 20],
            twentyone_fifty: [21, 50],
            fiftyone_hundred: [51, 100],
            hundred_plus: [101],
        };

        var bottleQuery = response.userInput;

        switch(bottleQuery) {
            case ' $1 to $10':
                var num1 = matrix.one_ten[0];
                var num2 = matrix.one_ten[1];
                bottleQueryFunc();
            break;
            case ' $11 to $20':
                var num1 = matrix.eleven_twenty[0];
                var num2 = matrix.eleven_twenty[1];
                bottleQueryFunc();
            break;
            case ' $21 to $50':
                var num1 = matrix.twentyone_fifty[0];
                var num2 = matrix.twentyone_fifty[1];
                bottleQueryFunc();
            break;
            case ' $51 to $100':
                var num1 = matrix.fiftyone_hundred[0];
                var num2 = matrix.fiftyone_hundred[1];
                bottleQueryFunc();
            break;
            case ' $100+':
                var num1 = matrix.hundred_plus[0];
                bottleQueryTwoFunc();  
            break;
        }


        function bottleQueryFunc() {
            var query = 'SELECT * FROM bamazonDB.productsmain' +
            ' WHERE shelf_price BETWEEN ? and ? ORDER BY rand() LIMIT 10';
            connection.query(query, [num1, num2], function (err, response) {
                    if (err) throw err;
                    console.log(response);
    
            });
        }

        function bottleQueryTwoFunc() {
            var query = 'SELECT * FROM bamazonDB.productsmain' +
            ' WHERE shelf_price >= ? ORDER BY rand() LIMIT 10';
            connection.query(query, num1, function (err, response) {

                if (err) throw err;
                console.log(response);

            });

        }

    }).catch(function (err) {

        if (err) throw err;

    });
}


// create a function called caseQuery here
