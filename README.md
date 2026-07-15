# Parcial - Sion Uziel Romano - Curso C

API RESTful con Node.js y Express para gestionar habitaciones de hotel con login con jwt y con archivo de csv desde pokeapi

## Instalacion

```bash
npm init -y es6
npm install express dotenv jsonwebtoken
```

## Variables de entorno

Crear archivo ".env" con :

```env
PORT=3000
JWT_SECRET=supersecret
AUTH_USER=admin
AUTH_PASSWORD=admin123
JWT_EXPIRES_IN=1h
DB_PROVIDER=json
```

## Ejecutar proyecto

```bash
npm start
```

Modo desarrollo:

```bash
npm run dev
```

el servidor es :

http://localhost:3000


## Endpoints

### Login

```http
POST /api/v1/auth/login
```

Body:

```json
{
  "username": "admin",
  "password": "admin123"
}
```

Devuelve un JWT.

### Crear habitación

```http
POST /api/v1/habitaciones
```

No requiere token.

### Listar habitaciones

```http
GET /api/v1/habitaciones
```

Filtro disponible:

```http
GET /api/v1/habitaciones?disponible=true
```

### Obtener habitación

```http
GET /api/v1/habitaciones/:id
```

### Editar habitación

```http
PUT /api/v1/habitaciones/:id
```

Requiere JWT.

```txt
Authorization: Bearer TOKEN
```

### Eliminar habitación

```http
DELETE /api/v1/habitaciones/:id
```

Requiere JWT.

```txt
Authorization: Bearer TOKEN
```

### Generar CSV de Pokémon

```http
GET /api/v1/pokemon/csv
```

Genera el archivo `pokemon_15.csv` con los Pokémon del 1 al 15 dentro de la carpeta files.

## Pruebas

Las pruebas están en:

```txt
tests/test.endpoints.http
```

Primero ejecutar el login válido, copiar el token devuelto y pegarlo en:

```txt
@token = PEGAR_TOKEN_ACA
```

Después crear una habitación, copiar su `id` y pegarlo en:

```txt
@habitacionId = PEGAR_ID_ACA
```

## No subir

```txt
node_modules
.env
```

## Entrega

```txt
nombre_alumno: Uziel Romano
link:
Variables de entorno:
PORT=3000
JWT_SECRET=supersecret
AUTH_USER=admin
AUTH_PASSWORD=admin123
DB_PROVIDER=json
```
