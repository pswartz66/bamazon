
// logic for converting choices responses into numbers 
// to be used in the sql query search between

// let choice = ' $100+';
// let choice = ' $50 to $100';

function betweenNumber() {
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
        var num1 = parseInt(choiceArrSized[0]);
        return num1;
    } else {
        var num1 = parseInt(choiceArrSized[0]);
        var num2 = parseInt(choiceArrSized[1]);
        console.log(num1);
        console.log(num2);
    }

}

module.exports = {
    num1: num1,
    num2: num2
}







