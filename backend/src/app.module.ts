import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosModule } from './productos/productos.module';
import { EmpleadosModule } from './empleados/empleados.module';
import { ClientesModule } from './clientes/clientes.module';
import { AjustesInventarioModule } from './ajustes_inventario/ajustes_inventario.module';
import { ProductosSinStockModule } from './productos_sin_stock/productos_sin_stock.module';
// Módulos externos a inventario (ventas/compras/logística) removidos
import { SolicitudProductoModule } from './solicitud_producto/solicitud_producto.module';

@Module({
  imports: [ 
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    ((): any => {
      const useSSL = (process.env.POSTGRES_SSL === 'true') || (process.env.NODE_ENV === 'production');
      return TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT || '5432'),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        schema: 'Inventario',
        autoLoadEntities: true,
        ssl: useSSL ? { rejectUnauthorized: false } : undefined,
        synchronize: false,
      });
    })(),

    ProductosModule,
    EmpleadosModule,
    ClientesModule,
    AjustesInventarioModule,
    ProductosSinStockModule,
    SolicitudProductoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
