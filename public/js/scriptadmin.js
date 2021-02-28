
// ADMIN. GET CLIENTES

fetch("/admin/inforeservas")
    .then(response => {
        return response.json()
    }).then(jsonResp => {

        if (jsonResp.verReservaOK == true) {

            let arrayReservas = jsonResp.mensaje;

            document.querySelector("#div-principal").innerHTML = mostrarReservaAdmin(arrayReservas);


        } else {
            let parrafoErrorMostrarClientes = document.createElement("p");
            parrafoErrorMostrarClientes.textContent = jsonResp.mensaje;
            document.querySelector("#div-principal").appendChild(parrafoErrorMostrarClientes);
        }

    });

let objetoCambiar;

document.querySelector("#button-finalizar").addEventListener("click", function () {

    document.querySelector("#datos-finalizar").style.display = "flex";

    document.querySelector("#button-actualizar").addEventListener("click", function () {

        objetoCambiar = {
            email: document.querySelector("#email").value,
        };
        let fetchData = {
            method: "PUT",
            body: JSON.stringify(objetoCambiar),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
           
        }

        fetch("/admin/finalizar", fetchData)
            .then(response => {
                return response.json()
            }).then(jsonResp => {

                if (jsonResp.finalizarReservaOK == true) {


                    // document.querySelector("#datos-finalizar").style.display = "none";
                    let parrafoConfirm = document.createElement("p");
                    parrafoConfirm.textContent = jsonResp.mensaje;
                    document.querySelector("#div-principal").appendChild(parrafoConfirm);

                    location.href = "http://localhost:3000/admin.html"
                    // let parrafoConfirm2 = document.createElement("p");
                    // parrafoConfirm2.textContent = "¿Quieres finalizar otra reserva?";
                    // document.querySelector("#div-principal").appendChild(parrafoConfirm2);


                } else {
                    let parrafoErrorReserva = document.createElement("p");
                    parrafoErrorReserva.textContent = jsonResp.mensaje;
                    document.querySelector("#error-finalizar").appendChild = parrafoErrorReserva;
                }

            });
    })
});


function mostrarReservaAdmin(array) {

    let tabla = '<div><table class="tabla"><tr><th>EMAIL</th><th>COMENSALES</th><th>MESA</th><th>OPCIÓN VEGANA</th><th>INTOLERANCIAS</th><th>ESTADO</th></tr>';


    for (let i = 0; i < array.length; i++) {
        tabla = tabla +
            `<tr><td>${array[i].email}</td>
        <td>${array[i].numeroComensales}</td>
        <td>${array[i].numeroMesa}</td>
        <td>${array[i].vegano}</td>
        <td>${array[i].intolerancias}</td>
        <td>${array[i].estado}</td></tr>`
    }

    tabla = tabla + '</tr></table></div>';

    return tabla;
}



