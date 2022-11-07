"use strict";

/*
Definir las funciones recursivas nFactorial y nFibonacci.

nFactorial(n) debe retornar el factorial de n sabiendo que, siendo n un número natural, 
su factorial (representado como n!) es el producto de n por todos los números naturales 
menores que él y mayores a 0. Ejemplo: 5! = 5 * 4 * 3 * 2 * 1

nFibonacci(n) debe retornar el enésimo número de la secuencia de Fibonacci, tomando al 0 y al 1, respectivamente, como primer y segundo elementos de la misma, y sabiendo que cualquier elemento que se agregue a esta secuencia será el resultado de la suma del último elemento y el anterior.
Ejemplo: nFibonacci(7) retornará 13, ya que 13 es el dígito que está en la posición 7 de la secuencia.

Secuencia:  0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ... 


Como ejercicio adicional y completamente opcional, al terminar de resolver este problema pueden intentar definir funciones que logren los mismos resultados pero de manera iterativa.
*/

function nFactorial(n) {
    //n <= 0 ? 1 : n * nFactorial(n - 1);

    if (n <= 1) {
        return 1;
    } else {
        let x = 0;
        x += n * nFactorial(n - 1);

        return x;
    }
}

/* 

Un número Fibonacci, usualmente con notación f(n), es la suma de los dos números fibonacci que le preceden. Esta sucesión empieza con f(0) = 0, f(1) = 1, f(2) = f(1) + f(0) hasta f(x) = f(x-1) + f(x-2).
*/
function nFibonacci(n) {
    // + nFibonacci(n - 2)
    return n < 1 ? 0 : n <= 2 ? 1 : nFibonacci(n - 1) + nFibonacci(n - 2);
}

/*
Implementar la clase Queue, sabiendo que es una estructura de tipo FIFO, 
donde el primer elemento que ingresa es el primero que se quita. 
Definir los siguientes métodos:
  - enqueue: agrega un valor respetando el orden.
  - dequeue: remueve un valor respetando el orden. Retorna undefined cuando la queue está vacía.
  - size: retorna el tamaño (cantidad de elementos) de la queue.

Pueden utilizar class o función constructora.


*/

//clase Queue

/* class Queue {
    constructor() {
        this.queue = [];
    }

    enqueue(element) {
        this.queue.push(element);
        return this.queue;
    }

    dequeue() {
        return this.queue.shift();
    }

    peek() {
        return this.queue[0];
    }

    size() {
        return this.queue.length;
    }

    isEmpty() {
        return this.queue.length === 0;
    }

    print() {
        return this.queue;
    }
}
 */
function Queue() {
    this.cola = [];
}

//AHORA AGREGO LAS FUNCIONES PROTOTYPE GARANTIZA QUE EXISTE ESA FUNCION PARA TODAS CLASES QUE SE UTILIZEN DE TIPO QUEUE
//enqueue() : agrega un elemento a la cola

Queue.prototype.enqueue = function(elemento) {
    this.cola.push(elemento);
    return this.cola;
};

//dequeue() : elimina un elemento de la cola
Queue.prototype.dequeue = function() {
    //this.cola.isEmpty() ? "undefined" :
    return this.cola.shift();
};

Queue.prototype.size = function() {
    return this.cola.length;
};
Queue.prototype.isEmpty = function() {
    return this.cola.length === 0;
};

// No modifiquen nada debajo de esta linea
// --------------------------------

module.exports = {
    Queue,
    nFactorial,
    nFibonacci,
};