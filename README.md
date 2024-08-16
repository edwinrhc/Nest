# Proyecto Backend Escalable con NestJS

Este proyecto es un backend escalable desarrollado con [NestJS](https://nestjs.com/), un framework progresivo de Node.js que permite construir aplicaciones eficientes y bien estructuradas..

## Características

- **TypeScript**: Escrito en TypeScript, proporcionando tipado estático y mejores herramientas de desarrollo.
- **CRUD Completo**: Implementación de operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para la gestión de recursos.
- **MongoDB**: Integración con MongoDB para el almacenamiento de datos.
- **Autenticación y Autorización**: Manejo de usuarios y autenticación mediante JWT.
- **Validación de Datos**: Validación de entrada de datos con Pipes y DTOs.
- **Documentación API**: Documentación automática con Swagger (OpenAPI).

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/tu-repo.git
   cd tu-repo
2. Instalar dependencias:
   ```bash
   npm install
   
3. Configurar variables de entorno:
   Crear un archivo .env y agregar las siguientes variables:
    ```bash
    DATABASE_URI=mongodb://localhost:27017/tu-db
    JWT_SECRET=tu-secreto-jwt
   
4. Ejecutar la aplicación:
   ```bash
    npm run start:dev
   
[//]: # (Estructura del Proyecto)

[//]: # (   ```bash)

[//]: # (src/)

[//]: # (├── app.module.ts)

[//]: # (├── main.ts)

[//]: # (├── common/)

[//]: # (│   ├── filters/)

[//]: # (│   ├── guards/)

[//]: # (│   └── pipes/)

[//]: # (├── modules/)

[//]: # (│   ├── auth/)

[//]: # (│   ├── users/)

[//]: # (│   └── items/)

[//]: # (├── services/)

[//]: # (└── controllers/)



