"use strict";
// No cambies los nombres de las funciones.

const numAleatorio = function(array) {
    var rand = Math.floor(Math.random() * array.length);
    var alea = array[rand];
    //console.log(alea);

    return alea;
};

function quickSort(array) {
    // Implementar el método conocido como quickSort para ordenar de menor a mayor
    // el array recibido como parámetro
    // Devolver el array ordenado resultante
    // Tu código:

    if (array.length <= 1) {
        return array;
    } // Si la longitud de la matriz es menor que 1, devuelve la matriz directamente
    var left = []; // La matriz de la izquierda
    var right = []; // La matriz de la derecha
    // var pivotIndex = Math.floor(arr.length / 2); // Seleccione el punto de referencia, el método floor () es redondeado hacia abajo
    var pivotIndex = Math.floor(array.length / 2); // Seleccione el punto de referencia, el método floor () es redondeado hacia abajo
    var pivot = array.splice(pivotIndex, 1); // Matriz base
    for (var i = 0; i < array.length; i++) {
        // Luego comience a recorrer la matriz, los elementos más pequeños que "base" se colocan en el subconjunto izquierdo y los elementos más grandes que la base se colocan en el subconjunto derecho.
        if (array[i] < pivot) {
            left.push(array[i]);
        } else {
            right.push(array[i]);
        }
    }
    return quickSort(left).concat(pivot, quickSort(right)); // Usa la recursión para repetir este proceso continuamente, puedes obtener la matriz ordenada.
}

//funcion adicional que necesita el merge para funcionar
function merge1(listA, listB) {
    let list = [];
    let i = 0;
    let j = 0;

    while (i < listA.length && j < listB.length) {
        if (listA[i] < listB[j]) {
            list.push(listA[i]);
            i++;
        } else {
            list.push(listB[j]);
            j++;
        }
    }

    while (i < listA.length) list.push(listA[i++]);
    while (j < listB.length) list.push(listB[j++]);

    return list;
}

/* function merge2(left, right) {
    var a = left.length;
    var b = right.length;
    if (a == 0) return right;
    if (b == 0) return left;
    var result = [],
        l = 0,
        r = 0;
    while (l + r < a + b) {
        if (l < a && (r == b || left[l] <= right[r])) {
            result.push(left[l++]);
        } else {
            result.push(right[r++]);
        }
    }
    return result;
} */

function mergeSort(array) {
    // Implementar el método conocido como mergeSort para ordenar de menor a mayor
    // el array recibido como parámetro
    // Devolver el array ordenado resultante
    // Tu código:

    if (array.length < 2) {
        return array;
    } else if (array.length > 1) {
        let n = array.length;
        let mitad = n / 2;
        return merge1(
            mergeSort(array.slice(0, mitad)),
            mergeSort(array.slice(mitad, n))
        );
    }
}

// No modificar nada debajo de esta línea
// --------------------------------

module.exports = {
    quickSort,
    mergeSort,
};