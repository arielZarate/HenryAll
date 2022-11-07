"use strict";

const { arrayReplaceAt } = require("markdown-it/lib/common/utils");

/*
 Implementar la clase BinarySearchTree, definiendo los siguientes métodos recursivos:
  - size: retorna la cantidad total de nodos del árbol
  - insert: agrega un nodo en el lugar correspondiente
  - contains: retorna true o false luego de evaluar si cierto valor existe dentro del árbol
  - depthFirstForEach: recorre el árbol siguiendo el orden depth first (DFS) en cualquiera de sus variantes, según se indique por parámetro ("post-order", "pre-order", o "in-order"). Nota: si no se provee ningún parámetro, hará el recorrido "in-order" por defecto.
  - breadthFirstForEach: recorre el árbol siguiendo el orden breadth first (BFS)

  El ábrol utilizado para hacer los tests se encuentra representado en la imagen bst.png dentro del directorio homework.
*/

function BinarySearchTree(value) {
    this.value = value;
    this.left = null;
    this.right = null;
}

let bst = new BinarySearchTree();
BinarySearchTree.prototype.size = function() {
    let sum = 0;
    if (this.value !== null) {
        sum++;
        if (this.right) {
            sum += this.right.size();
        }
        if (this.left) {
            sum += this.left.size();
        }
    }
    return sum;
};

//INSERT
BinarySearchTree.prototype.insert = function(value) {
    if (value < this.value) {
        /*   if (this.left === null) {
                                                                                                                                                          this.left = new BinarySearchTree(value);
                                                                                                                                                      } else {
                                                                                                                                                          this.left.insert(value);
                                                                                                                                                      } */

        if (this.left !== null) {
            this.left.insert(value);
        } else {
            this.left = new BinarySearchTree(value);
        }
    }

    if (value >= this.value) {
        /*   if (this.right === null) {
                                                                                                                                                          this.right = new BinarySearchTree(value);
                                                                                                                                                      } else {
                                                                                                                                                          this.right.insert(value);
                                                                                                                                                      } */

        if (this.right !== null) {
            this.right.insert(value);
        } else {
            this.right = new BinarySearchTree(value);
        }
    }
}; //fin insert

//contains
BinarySearchTree.prototype.contains = function(value) {
    if (this.value === value) return true;

    if (value > this.value) {
        if (this.right === null) return false;
        else return this.right.contains(value);
    }

    if (value < this.value) {
        if (this.left === null) return false;
        else return this.left.contains(value);
    }
};

//recorre el árbol siguiendo el orden depth first (DFS) en cualquiera de sus variantes,
// según se indique por parámetro ("post-order", "pre-order", o "in-order").
//Nota: si no se provee ningún parámetro, hará el recorrido "in-order" por defecto.
BinarySearchTree.prototype.depthFirstForEach = function(f, orden) {
    if (orden === "pre-order") {
        //root -izq -dere
        f(this.value);
        if (this.left !== null) this.left.depthFirstForEach(f, orden);
        if (this.right !== null) this.right.depthFirstForEach(f, orden);
    } else if (orden === "post-order") {
        //izq-der -root
        if (this.left !== null) this.left.depthFirstForEach(f, orden);
        if (this.right !== null) this.right.depthFirstForEach(f, orden);
        f(this.value);
    } else {
        //in-orden
        //izq -root -der

        if (this.left !== null) this.left.depthFirstForEach(f, orden);
        f(this.value);
        if (this.right !== null) this.right.depthFirstForEach(f, orden);
    }

    /* opcion B
                                  
                                  swicth(orden)
                                  {

                                    case: 'pre-order' ; break;
                                    case: 'post-order'; break;
                                    default: 'in-order';break;
                                  }
                                  
                                  */
};

//recorre el árbol siguiendo el orden breadth first (BFS)

//el array es una forma de implementar
BinarySearchTree.prototype.breadthFirstForEach = function(f, array = []) {
    if (this.left !== null) {
        array.push(this.left);
    }
    if (this.right !== null) {
        array.push(this.right);
    }

    f(this.value);

    if (array.length > 0) {
        array.shift().breadthFirstForEach(f, array);
    }
};

// No modifiquen nada debajo de esta linea
// --------------------------------
module.exports = {
    BinarySearchTree,
};