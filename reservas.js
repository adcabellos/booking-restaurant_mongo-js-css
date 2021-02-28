const express = require('express'); //llamamos a express
const router = express.Router(); //declaramos la constante router, con la que operaremos en las páginas. más abajo la exportamos a la página principal con el module.exports
router.use(express.urlencoded({ extended: false })); //recoger archivos encoded del body
router.use(express.json()); //recoger archivos de tipo put


router.post("/nueva", function (req, res) {

    let dbConnection = req.app.locals.db;
    let reservas = dbConnection.collection('reservas')
    let clientes = dbConnection.collection('clientes');
    let mesas = dbConnection.collection('mesas');

    let emailCliente = req.body.email;
    let tipoMesa = req.body.tipo;
    let numeroComensales = req.body.numeroComensales;
    let vegano = req.body.vegano;
    let intolerancias = req.body.intolerancias;
    let estado = "activa";

    reservas.find({ email: emailCliente, estado: "activa" }).toArray(function (err, responseEmail) {
        if (responseEmail.length > 0) {

            res.json({ reservaOK: false, mensaje: `Lo sentimos. ${emailCliente} ya tiene una reserva en Central Perk esta noche` });
        } else {

            //buscamos por mesa interior/exterior
            mesas.find({ tipo: tipoMesa, estado: "libre" }).toArray(function (err, responseMesa) {

                if (responseMesa.length > 0) {

                    mesas.updateOne({ numero: responseMesa[0].numero }, { $set: { estado: "ocupada" } });
                    reservas.insertOne({
                        email: emailCliente,
                        tipo: tipoMesa,
                        numeroMesa: responseMesa[0].numero,
                        numeroComensales: numeroComensales,
                        vegano: vegano,
                        intolerancias: intolerancias,
                        estado: estado
                    });
                    res.json({ reservaOK: true, mensaje: '¡Gracias por reservar en Central Perk!' });

                } else {
                    res.json({ reservaOK: false, mensaje: `No hay mesas disponibles en ${tipoMesa}` });
                }
            })
        }

    });

})

module.exports = router;

























module.exports = router;