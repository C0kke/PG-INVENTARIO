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

Base de datos con Docker
-----------------------
Puedes levantar una base de datos PostgreSQL localmente usando Docker Compose (archivo `backend/docker-compose.yml` incluido). Esto crea la base de datos indicada en `backend/.env`.

1. Levantar la base de datos:

```bash
cd backend
docker compose up -d
```

2. Parar y remover:

```bash
cd backend
docker compose down -v
```

Nota sobre `POSTGRES_HOST`:
- Si ejecutas la aplicación en tu máquina (no en contenedor), deja `POSTGRES_HOST=localhost` en `backend/.env` (el puerto local se mapea por docker-compose).
- Si dockerizas también la aplicación en un servicio junto al `db`, usa `POSTGRES_HOST=db` (el nombre del servicio Docker) en `backend/.env`.

Notas sobre la separación de responsabilidades
---------------------------------------------
Como parte de la refactorización didáctica, se han eliminado los módulos relacionados con ventas y logística (por ejemplo `reservas_venta_inventario`, `movimientos_inventario_logistica`, `productos_por_despachar`). El código asociado fue eliminado del árbol de trabajo; si necesitas restaurarlo, revisa el historial de Git.

Estructura relevante
--------------------
- `backend/src/` - código fuente NestJS
- `backend/data-source.ts` - configuración TypeORM / entidades
- `backend/package.json` - scripts y dependencias

Consejos y siguientes pasos
---------------------------
- Si quieres mantener el código eliminado para referencia, puedo moverlo a una carpeta `archive/` en vez de borrarlo permanentemente.
- Si deseas publicar la lógica de inventario como paquete independiente, puedo ayudarte a extraerla en una librería (monorepo o paquete npm local).

Contacto
-------
Si quieres que adapte este README a otro formato (inglés, más detallado, incluir diagramas), dímelo y lo actualizo.
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
