# Backend - Inventario (NestJS)

Resumen
-------
Este repositorio contiene la parte de backend del módulo de Inventario desarrollado con NestJS y TypeORM. Para fines didácticos la lógica de inventario está separada y desacoplada de módulos externos (ventas, compras, logística).

Requisitos
----------
- Node.js >= 18
- npm (o yarn)
- PostgreSQL accesible (base de datos y credenciales)

Preparar el proyecto (instalación)
---------------------------------
1. Abrir una terminal en la raíz del proyecto:

```bash
cd backend
npm install
```

2. Variables de entorno
-----------------------
Cree un archivo `.env` en `backend/` con las variables necesarias. Ejemplo mínimo:

```
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=miusuario
POSTGRES_PASSWORD=mipassword
POSTGRES_DB=inventario_db
POSTGRES_SSL=false
NODE_ENV=development
```

Si usa SSL en producción, ajuste `POSTGRES_SSL=true` y las opciones correspondientes.

Comandos útiles
---------------
- Ejecutar en modo desarrollo (live-reload):

```bash
cd backend
npm run start:dev
```

- Compilar el proyecto:

```bash
cd backend
npm run build
```

- Ejecutar tests:

```bash
cd backend
npm test
```

- Comandos TypeORM (migraciones):

```bash
cd backend
npm run typeorm -- migration:generate -- -n NombreMigracion
npm run typeorm -- migration:run
npm run typeorm -- migration:revert
```

Estructura relevante
--------------------
- `backend/src/` - código fuente NestJS
- `backend/data-source.ts` - configuración TypeORM / entidades
- `backend/package.json` - scripts y dependencias
