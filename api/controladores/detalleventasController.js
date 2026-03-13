
var detalleventasModel = require("../modelos/detalleventasModel.js").detalleventasModel
var detalleventasController = {}

detalleventasController.CargarTodas     = function(request, response){
    var post = {
        ventas_id:request.params.ventas_id
    }
    detalleventasModel.CargarTodas(post,function(respuesta){
        response.json(respuesta.data)
    })
}
detalleventasController.CargarId        = function(request, response){

    var post = {
        id:request.params.id
    }

    if(post.id == undefined || post.id == null || post.id == ""){
        response.json({state:false, mensaje:"el campo id es obligatorio"})
        return false
    }

    detalleventasModel.CargarId(post,function(respuesta){
        response.json(respuesta.data)
    })
}
detalleventasController.Guardar         = function(request, response){
    var post = {
        ventas_id:request.body.ventas_id,
        productos_id:request.body.productos_id,
        cantidad:request.body.cantidad,
        precio:request.body.precio,
    }

    
    if(post.ventas_id == undefined || post.ventas_id == null || post.ventas_id == ""){
        response.json({state:false, mensaje:"el campo ventas_id es obligatorio"})
        return false
    }

    if(post.productos_id == undefined || post.productos_id == null || post.productos_id == ""){
        response.json({state:false, mensaje:"el campo productos_id es obligatorio"})
        return false
    }

    if(post.cantidad == undefined || post.cantidad == null || post.cantidad == ""){
        response.json({state:false, mensaje:"el campo cantidad es obligatorio"})
        return false
    }

    if(post.precio == undefined || post.precio == null || post.precio == ""){
        response.json({state:false, mensaje:"el campo precio es obligatorio"})
        return false
    }


    detalleventasModel.BuscarIdProducto(post, function(existe){
        if(existe.count == 0){
            detalleventasModel.Guardar(post, function(respuesta){
                
                if(respuesta.count == 1){
                    response.json({state:true, mensaje:"Se Almaceno el producto correctamente"})
                    return false
                }
                else{
                    response.json({state:false, mensaje:"Se Presento un error al almacenar"})
                    return false
                }
            })

        }
        else{
        
            //actualizar cantidad
             detalleventasModel.ActualizarCantidad(post, function(respuesta){
                
                if(respuesta.rowsAffected == 1){
                    response.json({state:true, mensaje:"Se Actualizo la cantidad del producto correctamente"})
                    return false
                }
                else{
                    response.json({state:false, mensaje:"Se Presento un error al actulizar la cantidad"})
                    return false
                }
            })


        }
    })



}
detalleventasController.Actualizar      = function(request, response){


    var post = {
        id:request.body.id,
        cantidad:request.body.cantidad,
        precio:request.body.precio
    }

    if(post.id == undefined || post.id == null || post.id == ""){
        response.json({state:false, mensaje:"el campo id es obligatorio"})
        return false
    }
    
    if(post.cantidad == undefined || post.cantidad == null || post.cantidad == ""){
        response.json({state:false, mensaje:"el campo cantidad es obligatorio"})
        return false
    }

    if(post.precio == undefined || post.precio == null || post.precio == ""){
        response.json({state:false, mensaje:"el campo precio es obligatorio"})
        return false
    }

    detalleventasModel.Actualizar(post, function(respuesta){
        if(respuesta.rowsAffected == 1){
            response.json({state:true, mensaje:"Se actualizo correctamente el producto"})
            return false
        }
        else{
            response.json({state:false, mensaje:"No Se pudo actualizar ya que posiblemente el id no existe"})
            return false
        }
    })



    
}
detalleventasController.Eliminar        = function(request, response){

    
    var post = {
        id:request.body.id
    }

    if(post.id == undefined || post.id == null || post.id == ""){
        response.json({state:false, mensaje:"el campo id es obligatorio"})
        return false
    }
    

    detalleventasModel.Eliminar(post, function(respuesta){
        if(respuesta.rowsAffected == 1){
            response.json({state:true, mensaje:"Se Elimino correctamente el producto"})
            return false
        }
        else{
            response.json({state:false, mensaje:"posiblemente el id no existe o otro usuario ya elimino el producto"})
            return false
        }
    })
    
}




module.exports.detalleventasController = detalleventasController