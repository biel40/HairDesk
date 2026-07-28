# HairDesk

HairDesk es una aplicación web para la gestión sencilla de peluquerías de barrio.

El objetivo del proyecto es facilitar la administración diaria del negocio y ofrecer a los clientes una forma rápida y clara de consultar servicios y gestionar sus citas.

Actualmente, el proyecto se encuentra en fase de desarrollo de su primera versión MVP.

## Funcionalidades previstas

* Gestión de peluquerías.
* Gestión de empleados.
* Gestión de servicios y precios.
* Gestión de clientes.
* Reserva y administración de citas.
* Consulta de disponibilidad.
* Panel de administración para el propietario.
* Interfaz sencilla para los clientes.
* Preparación para un modelo de suscripción mensual por peluquería.

## Tecnologías

### Frontend

* Angular
* TypeScript
* HTML
* SCSS
* Aplicación SPA

### Backend

* ASP.NET Core Web API
* C#
* Entity Framework Core

### Base de datos

* PostgreSQL

### Infraestructura

* GitHub
* Docker
* Railway

## Estructura del monorepositorio

```text
hairdesk/
├── apps/
│   ├── api/              # API REST desarrollada con ASP.NET Core
│   └── web/              # Aplicación frontend desarrollada con Angular
├── .gitignore
├── docker-compose.yml
└── README.md
```

La API y el frontend se encuentran en el mismo repositorio, pero se despliegan como servicios independientes.

## Requisitos

Para ejecutar el proyecto en local necesitas tener instalado:

* Git
* Node.js
* npm
* Angular CLI
* .NET SDK
* Docker Desktop, recomendado
* PostgreSQL, salvo que se utilice mediante Docker

## Clonar el repositorio

```bash
git clone https://github.com/USUARIO/REPOSITORIO.git
cd hairdesk
```

Sustituye `USUARIO/REPOSITORIO` por la URL real del repositorio.

## Ejecutar el frontend

Desde la raíz del repositorio:

```bash
cd apps/web
npm install
npm start
```

También puede ejecutarse con:

```bash
ng serve
```

La aplicación estará disponible normalmente en:

```text
http://localhost:4200
```

## Ejecutar la API

Desde la raíz del repositorio:

```bash
cd apps/api
dotnet restore
dotnet run
```

La URL local de la API aparecerá en la consola al iniciar el proyecto.

Swagger estará disponible normalmente en una dirección similar a:

```text
http://localhost:5000/swagger
```

El puerto exacto dependerá de la configuración de la API.

## Configuración de la base de datos

La API utiliza PostgreSQL.

La cadena de conexión debe configurarse mediante variables de entorno o mediante los secretos de usuario de .NET.

Ejemplo:

```bash
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Host=localhost;Port=5432;Database=hairdesk;Username=postgres;Password=tu_password"
```

No deben añadirse contraseñas, cadenas de conexión reales ni otros secretos al repositorio.

## Variables de entorno

### API

Ejemplo de configuración:

```env
ASPNETCORE_ENVIRONMENT=Development
ConnectionStrings__DefaultConnection=Host=localhost;Port=5432;Database=hairdesk;Username=postgres;Password=tu_password
```

### Frontend

La URL de la API debe configurarse en los archivos de entorno de Angular.

Ejemplo:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api'
};
```

## Docker

Cada aplicación puede disponer de su propio `Dockerfile` para permitir despliegues independientes.

Ejemplo de estructura:

```text
apps/
├── api/
│   └── Dockerfile
└── web/
    └── Dockerfile
```

También puede utilizarse Docker Compose para ejecutar localmente el frontend, la API y PostgreSQL.

```bash
docker compose up --build
```

Para detener los servicios:

```bash
docker compose down
```

## Despliegue

El proyecto se despliega en Railway mediante servicios independientes:

* Servicio frontend.
* Servicio API.
* Servicio PostgreSQL.

Railway construye y despliega cada servicio utilizando su correspondiente `Dockerfile`.

Los despliegues pueden ejecutarse automáticamente cuando se realiza un `push` sobre la rama configurada en Railway.

## Flujo de trabajo

Flujo recomendado para desarrollar una nueva funcionalidad:

```bash
git checkout main
git pull
git checkout -b feature/nombre-funcionalidad
```

Después de implementar los cambios:

```bash
git add .
git commit -m "Add feature description"
git push origin feature/nombre-funcionalidad
```

Finalmente, se debe crear una Pull Request hacia `main`.

## Estado del proyecto

HairDesk se encuentra actualmente en desarrollo.

El objetivo inicial es construir un MVP funcional, sencillo de mantener y preparado para evolucionar conforme se incorporen nuevas peluquerías y funcionalidades.

## Seguridad

* No subir archivos `.env`.
* No incluir contraseñas en el código.
* No versionar cadenas de conexión reales.
* Utilizar variables de entorno en Railway.
* Utilizar `dotnet user-secrets` durante el desarrollo local.
* Revisar los cambios antes de realizar un `push`.

## Licencia

Este proyecto es privado y está destinado al desarrollo de HairDesk.

Todos los derechos reservados.
