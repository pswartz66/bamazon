
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
    var query = 'SELECT * FROM bamazonDB.productsmain ORDER BY item_no LIMIT 10'
    connection.query(query, function (err, response) {

        if (err) throw err;

        // console.log(response[0]);
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
        console.log('Press any arrow on the keyboard to continue...');
        console.log('\n');
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

        switch (bottleQuery) {
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
                // console.log(response);

                console.log('\n');
                console.log('-----------------------------------------------------------------------');
                console.log('Based on your price range of '+'$'+num1+' to '+'$'+num2+' we have the following selection:');
                console.log('-----------------------------------------------------------------------');

                for (var i = 0; i < response.length; i++) {

                    console.log(response[i].item_no + ' || ' +
                        response[i].item_description + ' || ' +response[i].proof + 
                        ' || ' + response[i].shelf_price + ' || ' +
                        response[i].case_cost
                    );

                }
                console.log('\n');
                console.log('Press any arrow on the keyboard to continue...');
                console.log('\n');
                console.log('\n');

                purchaseBottle();

            });
        }

        function bottleQueryTwoFunc() {
            var query = 'SELECT * FROM bamazonDB.productsmain' +
                ' WHERE shelf_price >= ? ORDER BY rand() LIMIT 10';
            connection.query(query, num1, function (err, response) {

                if (err) throw err;
                // console.log(response);

                console.log('\n');
                console.log('-------------------------------------------------------------------');
                console.log('Based on your price range of '+'$100+'+' we have the following selection:');
                console.log('-------------------------------------------------------------------');

                for (var i = 0; i < response.length; i++) {

                    console.log(response[i].item_no + ' || ' +
                        response[i].item_description + ' || ' +response[i].proof + 
                        ' || ' + response[i].shelf_price + ' || ' +
                        response[i].case_cost
                    );

                }
                console.log('\n');
                console.log('Press any arrow on the keyboard to continue...');
                console.log('\n');
                console.log('\n');

                purchaseBottle();

            });

        }

    }).catch(function (err) {

        if (err) throw err;

    });
}


function purchaseBottle(){

    inquirer.prompt([
        {
            type: 'input',
            name: 'userInput',
            message: 'To select a bottle, enter an item_no from the list above: '

        }
    ]).then(function(response){

        var item_num = response.userInput;

        checkInventory(item_num);


        // check if there is enough quantity then run 

        var query = 'SELECT * FROM bamazonDB.productsmain' +
                ' WHERE item_no = ?';
            connection.query(query, item_num, function (err, response) {

                if (err) throw err;

                console.log('\n');
                console.log('------------------------------------------------------------------');
                console.log('Great choice!! You chose '+response[0].item_description);
                console.log('You'+"'re total is: "+' $'+response[0].shelf_price);
                console.log('------------------------------------------------------------------');

                console.log('Thank you for shopping at bamazonBeverage! We value you'+"'re service ");
                console.log('\n');
                console.log('\n');

                // update the quantity in the sql table

            });

            connection.end();


    }).catch(function(err){
        throw err;
    })

}

// create a function called caseQuery here


// create a function for Inventory Check here
function checkInventory(item_number){


    connection.query('CALL checkInventory()', [item_number, item_number], function(err, response){

        if (err) throw err;
        
        console.log(item_number + ' has been restocked with 20 bottles');
        console.log(response[0]);


    });

}



// create a function for math calculation:
//   - when user buys : decrease the quantity

function subtractInventory(item_number){

    // if checkInventory === 0 then add 20 bottles

    var query = 'UPDATE item_no'+
                'SET quantity = quantity - 1'+
                'WHERE item_no = ?';

    connection.query(query, item_number, function(err, response){

        if (err) throw err;

        console.log(response[0]);


    });
    

}