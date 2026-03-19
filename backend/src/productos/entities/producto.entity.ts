import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { AjusteInventario } from '../../ajustes_inventario/entities/ajuste_inventario.entity';

@Entity('producto')
export class Producto {
  @PrimaryGeneratedColumn({ name: 'id_producto' })
  id: number;

  @Column({ type: 'text' })
  nombre: string;

  @Column({ type: 'text', unique: true, nullable: true })
  codigo: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'numeric', nullable: true })
  precio_venta: number;

  @Column({ name: 'cantidad', type: 'numeric', default: 0, nullable: true })
  stock: number;

  @Column({ type: 'boolean', default: true })
  estado: boolean;

  // relaciones a movimientos y reservas eliminadas para desacoplar logística/ventas

  @OneToMany(() => AjusteInventario, (ajuste) => ajuste.producto)
  ajustes: AjusteInventario[];
}
