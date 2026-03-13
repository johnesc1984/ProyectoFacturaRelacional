
var productosController = require("./api/controladores/productosController.js").productosController


app.get("/productos/CargarTodas", function(request, response){
    productosController.CargarTodas(request, response)
})

app.get("/productos/CargarId/:id", function(request, response){
     productosController.CargarId(request, response)
})

app.post("/productos/Guardar", function(request, response){
     productosController.Guardar(request, response)
})

app.put("/productos/Actualizar", function(request, response){
     productosController.Actualizar(request, response)
})

app.delete("/productos/Eliminar", function(request, response){
     productosController.Eliminar(request, response)
})




var usuariosController = require("./api/controladores/usuariosController.js").usuariosController


app.get("/usuarios/CargarTodas", function(request, response){
    usuariosController.CargarTodas(request, response)
})
app.get("/usuarios/CargarId/:id", function(request, response){
     usuariosController.CargarId(request, response)
})
app.post("/usuarios/Guardar", function(request, response){
     usuariosController.Guardar(request, response)
})
app.put("/usuarios/Actualizar", function(request, response){
     usuariosController.Actualizar(request, response)
})
app.delete("/usuarios/Eliminar", function(request, response){
     usuariosController.Eliminar(request, response)
})



var direccionesController = require("./api/controladores/direccionesController.js").direccionesController


app.get("/direcciones/CargarTodas", function(request, response){
    direccionesController.CargarTodas(request, response)
})
app.get("/direcciones/CargarId/:id", function(request, response){
     direccionesController.CargarId(request, response)
})
app.post("/direcciones/Guardar", function(request, response){
     direccionesController.Guardar(request, response)
})
app.put("/direcciones/Actualizar", function(request, response){
     direccionesController.Actualizar(request, response)
})
app.delete("/direcciones/Eliminar", function(request, response){
     direccionesController.Eliminar(request, response)
})




var ventasController = require("./api/controladores/ventasController.js").ventasController


app.get("/ventas/CargarTodas", function(request, response){
    ventasController.CargarTodas(request, response)
})
app.get("/ventas/CargarId/:id", function(request, response){
     ventasController.CargarId(request, response)
})
app.post("/ventas/Guardar", function(request, response){
     ventasController.Guardar(request, response)
})
app.put("/ventas/Actualizar", function(request, response){
     ventasController.Actualizar(request, response)
})
app.put("/ventas/Anular", function(request, response){
     ventasController.Anular(request, response)
})
app.post("/ventas/Liquidar", function(request, response){
     ventasController.Liquidar(request, response)
})





var detalleventasController = require("./api/controladores/detalleventasController.js").detalleventasController

app.get("/detalleventas/CargarTodas/:ventas_id", function(request, response){
    detalleventasController.CargarTodas(request, response)
})
app.get("/detalleventas/CargarId/:id", function(request, response){
     detalleventasController.CargarId(request, response)
})
app.post("/detalleventas/Guardar", function(request, response){
     detalleventasController.Guardar(request, response)
})
app.put("/detalleventas/Actualizar", function(request, response){
     detalleventasController.Actualizar(request, response)
})
app.delete("/detalleventas/Eliminar", function(request, response){
     detalleventasController.Eliminar(request, response)
})

