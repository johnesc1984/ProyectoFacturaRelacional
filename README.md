# Instalación
```
npm install
```
## Testeado
- Node Version 20.12.2
---
# Tecnologías utilizadas

-   Node.js
-   Express
-   PostgreSQL
-   body-parser
-   libpostgresbridge
---

# Endpoints de la API
#### Productos
#### Obtener todos los productos
    GET /productos/CargarTodas
#### Obtener producto por ID
    GET /productos/CargarId/:id
Parámetro:
    id : ID del producto
#### Crear producto
    POST /productos/Guardar
Body ejemplo:
``` json
{
  "nombre": "Producto 1",
  "precio": 1000
}
```
#### Actualizar producto
    PUT /productos/Actualizar
#### Eliminar producto
    DELETE /productos/Eliminar
------------------------------------------------------------------------

#### Usuarios
#### Obtener todos los usuarios
    GET /usuarios/CargarTodas
#### Obtener usuario por ID
    GET /usuarios/CargarId/:id
#### Crear usuario
    POST /usuarios/Guardar
#### Actualizar usuario
    PUT /usuarios/Actualizar
#### Eliminar usuario
    DELETE /usuarios/Eliminar
------------------------------------------------------------------------

#### Direcciones
#### Obtener todas las direcciones
    GET /direcciones/CargarTodas
#### Obtener dirección por ID
    GET /direcciones/CargarId/:id
#### Crear dirección
    POST /direcciones/Guardar
#### Actualizar dirección
    PUT /direcciones/Actualizar
#### Eliminar dirección
    DELETE /direcciones/Eliminar
------------------------------------------------------------------------

#### Ventas
#### Obtener todas las ventas
    GET /ventas/CargarTodas
#### Obtener venta por ID
    GET /ventas/CargarId/:id
#### Crear venta
    POST /ventas/Guardar
#### Actualizar venta
    PUT /ventas/Actualizar
#### Anular venta
    PUT /ventas/Anular
#### Liquidar venta
    POST /ventas/Liquidar
------------------------------------------------------------------------

#### Detalle de Ventas
#### Obtener detalles de una venta
    GET /detalleventas/CargarTodas/:ventas_id
Parámetro:
    ventas_id : ID de la venta
#### Obtener detalle por ID
    GET /detalleventas/CargarId/:id
#### Crear detalle
    POST /detalleventas/Guardar
#### Actualizar detalle
    PUT /detalleventas/Actualizar
#### Eliminar detalle
    DELETE /detalleventas/Eliminar

------------------------------------------------------------------------


### Base de Datos PostrgreSql
```sql

-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'usuarios'
-- 
-- ---

DROP TABLE IF EXISTS usuarios;
		
CREATE TABLE usuarios (
  usuarios_id serial,
  nombre VARCHAR(150) NULL DEFAULT NULL,
  email VARCHAR(150) NULL DEFAULT NULL,
  password VARCHAR(150) NULL DEFAULT NULL,
  PRIMARY KEY (usuarios_id)
);

-- ---
-- Table 'tareas'
-- 
-- ---

DROP TABLE IF EXISTS tareas;
		
CREATE TABLE tareas (
  tareas_id serial,
  usuarios_id INTEGER NULL DEFAULT NULL,
  descripcion VARCHAR(500) NULL DEFAULT NULL,
  estado INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (tareas_id)
);

-- ---
-- Table 'direcciones'
-- 
-- ---

DROP TABLE IF EXISTS direcciones;
		
CREATE TABLE direcciones (
  direcciones_id serial,
  usuarios_id INTEGER NULL DEFAULT NULL,
  destino VARCHAR(200) NULL DEFAULT NULL,
  PRIMARY KEY (direcciones_id)
);

-- ---
-- Table 'ventas'
-- 
-- ---

DROP TABLE IF EXISTS ventas;
		
CREATE TABLE ventas (
  ventas_id serial,
  usuarios_id INTEGER NULL DEFAULT NULL,
  direcciones_id INTEGER NULL DEFAULT NULL,
  total INTEGER NULL DEFAULT NULL,
  nrofactura VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (ventas_id)
);

-- ---
-- Table 'detalleventas'
-- 
-- ---

DROP TABLE IF EXISTS detalleventas;
		
CREATE TABLE detalleventas (
  detalleventas_id serial,
  ventas_id INTEGER NULL DEFAULT NULL,
  productos_id INTEGER NULL DEFAULT NULL,
  cantidad INTEGER NULL DEFAULT NULL,
  precio INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (detalleventas_id)
);

-- ---
-- Table 'productos'
-- 
-- ---

DROP TABLE IF EXISTS productos;
		
CREATE TABLE productos (
  productos_id serial,
  codigo INTEGER NULL DEFAULT NULL,
  nombre VARCHAR(300) NULL DEFAULT NULL,
  imagen INTEGER NULL DEFAULT NULL,
  precio INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (productos_id)
);

-- ---
-- Table Consecutivos
-- ---

DROP TABLE IF EXISTS consecutivos;

CREATE TABLE consecutivos
(
  consecutivos_id serial,
  prefijo VARCHAR(4) NULL DEFAULT NULL,
  numero INTEGER NULL DEFAULT NULL,
  estado INTEGER NULL DEFAULT NULL,
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE tareas ADD FOREIGN KEY (usuarios_id) REFERENCES usuarios (usuarios_id);
ALTER TABLE direcciones ADD FOREIGN KEY (usuarios_id) REFERENCES usuarios (usuarios_id);
ALTER TABLE ventas ADD FOREIGN KEY (usuarios_id) REFERENCES usuarios (usuarios_id);
ALTER TABLE ventas ADD FOREIGN KEY (direcciones_id) REFERENCES direcciones (direcciones_id);
ALTER TABLE detalleventas ADD FOREIGN KEY (ventas_id) REFERENCES ventas (ventas_id);
ALTER TABLE detalleventas ADD FOREIGN KEY (productos_id) REFERENCES productos (productos_id);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE usuarios ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE tareas ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE direcciones ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE ventas ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE detalleventas ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE productos ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

```

