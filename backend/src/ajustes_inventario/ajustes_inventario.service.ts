import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAjustesInventarioDto } from './dto/create-ajustes_inventario.dto';
import { UpdateAjustesInventarioDto } from './dto/update-ajustes_inventario.dto';
import { AjusteInventario } from './entities/ajuste_inventario.entity';
import { Producto } from '../productos/entities/producto.entity';

@Injectable()
export class AjustesInventarioService {
  constructor(
    @InjectRepository(AjusteInventario)
    private readonly ajusteRepo: Repository<AjusteInventario>,
    @InjectRepository(Producto)
    private readonly productoRepo: Repository<Producto>,
  ) {}

  async create(dto: CreateAjustesInventarioDto) {
    const producto = await this.productoRepo.findOne({ where: { id: dto.productoId } });
    if (!producto) throw new NotFoundException('Producto no encontrado');

    const ajuste = this.ajusteRepo.create({
      cantidad: dto.cantidad,
      observaciones: dto.observaciones || '',
      producto: producto,
    });
    return this.ajusteRepo.save(ajuste);
  }

  findAll() {
    return this.ajusteRepo.find({ relations: ['producto'] });
  }

  async findOne(id: number) {
    const ajuste = await this.ajusteRepo.findOne({ where: { id }, relations: ['producto'] });
    if (!ajuste) throw new NotFoundException('Ajuste no encontrado');
    return ajuste;
  }

  async update(id: number, dto: UpdateAjustesInventarioDto) {
    const ajuste = await this.ajusteRepo.findOne({ where: { id } });
    if (!ajuste) throw new NotFoundException('Ajuste no encontrado');

    if (dto.productoId !== undefined) {
      const producto = await this.productoRepo.findOne({ where: { id: dto.productoId } });
      if (!producto) throw new NotFoundException('Producto no encontrado');
      (ajuste as any).producto = producto;
    }

    Object.assign(ajuste, {
      cantidad: dto.cantidad ?? ajuste.cantidad,
      observaciones: dto.observaciones ?? ajuste.observaciones,
    });

    await this.ajusteRepo.save(ajuste);
    return this.findOne(id);
  }

  async remove(id: number) {
    const res = await this.ajusteRepo.delete(id);
    if (res.affected === 0) throw new NotFoundException('Ajuste no encontrado');
    return { deleted: true };
  }
}
