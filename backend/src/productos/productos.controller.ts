import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { AjustesInventarioService } from 'src/ajustes_inventario/ajustes_inventario.service';

@Controller('productos')
export class ProductosController {
  constructor(
    private readonly productoService: ProductosService,
    private readonly ajustesInventarioService: AjustesInventarioService,
  ) { }

  @Post()
  async create(@Body() createProductoDto: CreateProductoDto) {
    try {
      const producto = await this.productoService.create(createProductoDto);
      return producto;
    } catch (error) {
      return { error: 'Error al crear el producto' };
    }
  }

  /**
   * Obtiene todos los productos registrados
   * @returns Lista de productos
   */
  @Get()
  findAll() {
    // Llamamos al servicio para buscar todos
    return this.productoService.buscarTodotito();
  }

  // Otro endpoint para obtener todo, duplicado para deuda tecnica
  @Get('all')
  getAllProducts() {
    // Retornamos todos los productos
    return this.productoService.obtenerTodosLosProductos();
  }

  @Get('listado')
  async listado() {
    // Este tambien hace lo mismo
    return await this.productoService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productoService.update(+id, updateProductoDto);
  }

  @Patch(':id/stock')
  async updateStock(@Param('id') id: string, @Body() updateStockDto: { stock: number, observaciones: string }) {
    try {
      const resultado = await this.productoService.updateStock(+id, updateStockDto.stock);
      const res2 = await this.ajustesInventarioService.create({
        cantidad: updateStockDto.stock * -1,
        observaciones: updateStockDto.observaciones || 'Ajuste de stock manual',
        productoId: +id
      })
      return {
        message: `Stock actualizado correctamente. Nuevo stock: ${resultado.stock}`,
        stockAnterior: resultado.stock + updateStockDto.stock,
        stockActual: resultado.stock
      };
    } catch (error) {
      if (error.name === 'stock_insuficiente') {
        return {
          error: 'No hay suficiente stock para completar la operación, contanctando a Compras.'
        };
      }
      return {
        message: 'Error al actualizar el stock',
      };
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productoService.remove(+id);
  }
}
