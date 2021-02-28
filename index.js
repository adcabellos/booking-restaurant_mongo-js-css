const express = require('express') //llamamos a express y lo guardamos en el const app
const mongodb = require('mongodb'); //llamamos a mongo
const bcrypt = require("bcrypt");


let clientes = require('./clientes'); //llamamos a nuestro js clientes, gracias al module exports = router 
let reservas = require('./reservas') ////llamamos a nuestro js reservas, gracias al module exports = router 
let admin = require('./admin') ////llamamos a nuestro js reservas, gracias al module exports = router 
let mesas = require('./mesas'); //llamamos a nuestro js clientes, gracias al module exports = router 

const app = express();


app.use('/clientes', clientes); //así estamos indicando que es el objeto router que hemos importado desde clientes.js el que se encargará de las peticiones a la ruta ‘/clientes.
app.use('/reservas', reservas); //la aplicacion manda la peticion a /reservas, y una vez allí ya es solo "/"
app.use('/admin', admin); //la aplicacion manda la peticion a /reservas, y una vez allí ya es solo "/"
app.use('/mesas', mesas); //la aplicacion manda la peticion a /reservas, y una vez allí ya es solo "/"


app.use(express.static('public')); //ir a los archivos estáticos
app.use(express.urlencoded({extended: false})); //recoger archivos encoded del body
app.use(express.json()); //recoger archivos de tipo put

let MongoClient = mongodb.MongoClient;  


//IMP. APP.LOCALS (OBJETO GLOBAL PARA ACCEDER A BBDD)

MongoClient.connect('mongodb://127.0.0.1:27017', function(err, client) {
    if(err !== null) { //si error no es igual a null, significa que sí hay error
        console.log(err);
    } else {
    app.locals.db = client.db('restauranteDB') //objeto global para compartir la BBDD con los routers       
}
});
app.listen(3000);