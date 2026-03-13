
var direccionesModel = require("../modelos/direccionesModel.js").direccionesModel
var direccionesController = {}

direccionesController.CargarTodas     = function(request, response){
    direccionesModel.CargarTodas({},function(respuesta){
        response.json(respuesta.data)
    })
}
direccionesController.CargarId        = function(request, response){

    var post = {
        id:request.params.id
    }

    if(post.id == undefined || post.id == null || post.id == ""){
        response.json({state:false, mensaje:"el campo id esobligatorio"})
        return false
    }

    direccionesModel.CargarId(post,function(respuesta){
        response.json(respuesta.data)
    })
}
direccionesController.Guardar         = function(request, response){
    var post = {
        usuarios_id:request.body.usuarios_id,
        destino:request.body.destino,
    }

    
    if(post.usuarios_id == undefined || post.usuarios_id == null || post.usuarios_id == ""){
        response.json({state:false, mensaje:"el campo usuarios_id es obligatorio"})
        return false
    }

    if(post.destino == undefined || post.destino == null || post.destino == ""){
        response.json({state:false, mensaje:"el campo destino es obligatorio"})
        return false
    }



    direccionesModel.Guardar(post, function(respuesta){
        
        if(respuesta.count == 1){
            response.json({state:true, mensaje:"Se Almaceno la direccion correctamente"})
            return false
        }
        else{
            response.json({state:false, mensaje:"Se Presento un error al almacenar"})
            return false
        }
    })

       
   



}
direccionesController.Actualizar      = function(request, response){


    var post = {
        id:request.body.id,
        destino:request.body.destino,

    }

    if(post.id == undefined || post.id == null || post.id == ""){
        response.json({state:false, mensaje:"el campo id es obligatorio"})
        return false
    }
    
    if(post.destino == undefined || post.destino == null || post.destino == ""){
        response.json({state:false, mensaje:"el campo destino es obligatorio"})
        return false
    }


    direccionesModel.Actualizar(post, function(respuesta){
        if(respuesta.rowsAffected == 1){
            response.json({state:true, mensaje:"Se actualizo correctemente la direccion"})
            return false
        }
        else{
            response.json({state:false, mensaje:"No Se pudo actualizar ya que posiblemente el id no existe"})
            return false
        }
    })



    
}
direccionesController.Eliminar        = function(request, response){

    
    var post = {
        id:request.body.id
    }

    if(post.id == undefined || post.id == null || post.id == ""){
        response.json({state:false, mensaje:"el campo id es obligatorio"})
        return false
    }
    

    direccionesModel.Eliminar(post, function(respuesta){
        if(respuesta.rowsAffected == 1){
            response.json({state:true, mensaje:"Se Elimino correctamente la direccion"})
            return false
        }
        else{
            response.json({state:false, mensaje:"posiblemente el id no existe u otro usuario ya elimino la direccion"})
            return false
        }
    })
    
}




module.exports.direccionesController = direccionesController