import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();
// import { AjusteInventario } from './src/ajustes_inventario/entities/ajuste_inventario.entity'
import { Producto } from './src/productos/entities/producto.entity';
import { SolicitudProducto } from './src/productos/entities/solicitud_producto.entity';
import { ProductosSinStock } from './src/productos_sin_stock/entities/productos_sin_stock.entity';

const useSSL = (process.env.POSTGRES_SSL === 'true') || (process.env.NODE_ENV === 'production');

// Opciones del Data Source
export const dataSourceOptions: DataSourceOptions = {
    // Tipo de base de datos
    type: 'postgres',
    // Host de la base de datos
    host: 'localhost',
    // Puerto de la base de datos
    port: 5432,
    // Usuario de la base de datos
    username: 'postgres',
    // Password de la base de datos
    password: 'password',
    // Nombre de la base de datos
    database: 'inventario',
    // Entidades del sistema
    entities: [AjusteInventario, Producto, SolicitudProducto, ProductosSinStock],

    // Localizacion de las migraciones
    migrations: [
        'src/db/migrations/*.ts',
    ],

    // SSL desactivado
    ssl: false,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;