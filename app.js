const express = require('express');
global.app = express();
global.config = require("./config.js").config
const libpostgresbridge = require("libpostgresbridge")
const bodyParser = require("body-parser")
app.use(bodyParser.json({limit:'10mb'}))
app.use(bodyParser.urlencoded({extended:true, limit:'10mb' }))

global.proyecto = new libpostgresbridge(config.bd.proyecto);
global.salud = new libpostgresbridge({
  user: 'postgres',
  password: 'admin',
  host: '127.0.0.1',
  port: 5432,
  database: "Salud",
  ssl: false,
});


app.use(function(request, response, next){
    if(request.body == undefined){
        request.body = {}
    }
    next()
})

require("./routes.js")




// var query = "select " +
//     " ventas.ventas_id, " +
//     " ventas.total, " +
//     " ventas.nrofactura, " +
//     " usuarios.nombre, " +
//     " usuarios.email, " +
//     " direcciones.destino, " +
//     " dv.cantidad, " +
//     " dv.precio, " +
//     " (dv.precio * dv.cantidad) 	as precioporitem, " +
//     " p.codigo, " +
//     " p.nombre 					as nombreproducto, " +
//     " uv.nombre 					as nombrevendedor " +
//     " from ventas " +
//     " inner join usuarios 				on usuarios.usuarios_id 		= ventas.usuarios_id " +
//     " inner join direcciones 				on direcciones.direcciones_id 	= ventas.direcciones_id " +
//     " inner join detalleventas 	as dv	on dv.ventas_id 				= ventas.ventas_id " +
//     " inner join productos 		as p 	on p.productos_id 				= dv.productos_id " +
//     " inner join usuarios 		as uv 	on uv.usuarios_id 				= ventas.vendedor_usuarios_id " +
//     " where ventas.ventas_id = 1 " 



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

