"use strict";

function BinarioADecimal(num) {
    // tu codigo aca
    let sum = 0;

    // aca damos vuelta los numeros
    //var numReverse = num.split("").reverse().join("");

    for (let i = 0; i < num.length; i++) {
        sum += +num[i] * 2 ** (num.length - 1 - i);
    }
    return sum;
}

function DecimalABinario(num) {
    // tu codigo aca

    let number = num;
    let binary = (number % 2).toString();

    while (number > 1) {
        number = parseInt(number / 2);
        binary = (number % 2) + binary;
    }

    return binary;
}

module.exports = {
    BinarioADecimal,
    DecimalABinario,
};