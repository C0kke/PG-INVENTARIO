import { IsString, IsNotEmpty, IsOptional, IsNumber, Min, IsBoolean, IsDate } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';

export class CreateSolicitudProductoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsBoolean()
  @IsOptional()
  estado_solicitud?: boolean = false;

  @IsDate()
  @Type(() => Date)
  fecha_solicitud: Date;
}