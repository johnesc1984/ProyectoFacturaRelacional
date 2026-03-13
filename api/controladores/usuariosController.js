
var usuariosModel = require("../modelos/usuariosModel.js").usuariosModel
var usuariosController = {}

usuariosController.CargarTodas     = function(request, response){
    usuariosModel.CargarTodas({},function(respuesta){
        response.json(respuesta.data)
    })
}
usuariosController.CargarId        = function(request, response){

    var post = {
        id:request.params.id
    }

    if(post.id == undefined || post.id == null || post.id == ""){
        response.json({state:false, mensaje:"el campo id esobligatorio"})
        return false
    }

    usuariosModel.CargarId(post,function(respuesta){
        response.json(respuesta.data)
    })
}
usuariosController.Guardar         = function(request, response){
    var post = {
        nombre:request.body.nombre,
        email:request.body.email,
        password:request.body.password,
    }

    
    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje:"el campo nombre es obligatorio"})
        return false
    }

    if(post.email == undefined || post.email == null || post.email == ""){
        response.json({state:false, mensaje:"el campo email es obligatorio"})
        return false
    }

    if(post.password == undefined || post.password == null || post.password == ""){
        response.json({state:false, mensaje:"el campo password es obligatorio"})
        return false
    }


    usuariosModel.BuscarEmail(post, function(existe){
        if(existe.count == 0){
            usuariosModel.Guardar(post, function(respuesta){
                
                if(respuesta.count == 1){
                    response.json({state:true, mensaje:"Se Almaceno el usuario correctamente"})
                    return false
                }
                else{
                    response.json({state:false, mensaje:"Se Presento un error al almacenar"})
                    return false
                }
            })

        }
        else{
            response.json({state:false, mensaje:"el email ya existe intente con otro"})
            return false
        }
    })



}
usuariosController.Actualizar      = function(request, response){


    var post = {
        id:request.body.id,
        nombre:request.body.nombre,

    }

    if(post.id == undefined || post.id == null || post.id == ""){
        response.json({state:false, mensaje:"el campo id es obligatorio"})
        return false
    }
    
    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje:"el campo nombre es obligatorio"})
        return false
    }


    usuariosModel.Actualizar(post, function(respuesta){
        if(respuesta.rowsAffected == 1){
            response.json({state:true, mensaje:"Se actualizo correctemente el usuario"})
            return false
        }
        else{
            response.json({state:false, mensaje:"No Se pudo actualizar ya que posiblemente el id no existe"})
            return false
        }
    })



    
}
usuariosController.Eliminar        = function(request, response){

    
    var post = {
        id:request.body.id
    }

    if(post.id == undefined || post.id == null || post.id == ""){
        response.json({state:false, mensaje:"el campo id es obligatorio"})
        return false
    }
    

    usuariosModel.Eliminar(post, function(respuesta){
        if(respuesta.rowsAffected == 1){
            response.json({state:true, mensaje:"Se Elimino correctamente el usuario"})
            return false
        }
        else{
            response.json({state:false, mensaje:"posiblemente el id no existe u otro usuario ya elimino el usuario"})
            return false
        }
    })
    
}




module.exports.usuariosController = usuariosController