"use strict";

/*
Implementar la clase LinkedList, definiendo los siguientes métodos:
  - add: agrega un nuevo nodo al final de la lista;
  - remove: elimina el último nodo de la lista y retorna su valor 
  (tener en cuenta el caso particular de una lista de un solo nodo y de una lista vacía);
  - search: recibe un parámetro y lo busca dentro de la lista, con una particularidad:
   el parámetro puede ser un valor o un callback. En el primer caso,
    buscamos un nodo cuyo valor coincida con lo buscado; en el segundo, 
    buscamos un nodo cuyo valor, al ser pasado como parámetro del callback, retorne true. 
  Ejemplo: 
  search(3) busca un nodo cuyo valor sea 3;
  search(isEven), donde isEven es una función que retorna true cuando recibe por parámetro 
  un número par, busca un nodo cuyo valor sea un número par.
  En caso de que la búsqueda no arroje resultados, search debe retornar null.
*/

function Node(value) {
    //opcion2  function Node(value,next)
    this.value = value;
    this.next = null;
}

//jS FUNCIONAL : UNA LISTA TIENE NODOS
//defino la cabeza d ela lista
function LinkedList() {
    this.head = null;
}

//creo una instancia de la lisat
const linkedList = new LinkedList();

//agrego el metodo add
LinkedList.prototype.add = function add(value) {
    //DENTRO DEL LIST INSTANCI EL NODO
    let node = new Node(value);
    //current es una var aux , uan copia que apunta al primer nodo o head

    if (this.head === null) {
        this.head = node; //si cuurent es null bueno asigno en la cabecera el node
    } else {
        let current = this.head;
        while (current.next !== null) {
            //recorro todo desde la cabeza

            current = current.next;
        }
        current.next = node;
        return current;
    }
};

LinkedList.prototype.remove = function() {
    let current = this.head;
    if (current === null) {
        return null;
        // } else if (current && current.next === null) {
    } else if (current && !current.next) {
        //como debe retornar el valor debe guardarlo en una var aux;
        let aux = current.value;
        this.head = null;
        return aux;
    } //y si es falso
    else {
        // while (current.next.next !== null) {
        while (current.next.next) {
            current = current.next;
        }

        let aux = current.next.value;
        current.next = null;
        return aux;
    }
};

/* 
 - search: recibe un parámetro y lo busca dentro de la lista, con una particularidad: el parámetro puede 
 ser un valor o un callback. En el primer caso, buscamos un nodo cuyo valor coincida con lo buscado; en el segundo,
  buscamos un nodo cuyo valor, al ser pasado como parámetro del callback, retorne true. 
  Ejemplo: 
  search(3) busca un nodo cuyo valor sea 3;
  search(isEven), donde isEven es una función que retorna true cuando recibe por parámetro un número par, 
  busca un nodo cuyo valor sea un número par.
  En caso de que la búsqueda no arroje resultados, search debe retornar null.
*/

LinkedList.prototype.search = function(value) {
    if (this.head === null) return null;

    let current = this.head;

    //while (current) {
    while (current !== null) {
        //ojo current no current.next
        if (current.value === value) {
            return value;

            //asi pregunto si el value es una funcion o cb
        } else if (typeof value == "function") {
            if (value(current.value)) {
                return current.value;
            }
        }
        //y aca actualizo el valor del while current para que siga con el sigueinte
        current = current.next;
    }
    return null;
};

/*
        Implementar la clase HashTable.

        Nuetra tabla hash, internamente, consta de un arreglo de buckets (slots, contenedores, o casilleros; es decir, posiciones posibles para almacenar la información), donde guardaremos datos en formato clave-valor (por ejemplo, {instructora: 'Ani'}).
        Para este ejercicio, la tabla debe tener 35 buckets (numBuckets = 35). (Luego de haber pasado todos los tests, a modo de ejercicio adicional, pueden modificar un poco la clase para que reciba la cantidad de buckets por parámetro al momento de ser instanciada.)

        La clase debe tener los siguientes métodos:
          - hash: función hasheadora que determina en qué bucket se almacenará un dato.
           Recibe un input alfabético, suma el código numérico de cada caracter del input 
           (investigar el método charCodeAt de los strings) y calcula el módulo de ese número total 
           por la cantidad de buckets; de esta manera determina la posición de la tabla en la que se almacenará el dato.

           //////////////////////////////////////////////
          - set: recibe el conjunto clave valor (como dos parámetros distintos), hashea la clave invocando al método hash,
           y almacena todo el conjunto en el bucket correcto.
           //////////////////////////////////////////////////////////////////
          - get: recibe una clave por parámetro, y busca el valor que le corresponde en el bucket correcto de la tabla.

          ////////////////////////////////////////////////////////////////
          - hasKey: recibe una clave por parámetro y consulta si ya hay algo almacenado en la tabla con esa clave 
          (retorna un booleano).

        Ejemplo: supongamos que quiero guardar {instructora: 'Ani'} en la tabla. Primero puedo chequear, 
        con hasKey, si ya hay algo en la tabla con el nombre 'instructora'; luego, 
        invocando set('instructora', 'Ani'), se almacenará el par clave-valor en un bucket específico 
        (determinado al hashear la clave)
        */

function HashTable() {
    this.numBuckets = 35;
    this.buckets = [];
}
/*
hash: función hasheadora que determina en qué bucket se almacenará un dato. Recibe un input alfabético,
 suma el código numérico de cada caracter del input (investigar el método charCodeAt de los strings) y 
 calcula el módulo de ese número total por la cantidad de buckets;
 de esta manera determina la posición de la tabla en la que se almacenará el dato.

*/

HashTable.prototype.hash = function(Keys) {
    let suma = 0;
    for (let i = 0; i < Keys.length; i++) {
        //suma el codigo alfanumerico de cada valor
        suma += Keys.charCodeAt(i);
    }
    return suma % this.numBuckets;
};

/*
 - set: recibe el conjunto clave valor (como dos parámetros distintos), hashea la clave invocando al
  método hash, y almacena todo el conjunto en el bucket correcto. 
 */

HashTable.prototype.set = function(key, value) {
    if (typeof key != "string") {
        throw new TypeError("Keys must be strings");
    }
    let i = this.hash(key); //aplico funcion hasheadora
    if (this.buckets[i] === undefined) {
        this.buckets[i] = {}; //creo un ojeto
    }

    //en la posicion del bucket i guardo el hash i es un codigo raro que tiene [key]=value
    this.buckets[i][key] = value; //seteo con un valor
};

/* 
- get: recibe una clave por parámetro, y busca el valor que le corresponde en el bucket correcto de la tabla.
*/
HashTable.prototype.get = function(key) {
    let ubicacion = this.hash(key);

    return this.buckets[ubicacion][key];
};

/* 
- hasKey: recibe una clave por parámetro y consulta si ya hay algo almacenado en la tabla con esa clave (retorna un booleano).

*/
HashTable.prototype.hasKey = function(key) {
    let ubicacion = this.hash(key); //hasheo

    return this.buckets[ubicacion].hasOwnProperty(key); //retorna true si la llave existe
};

// No modifiquen nada debajo de esta linea
// --------------------------------

module.exports = {
    Node,
    LinkedList,
    HashTable,
};