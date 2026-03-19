import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ProductosModule } from './productos/productos.module';
import { ProductosSinStockModule } from './productos_sin_stock/productos_sin_stock.module';
// Módulos externos a inventario (ventas/compras/logística) removidos
import { SolicitudProductoModule } from './solicitud_producto/solicitud_producto.module';
x
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    ((): any => {
      const sslMode = process.env.DATABASE_SSL_ENABLED === 'yes';
      // Configuracion de TypeORM
      const config = {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: process.env.POSTGRES_USER || 'postgres',
        password: process.env.POSTGRES_PASSWORD || '1234',
        database: process.env.POSTGRES_DB || 'inventario_db',
        autoLoadEntities: true,
        ssl: sslMode ? { rejectUnauthorized: false } : false as any,
        synchronize: false,
      };

      // Retornamos la configuracion
      return TypeOrmModule.forRoot(config as any);
    })(),

    ProductosModule,
    AjustesInventarioModule,
    ProductosSinStockModule,
    SolicitudProductoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { } x
