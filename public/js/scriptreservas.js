//CLIENTE.POST LOGIN
let objetoLogin;

document.querySelector("#button-login").addEventListener("click", function () {

    objetoLogin = {
        email: document.querySelector("#email-login").value,
        password: document.querySelector("#password-login").value,
    };


    let fetchData = {
        method: "POST",
        body: JSON.stringify(objetoLogin),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
    }

    fetch("/clientes/login", fetchData)
        .then(response => {
            return response.json()
        }).then(jsonResp => {

            if (jsonResp.logInOK == true) {
                document.querySelector(".clientes-login").style.display = "none";
 
                document.querySelector("#mensaje-alta").innerHTML = `¡Gracias por acceder ${objetoLogin.email}! Ya puedes realizar tu reserva en Central Perk`

                document.querySelector(".clientes-reserva").style.display = "flex";

            } else {
                // let parrafoError = document.createElement("p");
                // parrafoError.textContent = jsonResp.mensaje;
                document.querySelector("#mensaje-error").innerHTML = jsonResp.mensaje;
            }

        });

});

//CLIENTE.POST RESERVA

let objetoReserva;

document.querySelector("#button-reserva").addEventListener("click", function () {

    objetoReserva = {
        email: document.querySelector("#email-login").value,
        tipo: document.querySelector("#select-interior-exterior").value,
        numeroComensales: document.querySelector("#numero-comensales").value,
        vegano: document.querySelector("#vegano").checked,
        intolerancias: document.querySelector("#intolerancia").value,
    };


    let fetchData = {
        method: "POST",
        body: JSON.stringify(objetoReserva),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
    }

    fetch("/reservas/nueva", fetchData)
        .then(response => {
            return response.json()
        }).then(jsonResp => {

            if (jsonResp.reservaOK == true) {  

                document.querySelector(".clientes-login").style.display = "none";
                document.querySelector(".clientes-reserva").style.display = "none";

                mostrarReserva();


            } else {
                let parrafoErrorReserva = document.createElement("p");
                parrafoErrorReserva.textContent =  jsonResp.mensaje;
                document.querySelector("#mensaje-error-reserva").appendChild(parrafoErrorReserva);
            }

        });

});


function mostrarReserva() {

    let parrafoEmail = document.createElement("p");
    parrafoEmail.textContent = `Gracias por realizar tu reserva, ${objetoReserva.email}`
    document.querySelector("#mensaje-reserva").appendChild(parrafoEmail);

    let parrafoAviso = document.createElement("p");
    parrafoAviso.textContent = "Estos son los datos para tu reserva de esta noche:"
    document.querySelector("#mensaje-reserva").appendChild(parrafoAviso);

    let parrafoComensales = document.createElement("p");
    parrafoComensales.textContent = `Número de comensales: ${objetoReserva.numeroComensales}`
    document.querySelector("#mensaje-reserva").appendChild(parrafoComensales);

    let parrafoTipo = document.createElement("p");
    parrafoTipo.textContent = `Mesa: ${objetoReserva.tipo}`
    document.querySelector("#mensaje-reserva").appendChild(parrafoTipo);

    if (objetoReserva.vegano.checked === true) {

        let parrafoVegano = document.createElement("p");
        parrafoVegano.textContent = "Opción vegana"
        document.querySelector("#mensaje-reserva").appendChild(parrafoVegano);
    }

    if (objetoReserva.intolerancias.value != " ") {
        let parrafoIntolerancias = document.createElement("p");
        parrafoIntolerancias.textContent = `Intolerancias: ${objetoReserva.intolerancias}`
        document.querySelector("#mensaje-reserva").appendChild(parrafoIntolerancias);
    }

}


