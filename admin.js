const express = require('express'); //llamamos a express
const router = express.Router(); //declaramos la constante router, con la que operaremos en las páginas. más abajo la exportamos a la página principal con el module.exports
router.use(express.urlencoded({ extended: false })); //recoger archivos encoded del body
router.use(express.json()); //recoger archivos de tipo put
router.use(express.static('public')); //ir a los archivos estáticos





//1.GET INFOCLIENTES

router.get("/inforeservas", function (req, res) {
    let dbConnection = req.app.locals.db; //accedemos a nuestra BBDD guardada en el index 
    dbConnection.collection('reservas').find({ estado: "activa" }).toArray(function (err, arrayReservas) {
        if (err != null) {
            res.json({ verReservaOK: false, mensaje: "Ha habido un error" });
        } else {
            if (arrayReservas.length > 0) {
                res.json({ verReservaOK: true, mensaje: arrayReservas });
            } else {
                res.json({ verReservaOK: false, mensaje: "Todavía no tienes clientes registrados" })
            }

        }
    });
});

router.put("/finalizar", function (req, res) {
    let dbConnection = req.app.locals.db;
    let reservas = dbConnection.collection('reservas')
    let mesas = dbConnection.collection('mesas');

    let emailCambiar = req.body.email;

    let estadoReserva = "finalizada"
    let estadoMesa = "libre"

    reservas.find({ email: emailCambiar, estado: "activa" }).toArray(function (err, responseReserva) {

        if (responseReserva.length === 0) {

            res.json({ finalizarReservaOK: false, mensaje: `Lo sentimos. ${emailCambiar} no tiene una reserva en Central Perk esta noche` })

        } else {

            reservas.updateOne({ email: emailCambiar,  estado: "activa" }, { $set: { estado: estadoReserva } }, function () {
                mesas.updateOne({ numero: responseReserva[0].numero, estado: "ocupada" }, { $set: { estado: estadoMesa } }, function () {
                    res.json({ finalizarReservaOK: true, mensaje: `La reserva de ${emailCambiar} ha finalizado` })
                });
            });

        }
    })
})

module.exports = router;