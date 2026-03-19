import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1773870345596 implements MigrationInterface {
    name = 'InitialMigration1773870345596'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "producto" ("id_producto" SERIAL NOT NULL, "nombre" text NOT NULL, "codigo" text, "descripcion" text, "precio_venta" numeric, "cantidad" numeric DEFAULT '0', "estado" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_4ecaa777d3efc10b5a6327cfe42" UNIQUE ("codigo"), CONSTRAINT "PK_e6f07eaa38082ffd9e20e961691" PRIMARY KEY ("id_producto"))`);
        await queryRunner.query(`CREATE TABLE "Inventario"."ajustes_inventario" ("id" SERIAL NOT NULL, "cantidad" numeric NOT NULL, "observaciones" text, "fechaAjuste" TIMESTAMP NOT NULL DEFAULT now(), "productoId" integer, CONSTRAINT "PK_186ce8481a7cd8dac85a71ddb01" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "solicitud_producto" ("id_solicitud" SERIAL NOT NULL, "nombre" text, "descripcion" text, "estado_solicitud" boolean DEFAULT false, "fecha_solicitud" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6532c9c3630761340a4e930689e" PRIMARY KEY ("id_solicitud"))`);
        await queryRunner.query(`CREATE TABLE "productos_sin_stock" ("id_producto" integer NOT NULL, "nombre" text NOT NULL, "descripcion" text, "codigo" text, "precio_venta" double precision, "fecha_sin_stock" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a594c7a787981dff38c762e4cd8" PRIMARY KEY ("id_producto"))`);
        await queryRunner.query(`ALTER TABLE "Inventario"."ajustes_inventario" ADD CONSTRAINT "FK_82ebeaa2ac61382e94197d94997" FOREIGN KEY ("productoId") REFERENCES "producto"("id_producto") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "productos_sin_stock" ADD CONSTRAINT "FK_a594c7a787981dff38c762e4cd8" FOREIGN KEY ("id_producto") REFERENCES "producto"("id_producto") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "productos_sin_stock" DROP CONSTRAINT "FK_a594c7a787981dff38c762e4cd8"`);
        await queryRunner.query(`ALTER TABLE "Inventario"."ajustes_inventario" DROP CONSTRAINT "FK_82ebeaa2ac61382e94197d94997"`);
        await queryRunner.query(`DROP TABLE "productos_sin_stock"`);
        await queryRunner.query(`DROP TABLE "solicitud_producto"`);
        await queryRunner.query(`DROP TABLE "Inventario"."ajustes_inventario"`);
        await queryRunner.query(`DROP TABLE "producto"`);
    }

}
