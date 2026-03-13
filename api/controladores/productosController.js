
var productosModel = require("../modelos/productosModel.js").productosModel
var productosController = {}

productosController.CargarTodas     = function(request, response){
    productosModel.CargarTodas({},function(respuesta){
        response.json(respuesta.data)
    })
}
productosController.CargarId        = function(request, response){

    var post = {
        id:request.params.id
    }

    if(post.id == undefined || post.id == null || post.id == ""){
        response.json({state:false, mensaje:"elcampo id esobligatorio"})
        return false
    }

    productosModel.CargarId(post,function(respuesta){
        response.json(respuesta.data)
    })
}
productosController.Guardar         = function(request, response){
    var post = {
        nombre:request.body.nombre,
        codigo:request.body.codigo,
        precio:request.body.precio,
    }

    
    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje:"el campo nombre es obligatorio"})
        return false
    }

    if(post.codigo == undefined || post.codigo == null || post.codigo == ""){
        response.json({state:false, mensaje:"el campo codigo es obligatorio"})
        return false
    }

    if(post.precio == undefined || post.precio == null || post.precio == ""){
        response.json({state:false, mensaje:"el campo precio es obligatorio"})
        return false
    }


    productosModel.BuscarCodigo(post, function(existe){
        if(existe.count == 0){
            productosModel.Guardar(post, function(respuesta){
                
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
            response.json({state:false, mensaje:"el codigo de producto ya existe intente con otro"})
            return false
        }
    })



}
productosController.Actualizar      = function(request, response){


    var post = {
        id:request.body.id,
        nombre:request.body.nombre,
        precio:request.body.precio
    }

    if(post.id == undefined || post.id == null || post.id == ""){
        response.json({state:false, mensaje:"el campo id es obligatorio"})
        return false
    }
    
    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje:"el campo nombre es obligatorio"})
        return false
    }

    if(post.precio == undefined || post.precio == null || post.precio == ""){
        response.json({state:false, mensaje:"el campo precio es obligatorio"})
        return false
    }

    productosModel.Actualizar(post, function(respuesta){
        if(respuesta.rowsAffected == 1){
            response.json({state:true, mensaje:"Se actualizo correctemente el producto"})
            return false
        }
        else{
            response.json({state:false, mensaje:"No Se pudo actualizar ya que posiblemente el id no existe"})
            return false
        }
    })



    
}
productosController.Eliminar        = function(request, response){

    
    var post = {
        id:request.body.id
    }

    if(post.id == undefined || post.id == null || post.id == ""){
        response.json({state:false, mensaje:"el campo id es obligatorio"})
        return false
    }
    

    productosModel.Eliminar(post, function(respuesta){
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




module.exports.productosController = productosController