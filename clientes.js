const express = require('express'); //llamamos a express
const bcrypt = require("bcrypt");
const router = express.Router(); //declaramos la constante router, con la que operaremos en las páginas. más abajo la exportamos a la página principal con el module.exports
router.use(express.urlencoded({ extended: false })); //recoger archivos encoded del body
router.use(express.json()); //recoger archivos de tipo put
router.use(express.static('public')); //ir a los archivos estáticos


//1. POST. ALTA CLIENTE

router.post("/alta", function (req, res) {

    let dbConnection = req.app.locals.db

    let nombreFormulario = req.body.nombre;
    let emailFormulario = req.body.email;
    let passwordFormulario = req.body.password;

    let contraseniaCifrada = bcrypt.hashSync(passwordFormulario, 10);
    let coincidencia = bcrypt.compareSync(passwordFormulario, contraseniaCifrada);

    dbConnection.collection("clientes").find({ email: emailFormulario }).toArray(function (err, response) {

        if (response.length > 0) {
            res.json ({altaOK: false, mensaje: `El usuario ${emailFormulario} ya existe`});

        } else {
            if (coincidencia) {
                dbConnection.collection("clientes").insertOne({ nombre: nombreFormulario, password: contraseniaCifrada, email: emailFormulario }, function (err, userUpdate) {
                    if (err !== null) {
                        res.json({altaOK: false, mensaje: `Ha habido un error`});
                    } else {
                        if (userUpdate.result.n > 0) {
                            res.json({altaOK: true, mensaje: `¡Enhorabuena! Hemos dado de alta a ${emailFormulario} en Central Perk`});
                        } else {
                            res.json({altaOK: false, mensaje:`El usuario no se ha podido crear`});
                        }
                    }
                })
            }
        }

    })

})



//1. POST. LOGIN CLIENTE


router.post("/login", function (req, res) {

    let dbConnection = req.app.locals.db

    let emailFormulario = req.body.email;
    let passwordFormulario = req.body.password;

    dbConnection.collection("clientes")
        .find({ email: emailFormulario })
        .toArray(function (err, arrayUsuario) {

            if (err !== null) {
                res.json({ logInOK: false, mensaje: "Ha habido un error" });
            } else {
                if (arrayUsuario.length > 0) {
                    if (bcrypt.compareSync(passwordFormulario, arrayUsuario[0].password)) {
                        res.json({ logInOK: true, mensaje: "Logueado correctamente" });
                    } else {
                        res.json({ logInOK: false, mensaje: "Contraseña incorrecta" });
                    }
                } else {
                    res.json({ logInOK: false, mensaje: "El usuario no existe" });
                }
            }
        });
});



module.exports = router;