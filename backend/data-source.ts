import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();
import { Empleado } from './src/empleados/entities/empleado.entity'; 
import { Cliente } from './src/clientes/entities/cliente.entity'; 
import { AjusteInventario } from './src/ajustes_inventario/entities/ajuste_inventario.entity';
import { Producto } from './src/productos/entities/producto.entity';
import { SolicitudProducto } from './src/productos/entities/solicitud_producto.entity';
import { ProductosSinStock } from './src/productos_sin_stock/entities/productos_sin_stock.entity';
// ReservasVentaInventario and MovimientoInventarioLogistica removed — not part of core inventory

const useSSL = (process.env.POSTGRES_SSL === 'true') || (process.env.NODE_ENV === 'production');

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    schema: 'Inventario',
    entities: [AjusteInventario, Cliente, Empleado, Producto, SolicitudProducto, ProductosSinStock],

    migrations: [
        process.env.NODE_ENV === 'production'
            ? 'dist/db/migrations/*.js'
            : 'src/db/migrations/*.ts',
    ],

    // When not using SSL, avoid passing ssl:false which in some setups
    // can cause the driver to still attempt negotiation; use `undefined`
    // to ensure no SSL is requested. Only enable SSL when explicitly
    // requested via POSTGRES_SSL or in production.
    ssl: useSSL ? { rejectUnauthorized: false } : undefined,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;