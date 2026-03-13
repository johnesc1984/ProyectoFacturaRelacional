var direccionesModel = {}


direccionesModel.CargarTodas     = function(post, callback){

    var query = "select direcciones_id, destino from direcciones ORDER BY direcciones_id"
    proyecto.Query(query, (res) => {
        return callback(res)
    })

}
direccionesModel.CargarId        = function(post, callback){

    var query =  { text: "select direcciones_id, destino  from direcciones where direcciones_id = $1", values: [post.id]}
    proyecto.Query(query, (res) => {
        return callback(res)
    })

}

direccionesModel.Guardar         = function(post, callback){
    
    var query = { text: "INSERT INTO direcciones (usuarios_id, destino ) VALUES ($1,$2) RETURNING direcciones_id", 
                  values: [post.usuarios_id, post.destino]
                }
    proyecto.Query(query, (res) => {
        return callback(res)
    })

}
direccionesModel.Actualizar      = function(post, callback){

      
    var query = { text: "UPDATE direcciones SET destino = $1 WHERE direcciones_id = $2", 
                  values: [post.destino, parseInt(post.id) ]
                }
    proyecto.Query(query, (res) => {
        return callback(res)
    })

    
}
direccionesModel.Eliminar        = function(post, callback){

    var query = { text: "DELETE FROM direcciones WHERE direcciones_id = $1", 
                values: [parseInt(post.id) ]
            }
    proyecto.Query(query, (res) => {
        return callback(res)
    })
    
}


module.exports.direccionesModel = direccionesModel