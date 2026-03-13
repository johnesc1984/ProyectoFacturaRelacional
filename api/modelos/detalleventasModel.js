var detalleventasModel = {}


detalleventasModel.CargarTodas     = function(post, callback){

    var query = "select detalleventas_id, ventas_id, productos_id, cantidad, precio from detalleventas where ventas_id = "+ post.ventas_id 
    proyecto.Query(query, (res) => {
        return callback(res)
    })

}
detalleventasModel.CargarId        = function(post, callback){

    var query =  { text: "select detalleventas_id, ventas_id, productos_id, cantidad, precio from detalleventas where detalleventas_id = $1", values: [post.id]}
    proyecto.Query(query, (res) => {
        return callback(res)
    })

}
detalleventasModel.BuscarIdProducto    = function(post, callback){

    var query = { text: "select precio from detalleventas  where productos_id = $1 and ventas_id = $2" , values: [post.productos_id, post.ventas_id] }
    proyecto.Query(query, (res) => {
        return callback(res)
    })

}
detalleventasModel.Guardar         = function(post, callback){
    
    var query = { text: "INSERT INTO detalleventas (ventas_id, productos_id, cantidad, precio) VALUES ($1,$2,$3,$4) RETURNING detalleventas_id", 
                  values: [parseInt(post.ventas_id),parseInt(post.productos_id),parseInt(post.cantidad),parseFloat(post.precio)]
                }
    proyecto.Query(query, (res) => {
        return callback(res)
    })

}
detalleventasModel.Actualizar      = function(post, callback){

      
    var query = { text: "UPDATE detalleventas SET cantidad = $1, precio = $2 WHERE detalleventas_id = $3", 
                  values: [parseInt(post.cantidad),parseFloat(post.precio), parseInt(post.id) ]
                }
    proyecto.Query(query, (res) => {
        return callback(res)
    })

    
}

detalleventasModel.ActualizarCantidad      = function(post, callback){

      
    var query = { text: "UPDATE detalleventas SET cantidad = cantidad + $1 WHERE productos_id = $2 and ventas_id = $3", 
                  values: [parseInt(post.cantidad), parseInt(post.productos_id), parseInt(post.ventas_id) ]
                }
    proyecto.Query(query, (res) => {
        return callback(res)
    })

    
}


detalleventasModel.Eliminar        = function(post, callback){

    var query = { text: "DELETE FROM detalleventas WHERE detalleventas_id = $1", 
                values: [parseInt(post.id) ]
            }
    proyecto.Query(query, (res) => {
        return callback(res)
    })
    
}


module.exports.detalleventasModel = detalleventasModel