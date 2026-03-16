import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('cliente', { schema: 'public' })
export class Cliente {
  @PrimaryGeneratedColumn({ name: 'id_cliente' })
  id: number;

  @Column({ type: 'text', nullable: true })
  nombre: string;

  @Column({ type: 'text', nullable: true, default: '' })
  apellido: string;

  @Column({ type: 'text' })
  direccion: string;

  @Column({ type: 'text' })
  telefono: string;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'boolean', default: true })
  estado: boolean;

  // relaciones a reservas de venta eliminadas (separación de responsabilidades)
}
