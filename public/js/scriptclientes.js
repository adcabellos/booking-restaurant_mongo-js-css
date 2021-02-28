

//CLIENTE.POST ALTA


document.querySelector("#button-alta").addEventListener("click", function () {

    let nuevoCliente = {
        nombre: document.querySelector("#nombre").value,
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value,
    };

    let secondPasswordFormulario = document.querySelector("#secondpassword").value;
    let password = document.querySelector("#password").value;

    if (password === secondPasswordFormulario) {

        let fetchData = {
            method: "POST",
            body: JSON.stringify(nuevoCliente),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
        }

        fetch("/clientes/alta", fetchData)
        .then(response => {
            return response.json()
        }).then(jsonResp => {
            
                if (jsonResp.altaOK == true) {
                    document.querySelector(".clientes-alta").innerHTML = " ";
                    document.querySelector(".clientes-alta").style.display = "none";

                    let parrafoAlta = document.createElement("p");
                    parrafoAlta.textContent = jsonResp.mensaje;
                    document.querySelector("#mensaje-alta").appendChild(parrafoAlta);

                    let a = document.createElement ("a");
                    a.textContent = "¿Te animas a hacer una reserva?"
                    a.href = "http://localhost:3000/reservas.html";
                    document.querySelector("#mensaje-alta-2").appendChild(a);
                
                } else {
                    // let parrafoErrorAlta = document.createElement("p");
                    // parrafoErrorAlta.textContent =  jsonResp.mensaje;
                    document.querySelector("#error-contraseña").innerHTML= jsonResp.mensaje;
                }



            });

    } else {
      
        document.querySelector("#error-contraseña").innerHTML = "ERROR. Las contraseñas no coinciden";
    }

});


