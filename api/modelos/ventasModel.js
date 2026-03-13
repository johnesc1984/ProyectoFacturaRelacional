var ventasModel = {}


ventasModel.CargarTodas     = function(post, callback){

    var query = "select " +
    " cli.nombre as cliente, " +
    " d.destino as direcciondestino, " +
    " vendedor.nombre as facturador, " +
    " total, " +
    " nrofactura," +
    " CASE" +
    " WHEN estado = 0 THEN 'PreFactura'" +
    " WHEN estado = 1 THEN 'Liquidado'" +
    " WHEN estado = 2 THEN 'Anulado'" +
    " END AS estadoreal," +
    " estado," +
    " ventas_id," +
    " v.usuarios_id," +
    " v.direcciones_id, " +
    " vendedor_usuarios_id" +
    " from ventas as v" +
    " inner join usuarios as cli on cli.usuarios_id = v.usuarios_id" +
    " inner join direcciones as d on d.direcciones_id = v.direcciones_id" +
    " inner join usuarios as vendedor on vendedor.usuarios_id = v.vendedor_usuarios_id" 


    proyecto.Query(query, (res) => {
        return callback(res)
    })

}
ventasModel.CargarId        = function(post, callback){

    var query =  { text: "select " +
    " cli.nombre as cliente, " +
    " d.destino as direcciondestino, " +
    " vendedor.nombre as facturador, " +
    " total, " +
    " nrofactura," +
    " CASE" +
    " WHEN estado = 0 THEN 'PreFactura'" +
    " WHEN estado = 1 THEN 'Liquidado'" +
    " WHEN estado = 2 THEN 'Anulado'" +
    " END AS estadoreal," +
    " estado," +
    " ventas_id," +
    " v.usuarios_id," +
    " v.direcciones_id, " +
    " vendedor_usuarios_id" +
    " from ventas as v" +
    " inner join usuarios as cli on cli.usuarios_id = v.usuarios_id" +
    " inner join direcciones as d on d.direcciones_id = v.direcciones_id" +
    " inner join usuarios as vendedor on vendedor.usuarios_id = v.vendedor_usuarios_id where ventas_id = $1 " , values: [post.id]}
    proyecto.Query(query, (res) => {
        return callback(res)
    })

}

ventasModel.Guardar         = function(post, callback){
    
    var query = { text: "INSERT INTO ventas (usuarios_id,direcciones_id, total, nrofactura, vendedor_usuarios_id ) " +
                        " VALUES ($1,$2,$3,$4,$5) RETURNING ventas_id", 
                  values: [parseInt(post.usuarios_id),parseInt(post.direcciones_id),0,'', parseFloat(post.vendedor_usuarios_id)]
                }
    proyecto.Query(query, (res) => {
        return callback(res)
    })

}
ventasModel.Actualizar      = function(post, callback){

      
    var query = { text: "UPDATE ventas SET direcciones_id = $1 WHERE ventas_id = $2", 
                  values: [parseFloat(post.direcciones_id), parseInt(post.id) ]
                }
    proyecto.Query(query, (res) => {
        return callback(res)
    })

    
}
ventasModel.Anular        = function(post, callback){

    var query = { text: "UPDATE ventas SET estado = 2 WHERE estado = 1 and ventas_id = $1", 
                values: [parseInt(post.ventas_id)]
            }
    proyecto.Query(query, (res) => {
        return callback(res)
    })
    
}

ventasModel.GenerarFv     = async function(post, callback){


    await proyecto.Transaction(async (client) => {
        const a = await client.query( "SELECT prefijo || LPAD(numero::text, 7, '0') AS factura FROM consecutivos" )
        const b = await client.query( "UPDATE consecutivos SET numero = numero + 1" )
        const c = await client.query( "select sum(cantidad * precio) as total from detalleventas where ventas_id = "+ parseInt(post.ventas_id) +"" )

        return callback({factura:a.rows[0].factura,total:c.rows[0].total})
    })

}

ventasModel.ActualizarVentas        = function(post, callback){

    var query = { text: "UPDATE ventas SET estado = 1,total = $1, nrofactura = $2  WHERE estado = 0  and ventas_id = $3", 
                  values: [parseFloat(post.total),post.factura, parseInt(post.ventas_id)]    }
    proyecto.Query(query, (res) => {
        return callback(res)
    })
    
}




module.exports.ventasModel = ventasModel