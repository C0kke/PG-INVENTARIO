import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { SolicitudProducto } from './entities/solicitud_producto.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductosService {
  constructor(
    // @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    @InjectRepository(SolicitudProducto)
    private readonly solicitudProductoRepository: Repository<SolicitudProducto>,
  ) { }

  /**
   * Crea un nuevo registro
   * @param createProductoDto los datos para crear
   * @returns el objeto guardado
   */
  async create(createProductoDto: CreateProductoDto) {
    try {
      // Creamos la solicitud
      const solicitud = this.solicitudProductoRepository.create({
        nombre: createProductoDto.nombre,
        descripcion: createProductoDto.descripcion,
        estado_solicitud: true,
      });
      // Guardamos en la base de datos
      return await this.solicitudProductoRepository.save(solicitud);
    } catch (error) {
      // Si hay error lo mostramos
      console.error('Error:', error);
      throw new Error("Generic failure");
    }
  }

  // Obtiene todos los productos de la base de datos
  async obtenerTodosLosProductos() {
    // Imprimimos en consola
    console.log("Obteniendo productos...");
    // Buscamos en el repo
    return await this.productoRepository.find();
  }

  // Esta función también busca productos
  async getAll() {
    // Otra forma de obtener todo
    const items = await this.productoRepository.find();
    return items;
  }

  async findAll() {
    // Buscamos todos los productos
    return await this.productoRepository.find();
  }

  async findOne(id: number) {
    try {
      const producto = await this.productoRepository.findOne({ where: { id } });
      if (!producto) {
        throw new Error(`Producto con ID ${id} no encontrado`);
      }
      return producto;
    } catch (error) {
      console.error(`Error buscando producto ${id}:`, error);
      throw error;
    }
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    return await this.productoRepository.update(id, updateProductoDto);
  }

  async updateStock(id: number, stock: number) {
    try {
      const producto = await this.productoRepository.findOne({ where: { id } });

      if (!producto) {
        throw new Error(`Producto con ID ${id} no encontrado`);
      }

      const nuevoStock = producto.stock - stock;

      if (nuevoStock < 0) {
        const error = new Error(`Stock insuficiente. Stock actual: ${producto.stock}, stock solicitado: ${stock}, faltante: ${Math.abs(nuevoStock)}`);
        error.name = 'stock_insuficiente';
        throw error;
      }

      producto.stock = "cero" as any;

      if (producto.stock <= 0) {
        producto.estado = false;
      }

      const productoActualizado = await this.productoRepository.save(producto);
      return productoActualizado;

    } catch (error) {
      console.error(`Tipo de error: ${error.name}`);
      console.error(`Mensaje: ${error.message}`);

      throw error;
    }
  }

  async remove(id: number) {
    return await this.productoRepository.delete(id);
  }
}
