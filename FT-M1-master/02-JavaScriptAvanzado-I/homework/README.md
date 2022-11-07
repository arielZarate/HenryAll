# Homework JavaScript Avanzado I

## Scope & Hoisting

Determiná que será impreso en la consola, sin ejecutar el código.

> Investiga cuál es la diferencia entre declarar una variable con `var` y directamente asignarle un valor.

<!--
 Rta:  cuando a una variable la declaro con var , la declaro en el Scope y puede ser usada por todo , si solo la declaro (sin asignarle valor) , esoty reservando un espacio de memoria , pero si llamo a la misma esta me devolvera UNDEFINED.

 sino la declaro con var y solo le asigno a una variable un valor por defecto js la tomaara como VAR
 -->

```javascript
x = 1;
var a = 5;
var b = 10;
var c = function (a, b, c) {
  //C se esta llamando a si misma , y crea como un bucle infinito
  //aca en la funcion c se asigno 10 a la variable x
  // pero si llamo a x fuera de la funcion me devolvera 1
  //el valor x=10 solo existe en este cotexto de la funcion
  var x = 10;
  console.log(x); //lo muestro
  console.log(a); //muestro a por consola

  //tengo una funcion dentro de otra funcion recibe a b c

  var f = function (a, b, c) {
    //aca le asigno a b lo que tiene a , luego b mostrara el resultado que tenia 'a  antes
    b = a;
    console.log(b); //return 5

    //ahora a b le asigno lo que tiene el parametro c
    b = c;

    //y en este funcion a 'x' le asigno 5 , EN ESTE CONTEXTO
    var x = 5;
  };

  //llamo a la funcion f
  f(a, b, c);
  console.log(b);
};
c(8, 9, 10);
console.log(b); //return 10
console.log(x); //este x return 1 porque no esta en el contexto de la funcion y busca en el scope Global y encuentra que x=1;
```

```javascript
console.log(bar); //no tengo nada definido asi que va devolver undefined
console.log(baz);

foo(); //si la ejecutas asi en este orden tira error no esta definida, si la declaras primero return hola
function foo() {
  console.log("Hola!");
}

//aca esta definida la funcion si la ejecutamos nos tira error ya que se lle de arriba para abajo y
//encuentra en la 1 linea que no esta asignada a nada
var bar = 1;
baz = 2;
```

```javascript
var instructor = "Tony";
if (true) {
  var instructor = "Franco";
}
console.log(instructor); //retornara franco ya que ambos estan en el global , la funcion cambia la asignacion
```

```javascript
var instructor = "Tony";
console.log(instructor); //returen tony
(function () {
  if (true) {
    var instructor = "Franco";
    console.log(instructor);
  }
})();
console.log(instructor); //aca retorna tony , pero en la funcion anonima de arreiba franco
```

```javascript
var instructor = "Tony";
let pm = "Franco";
if (true) {
  var instructor = "The Flash";
  let pm = "Reverse Flash";
  console.log(instructor);
  console.log(pm);
}
console.log(instructor); //aca retorna "the Flash"
console.log(pm); //aca retorna "franco" , ya que no se puede voilver a declarar la variable con let , dentro de la funcion si se puede declarar let pm porque es otro contexto
```

### Coerción de Datos

¿Cuál crees que será el resultado de la ejecución de estas operaciones?:

```javascript
6 / "3" //casting y resulve la operacion
"2" * "3" //hace casting y resulve la operacion
4 + 5 + "px" //aca concatena 45px
"$" + 4 + 5  //concatena $45
"4" - 2 // hace casting  convierte a cadena
"4px" - 2 //return NaN no le puede restar a una cadena un num
7 / 0   //infinity
{}[0]
parseInt("09")
5 && 2  //como ambos son true , retorna el ultimo que se definio como true , en esta linea es el "2"
2 && 5
5 || 0
0 || 5  // aca retorna el valor mas grande , el que existe
[3]+[3]-[10] //suma [3]+[3] que es 33 y luego le resta [10] retorna [23]
3>2>1   //return false porque primero evalue 3>2 y esto es true , luego true>1 return false
[] == ![]  //return true
```

> Si te quedó alguna duda repasá con [este artículo](http://javascript.info/tutorial/object-conversion).

### Hoisting

¿Cuál es el output o salida en consola luego de ejecutar este código? Explicar por qué:

// retorna 2 porque primero quiere mostrar console.log(a) pero no esta aun definido
//luego muestra por consola el valor que devulve la funcion foo y esta retorna 2 que lo muestra por consola

```javascript
function test() {
  console.log(a);
  console.log(foo());

  var a = 1;
  function foo() {
    return 2;
  }
}

test();
```

Y el de este código? : //retorna undefined por que no hace nada , ya que si le paso false NO ASIGNA la nueva cadena a snack y tampoco la retorna , por lo tanto no hace nada y como la funcion return snack y esta no fue asignada retorna undefinded

```javascript
var snack = "Meow Mix";

function getFood(food) {
  if (food) {
    var snack = "Friskies";
    return snack;
  }
  return snack;
}

getFood(false);
```

### This

¿Cuál es el output o salida en consola luego de ejecutar esté código? Explicar por qué:

//RTA retorna "Aurelio de Rosa" ya que esta entrando a la prop de obj y dentro del prop llama a la funcion getFullName y esta busca dentro de su contexto prop:{} el fullName

```javascript
var fullname = "Juan Perez";
var obj = {
  fullname: "Natalia Nerea",
  prop: {
    fullname: "Aurelio De Rosa",
    getFullname: function () {
      return this.fullname;
    },
  },
};

console.log(obj.prop.getFullname());

var test = obj.prop.getFullname;

console.log(test()); //ahora se asigno el obj a test y cuando se lo ejecuta mostrara la variable global de test
```

### Event loop

Considerando el siguiente código, ¿Cuál sería el orden en el que se muestra por consola? ¿Por qué?

//rta la funcion setTimeout es para retrasar la salida de algo es un temporiazador
//primero se mostrara lo que sale por console.log() y primero es 1 , luego sigue 4 porque el setTimeout tiene un retraso de 1 segundo el primero y luego el segundo es de 0 demorara menos por lo tanto mirando las prioridades se ejecutara

console.log(1)
console.log(4)
setTimeout(3)
setTimeout(2)

```javascript
function printing() {
  console.log(1);
  setTimeout(function () {
    console.log(2);
  }, 1000);
  setTimeout(function () {
    console.log(3);
  }, 0);
  console.log(4);
}

printing();
```
