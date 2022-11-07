//obteniendo poder sobre el btn
/* let btn = document.getElementById("boton");
btn.addEventListener("click", function() {
    console.log("haciendo click");
}); */

/* 
- Utiliza el evento `click` en un boton para hacer que al hacer click en el mismo aparezca en el DOM una lista con todos los amigos que el servidor nos devolvera al hacer un `GET` a la ruta `http://localhost:5000/amigos`

*/

let URL = "http://localhost:5000/amigos";

const getAmigos = function() {
    $.get(`${URL}`, function(data) {
        console.log(data),
            data.forEach((obj) => {
                $("#lista").append(`<li id="${obj.id}">${obj.name}X </li>`);
            });
    });
};

$("#boton").click(getAmigos);

/* 

- Un campo de busqueda (input) que reciba el id de un amigo y un boton "buscar". 
Al hacer click en el boton, buscaremos el amigo que tiene ese id en el servidor, 
y lo mostraremos en el DOM. Para conseguir los datos de un amigo en particular del 
servidor, puedes hacer un `GET` nuestro servidor concatenando el `id` del amigo que
 queremos encontrar, Por ej: `http://localhost:5000/amigos/1` le pediria al servidor 
 el amigo con `id = 1`
*/

const searchAmigo = function() {
    //al id lo saco de la ruta con el value
    let id = $(`#input`).val();
    $.get(`${URL}/${id}`, function(amigo) {
        console.log(amigo);

        //.text sirve para mostrar
        $("#amigo").text(`${amigo.name} ${amigo.age} ${amigo.email}`);
        $("#input").val() = "";
    });
};

$("#search").click(searchAmigo);



/* 
- Un input que reciba el id de un amigo y un boton "borrar". 
Al hacer click en el boton, borraremos el amigo del servidor 
haciendo un `DELETE` a nuestro servidor, concatenando el id del
 usuario que queremos borrar. Por ej: `http://localhost:5000/amigos/2` 
 le pediria al servidor el amigo con `id = 2`

*/



const deleteAmigo = function() {

    //ca toma el elemento del input
    let idDel = $('#inputDelete').val();
    let amigo;



    if (idDel) {


        //guardo el amigo antes de eliminarlo
        $.get(`${URL}/${idDel}`, function(f) {
            amigo = f;
        })

        $.ajax({
                url: `${URL}/${idDel}`,
                type: "DELETE",
                success: function() {
                    $('#success').text(`Tu amigo ${amigo.name} fue eliminado con exito`);
                    $("#inputDelete").val("");
                }
            }

        )
    }
};

$("#delete").click(deleteAmigo);