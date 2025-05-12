# Sistema de Gestión de Laboratorio - Backend API

Este backend provee una API RESTful para gestionar laboratorios, órdenes de compra y usuarios con roles y autenticación JWT.

## Inicio rápido

1. Instala dependencias:
   ```bash
   npm install
   ```
2. Configura la base de datos en `config/config.json`.
3. Ejecuta migraciones y seeders:
   ```bash
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
   ```
4. Inicia el servidor:
   ```bash
   node app.js
   ```

## Autenticación

- Haz login en `/api/login` (POST) con email y password para obtener un token JWT.
- Usa el token en el header de tus peticiones:
  ```
  Authorization: Bearer TU_TOKEN
  ```

## Endpoints principales

### Usuarios
- **POST** `/api/login` — Login, devuelve token JWT.
- **POST** `/api/usuarios` — Crear usuario (solo admin).
  ```json
  {
    "nombre": "Juan",
    "email": "juan@lab.com",
    "password": "clave123",
    "rol": "usuario" // o "admin", "moderador"
  }
  ```

### Laboratorios
- **GET** `/api/laboratorios` — Ver todos (todos los roles)
- **GET** `/api/laboratorios/:id` — Ver uno (todos los roles)
- **POST** `/api/laboratorios` — Crear (solo admin)
  ```json
  {
    "razonSocial": "Lab Central",
    "direccion": "Av. Principal 123",
    "telefono": "987654321",
    "email": "central@lab.com",
    "contacto": "Juan Perez"
  }
  ```
- **PUT** `/api/laboratorios/:id` — Editar (admin, moderador)
- **DELETE** `/api/laboratorios/:id` — Eliminar (solo admin)

### Ordenes de Compra
- **GET** `/api/ordenes` — Ver todas (todos los roles)
- **GET** `/api/ordenes/:id` — Ver una (todos los roles)
- **POST** `/api/ordenes` — Crear (solo admin)
  ```json
  {
    "fechaEmision": "2025-05-11",
    "Situacion": "Pendiente",
    "Total": 1500.50,
    "CodLab": 1,
    "NroFacturaProv": "FAC-001"
  }
  ```
- **PUT** `/api/ordenes/:id` — Editar (admin, moderador)
- **DELETE** `/api/ordenes/:id` — Eliminar (solo admin)

## Roles y permisos
- **admin**: CRUD completo en laboratorios y órdenes, crear usuarios.
- **moderador**: Ver y editar laboratorios y órdenes.
- **usuario**: Solo ver laboratorios y órdenes.

## Notas para el frontend
- Siempre autentica y usa el token JWT en cada request.
- Los campos y rutas deben coincidir con los ejemplos de arriba.
- Si recibes 401/403, revisa el token y el rol del usuario.

---

¡Listo para consumir desde tu frontend!
