var usuariosModel = {}


usuariosModel.CargarTodas     = function(post, callback){

    var query = "select usuarios_id, email, nombre from usuarios ORDER BY usuarios_id"
    proyecto.Query(query, (res) => {
        return callback(res)
    })

}
usuariosModel.CargarId        = function(post, callback){

    var query =  { text: "select usuarios_id, email, nombre  from usuarios where usuarios_id = $1", values: [post.id]}
    proyecto.Query(query, (res) => {
        return callback(res)
    })

}
usuariosModel.BuscarEmail    = function(post, callback){

    var query = { text: "select nombre from usuarios  where email = $1", values: [post.email] }
    proyecto.Query(query, (res) => {
        return callback(res)
    })

}
usuariosModel.Guardar         = function(post, callback){
    
    var query = { text: "INSERT INTO usuarios (email, nombre, password ) VALUES ($1,$2,$3) RETURNING usuarios_id", 
                  values: [post.email, post.nombre,post.password]
                }
    proyecto.Query(query, (res) => {
        return callback(res)
    })

}
usuariosModel.Actualizar      = function(post, callback){

      
    var query = { text: "UPDATE usuarios SET nombre = $1 WHERE usuarios_id = $2", 
                  values: [post.nombre, parseInt(post.id) ]
                }
    proyecto.Query(query, (res) => {
        return callback(res)
    })

    
}
usuariosModel.Eliminar        = function(post, callback){

    var query = { text: "DELETE FROM usuarios WHERE usuarios_id = $1", 
                values: [parseInt(post.id) ]
            }
    proyecto.Query(query, (res) => {
        return callback(res)
    })
    
}


module.exports.usuariosModel = usuariosModel