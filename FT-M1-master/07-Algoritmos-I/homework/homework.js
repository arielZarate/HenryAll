"use strict";
// No cambies los nombres de las funciones.

function factorear(num) {
    // Factorear el número recibido como parámetro y devolver en un array
    // los factores por los cuales se va dividiendo a dicho número (De menor a mayor)
    // Ej: factorear(180) --> [1, 2, 2, 3, 3, 5] Ya que 1x2x2x3x3x5 = 180 y son todos números primos
    // Tu código:

    var resultado = [];
    // for (var i = 2; i < num + 1; i++) {
    for (var i = 2; i <= num; i++) {
        //resultado.push(1);
        console.log("probar factor: ", i); //primer recoorido 2

        //si esto no es correcto se sigue ejecutando e incrementando  i
        if (num % i === 0) {
            console.log(num, "%", i);
            //if(4%2) -->true
            console.log("agregar factor: ", i); //como 2 es factor y no me devuelve resto aplico

            resultado.push(i); //meto el resultado en un array por atras [2,x]
            console.log("pusheamos:", resultado);
            num /= i; //num=num/i;
            console.log("num", num);
            console.log("i vale:", i);
            // console.log("");
            i -= 1; //i=i-1

            console.log("ahora i vale:", i);
            console.log("");
            console.log("");
            console.log("");
        }
    }
    resultado.unshift(1);
    return resultado;
}

function bubbleSort(array) {
    // Implementar el método conocido como bubbleSort para ordenar de menor a mayor
    // el array recibido como parámetro
    // Devolver el array ordenado resultante
    // Tu código:

    //[5,15,5,2]
    /*   if (array[i] > array[i + 1]) {
                                                                                                                                                          let aux = array[i];
                                                                                                                                                          array[i] = array[i + 1];
                                                                                                                                                          array[i + 1] = aux;
                                                                                                                                                      } */

    for (let i = 0; i < array.length - 1; i++) {
        console.log(
            "en el 1er for el i es: ",
            i,
            " y recorre el array.length -1 : ",
            array.length - 1
        );
        for (let j = i + 1; j < array.length; j++) {
            console.log(
                "en el 2do for j= i+1 es: ",
                j,
                " y recorre el array.length : ",
                array.length
            );

            if (array[i] > array[j]) {
                console.log("");
                console.log("pregunta si ", array[i], ">", array[j]);
                let aux = array[i];
                array[i] = array[j];
                array[j] = aux;

                console.log("");
                console.log("orden :", array);
            }
        }
    }
    return array;
}

function insertionSort(array) {
    // Implementar el método conocido como insertionSort para ordenar de menor a mayor
    // el array recibido como parámetro utilizando arreglos
    // Devolver el array ordenado resultante
    // Tu código:

    //MAS DIFICIL DE ENTENDER LA LOGICA

    for (let i = 1; i < array.length; i++) {
        let j = i - 1;
        console.log("indice j  --->", j);
        let temp = array[i];
        console.log("array[i]", temp);
        console.log("array[j]", array[j]);
        while (j >= 0 && array[j] > temp) {
            array[j + 1] = array[j];

            j--;
            console.log(j);
        }
        array[j + 1] = temp;
        console.log("array[j+1]:", temp);
    }

    console.log(array);
    return array;
}

function selectionSort(array) {
    // Implementar el método conocido como selectionSort para ordenar de menor a mayor
    // el array recibido como parámetro utilizando dos arreglos
    // Devolver el array ordenado resultante
    // Tu código:

    for (var i = 0; i < array.length; i++) {
        //set min to the current iteration of i
        var min = i;

        // si i es 0 j vale 1
        for (var j = i + 1; j < array.length; j++) {
            //si el elemento en la posicion j es >al de la posicion i
            if (array[j] < array[min]) {
                // a min lo designa como j
                min = j;
            }
        }

        var aux = array[i]; //tguardo en una aux lo del array[i]
        array[i] = array[min]; //en array[i] asigno lo que tiene array[min]
        array[min] = aux; //y en arry[min]asigno lo de la var aux;
    }
    return array;
}

// No modificar nada debajo de esta línea
// --------------------------------

module.exports = {
    factorear,
    bubbleSort,
    insertionSort,
    selectionSort,
};