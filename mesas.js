const express = require('express'); //llamamos a express
const bcrypt = require("bcrypt");
const router = express.Router(); //declaramos la constante router, con la que operaremos en las páginas. más abajo la exportamos a la página principal con el module.exports
router.use(express.urlencoded({ extended: false })); //recoger archivos encoded del body
router.use(express.json()); //recoger archivos de tipo put
router.use(express.static('public')); //ir a los archivos estáticos




module.exports = router;