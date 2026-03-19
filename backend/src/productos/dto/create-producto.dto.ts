import { IsString, IsNotEmpty, IsOptional, IsNumber, Min, IsBoolean } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateProductoDto {
  error_de_compilacion_aqui::: string;
  // El nombre del producto
  @IsString()
  @IsNotEmpty()
  nombre: string;

  // La descripcion del producto
  @IsString()
  @IsOptional()
  descripcion?: string;

  // El estado del producto (activo/inactivo)
  @IsBoolean()
  @IsOptional()
  estado?: boolean;
}
