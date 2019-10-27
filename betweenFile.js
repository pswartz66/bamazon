
// logic for converting choices responses into numbers 
// to be used in the sql query search between

// let choice = ' $100+';

// var choiceArr = testStr.split('$').join(' ').split('to').join('').split(' ');

require('dotenv').config();
var myKeys = require('./keys.js');
var mysql = require('mysql');

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

    testQuery();

    // connection.end();

});

function testQuery(){

    var headers = 'SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = `bamazonDB` AND TABLE_NAME = `productsmain`';
    connection.query(headers, function(err, response){
        
        if (err) throw err;

        console.log(response);

        for (var i = 0; i < response.length; i++) {

            console.log(response[i].item_no + ' || ' + response[i].item_description +
                ' || ' + response[i].proof + ' || ' + response[i].shelf_price + ' || ' +
                response[i].case_cost
            );

        }
    
    });
    

    var query = 'SELECT * FROM bamazonDB.productsmain LIMIT 10'+
    ' DESCRIBE bamazonDB.productsmain';

    connection.query(query, function(err, response){
        
        if (err) throw err;

        for (var i = 0; i < response.length; i++) {

            console.log(response[i].item_no + ' || ' + response[i].item_description +
                ' || ' + response[i].proof + ' || ' + response[i].shelf_price + ' || ' +
                response[i].case_cost
            );

        }
    
    });
    
}


/* function betweenNumber(choice) {
    
    var choiceArr = [];
    
    var choiceArr = choice.split('$').join(' ').split('to').join('').split(' ');

    var choiceArrSized = [];

    for (var i = 0; i < choiceArr.length; i++) {
        if (choiceArr[i] !== "" && choiceArr[i].length <= 3) {
            choiceArrSized.push(choiceArr[i]);
        } else if (choiceArr[i].length === 4) {
            var hundredPlus = choiceArr[i].substring(0, choiceArr[i].length - 1);
            choiceArrSized.push(hundredPlus);
        }
    }

    if (choiceArrSized.length === 1) {
        var num1 = parseInt(choiceArrSized[0]);
        return num1;
    } else {
        var num1 = parseInt(choiceArrSized[0]);
        var num2 = parseInt(choiceArrSized[1]);
        return num1, num2;
    }

}

var testStr = ' $50 to $100';
betweenNumber(testStr);

module.exports.betweenNumber = betweenNumber; */







