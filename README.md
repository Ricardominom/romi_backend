# ROMI - Asistente Médico Backend

## Descripción

ROMI es un sistema backend para un asistente médico que permite la gestión de doctores y pacientes. Desarrollado con Node.js, Express y TypeScript, proporciona una API REST para el registro y autenticación de doctores, así como la gestión de registros de pacientes.

## Características

- ✅ Registro y autenticación de doctores
- ✅ Gestión de pacientes (crear y listar)
- ✅ Sistema de autenticación JWT
- ✅ Validación de datos
- ✅ Cifrado de contraseñas con bcrypt
- ✅ Base de datos MongoDB con Mongoose
- ✅ Configuración de CORS
- ✅ Middleware de autenticación

## Tecnologías Utilizadas

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **TypeScript** - Lenguaje tipado
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - JSON Web Tokens para autenticación
- **bcrypt** - Cifrado de contraseñas
- **express-validator** - Validación de datos
- **CORS** - Cross-Origin Resource Sharing

## Estructura del Proyecto

```
src/
├── config/
│   ├── cors.ts          # Configuración de CORS
│   └── db.ts            # Configuración de base de datos
├── controllers/
│   └── RomiController.ts # Controladores principales
├── middleware/
│   ├── auth.ts          # Middleware de autenticación
│   └── validation.ts    # Middleware de validación
├── models/
│   ├── Doctor.ts        # Modelo de Doctor
│   └── Pacient.ts       # Modelo de Paciente
├── utils/
│   ├── auth.ts          # Utilidades de autenticación
│   └── jwt.ts           # Utilidades JWT
├── index.ts             # Punto de entrada
├── router.ts            # Rutas principales
└── server.ts            # Configuración del servidor
```

## Instalación

1. Clona el repositorio:
```bash
git clone <repository-url>
cd romi_asistente_medico/backend
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno creando un archivo `.env`:
```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/romi_db
JWT_SECRET=tu_jwt_secret_key
```

4. Inicia la base de datos MongoDB

## Scripts Disponibles

- `npm run dev` - Inicia el servidor en modo desarrollo
- `npm run dev:api` - Inicia el servidor en modo API
- `npm run build` - Compila TypeScript a JavaScript
- `npm start` - Inicia el servidor en producción

## API Endpoints

### Doctores

- **POST** `/doctors` - Registro de nuevo doctor
- **POST** `/login` - Autenticación de doctor
- **GET** `/profile` - Obtener perfil del doctor (requiere autenticación)

### Pacientes

- **POST** `/patients` - Crear registro de paciente
- **GET** `/patients` - Listar todos los pacientes (requiere autenticación)

## Modelos de Datos

### Doctor
```typescript
{
  nameDoctor: string,
  emailDoctor: string,
  password: string (cifrada)
}
```

### Paciente
```typescript
{
  name: string,
  age: number,
  symptoms: string,
  email: string
}
```

## Autenticación

El sistema utiliza JWT (JSON Web Tokens) para la autenticación. Los endpoints protegidos requieren el token en el header:

```
Authorization: Bearer <token>
```

## Desarrollo

Para contribuir al proyecto:

1. Haz fork del repositorio
2. Crea una rama para tu feature: `git checkout -b feature/nueva-funcionalidad`
3. Realiza tus cambios y commit: `git commit -m 'Agregar nueva funcionalidad'`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

## Autor

Ricardo Mino

## Licencia

ISC

---

**Nota:** Este proyecto es una prueba técnica para ROMI - Asistente Médico.