
var ventasModel = require("../modelos/ventasModel.js").ventasModel
var ventasController = {}

ventasController.CargarTodas     = function(request, response){
    ventasModel.CargarTodas({},function(respuesta){
        response.json(respuesta.data)
    })
}
ventasController.CargarId        = function(request, response){

    var post = {
        id:request.params.id
    }

    if(post.id == undefined || post.id == null || post.id == ""){
        response.json({state:false, mensaje:"el campo id es obligatorio"})
        return false
    }

    ventasModel.CargarId(post,function(respuesta){
        response.json(respuesta.data)
    })
}
ventasController.Guardar         = function(request, response){
    var post = {
        usuarios_id:request.body.usuarios_id,
        direcciones_id:request.body.direcciones_id,
        vendedor_usuarios_id:request.body.vendedor_usuarios_id,
    }

    
    if(post.usuarios_id == undefined || post.usuarios_id == null || post.usuarios_id == ""){
        response.json({state:false, mensaje:"el campo usuarios_id es obligatorio"})
        return false
    }

    if(post.direcciones_id == undefined || post.direcciones_id == null || post.direcciones_id == ""){
        response.json({state:false, mensaje:"el campo direcciones_id es obligatorio"})
        return false
    }

    if(post.vendedor_usuarios_id == undefined || post.vendedor_usuarios_id == null || post.vendedor_usuarios_id == ""){
        response.json({state:false, mensaje:"el campo vendedor_usuarios_id es obligatorio"})
        return false
    }



    ventasModel.Guardar(post, function(respuesta){
        
        if(respuesta.count == 1){
            response.json({state:true, mensaje:"Se Almaceno La Cabecera de la factura correctamente"})
            return false
        }
        else{
            response.json({state:false, mensaje:"Se Presento un error al almacenar"})
            return false
        }
    })





}
ventasController.Actualizar      = function(request, response){


    var post = {
        id:request.body.id,
        direcciones_id:request.body.direcciones_id,
    }

    if(post.id == undefined || post.id == null || post.id == ""){
        response.json({state:false, mensaje:"el campo id es obligatorio"})
        return false
    }
    
    if(post.direcciones_id == undefined || post.direcciones_id == null || post.direcciones_id == ""){
        response.json({state:false, mensaje:"el campo direcciones_id es obligatorio"})
        return false
    }

  
    ventasModel.Actualizar(post, function(respuesta){
        if(respuesta.rowsAffected == 1){
            response.json({state:true, mensaje:"Se actualizo correctemente La cabecera de la factura"})
            return false
        }
        else{
            response.json({state:false, mensaje:"No Se pudo actualizar ya que posiblemente el id no existe"})
            return false
        }
    })



    
}
ventasController.Anular        = function(request, response){

    
    var post = {
        ventas_id:request.body.ventas_id,
    }

    if(post.ventas_id == undefined || post.ventas_id == null || post.ventas_id == ""){
        response.json({state:false, mensaje:"el campo ventas_id es obligatorio"})
        return false
    }
    

    ventasModel.Anular(post, function(respuesta){
        if(respuesta.rowsAffected == 1){
            response.json({state:true, mensaje:"Se Anula correctamente La Factura"})
            return false
        }
        else{
            response.json({state:false, mensaje:"la factura ya anulada o en prefactura "})
            return false
        }
    })
    
}


ventasController.Liquidar        = function(request, response){
  
    var post = {
        ventas_id:request.body.ventas_id,
    }

    if(post.ventas_id == undefined || post.ventas_id == null || post.ventas_id == ""){
        response.json({state:false, mensaje:"el campo ventas_id es obligatorio"})
        return false
    }

    
    ventasModel.GenerarFv(post,function(respuesta){
       post.factura = respuesta.factura
       post.total = respuesta.total
       ventasModel.ActualizarVentas(post, function(actualizado){
           
        if(actualizado.rowsAffected == 1){
              response.json({state:true, mensaje:"Factura Liquidada Correctamente"})
              return false
            }
            else{
                response.json({state:true, mensaje:"La factura Ya se encuentra Liquidada"})
                return false
            }
       }) 
      
       
    })
    
    
}





module.exports.ventasController = ventasController