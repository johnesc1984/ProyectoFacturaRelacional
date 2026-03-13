var productosModel = {}


productosModel.CargarTodas     = function(post, callback){

    var query = "select productos_id, codigo, nombre, imagen, precio from productos"
    proyecto.Query(query, (res) => {
        return callback(res)
    })

}
productosModel.CargarId        = function(post, callback){

    var query =  { text: "select productos_id, codigo, nombre, imagen, precio from productos where productos_id = $1", values: [post.id]}
    proyecto.Query(query, (res) => {
        return callback(res)
    })

}
productosModel.BuscarCodigo    = function(post, callback){

    var query = { text: "select nombre from productos  where codigo = $1", values: [post.codigo] }
    proyecto.Query(query, (res) => {
        return callback(res)
    })

}
productosModel.Guardar         = function(post, callback){
    
    var query = { text: "INSERT INTO productos (codigo, nombre,imagen, precio) VALUES ($1,$2,$3,$4) RETURNING productos_id", 
                  values: [parseInt(post.codigo), post.nombre,'',parseFloat(post.precio)]
                }
    proyecto.Query(query, (res) => {
        return callback(res)
    })

}
productosModel.Actualizar      = function(post, callback){

      
    var query = { text: "UPDATE productos SET nombre = $1, precio = $2 WHERE productos_id = $3", 
                  values: [post.nombre,parseFloat(post.precio), parseInt(post.id) ]
                }
    proyecto.Query(query, (res) => {
        return callback(res)
    })

    
}
productosModel.Eliminar        = function(post, callback){

    var query = { text: "DELETE FROM productos WHERE productos_id = $1", 
                values: [parseInt(post.id) ]
            }
    proyecto.Query(query, (res) => {
        return callback(res)
    })
    
}


module.exports.productosModel = productosModel