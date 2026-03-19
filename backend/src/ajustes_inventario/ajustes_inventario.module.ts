import { Module } from '@nestjs/common';
import { AjustesInventarioService } from './ajustes_inventario.service';
import { AjustesInventarioController } from './ajustes_inventario.controller';
import { AjusteInventario } from './entities/ajuste_inventario.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Producto } from '../productos/entities/producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AjusteInventario, Producto])],
  controllers: [AjustesInventarioController],
  providers: [AjustesInventarioService],
  exports: [AjustesInventarioService],
})
export class AjustesInventarioModule {}
