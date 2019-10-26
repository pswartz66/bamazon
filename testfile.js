
// logic for converting choices responses into numbers 
// to be used in the sql query search between

// let choice = ' $100+';
let choice = ' $50 to $100';

var choiceArr = (choice.split('$').join(' ').split('to').join('').split(' '));
console.log(choiceArr);

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
    var num1 = choiceArrSized[0];
    console.log(num1);
} else {
    var num1 = choiceArrSized[0];
    var num2 = choiceArrSized[1];
    console.log(num1);
    console.log(num2);
}



