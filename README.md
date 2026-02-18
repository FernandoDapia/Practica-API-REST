# 🎬 API REST - Películas

API RESTful con Node.js, Express y MongoDB. Backend puro con CRUD completo.

> Proyecto backend - pruebas con Insomnia 

---

## 🛠️ Stack

- Node.js + Express
- MongoDB + Mongoose
- Arquitectura MVC

---

## 📁 Estructura

```
src/
├── api/controllers/
├── config/
├── middleware/
├── models/
├── routes/
└── utils/
```

---

## ⚙️ Instalación

```bash
# Clonar
git clone https://github.com/tu-usuario/api-rest-peliculas.git
cd api-rest-peliculas

# Instalar
npm install

# Configurar .env
MONGO_URI=tu_conexion_mongodb
PORT=3000

# Iniciar
npm run dev
```

---

## 📡 Endpoints

**Base:** `http://localhost:3000/api/peliculas`

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/` | Listar todas |
| GET | `/:id` | Obtener por ID |
| GET | `/genero/:genero` | Buscar por género |
| GET | `/director/:director` | Buscar por director |
| POST | `/` | Crear película |
| PUT | `/:id` | Actualizar |
| DELETE | `/:id` | Eliminar |

---

## 📝 Ejemplo

### Crear película

```http
POST http://localhost:3000/api/peliculas
Content-Type: application/json

{
  "titulo": "Interstellar",
  "director": "Christopher Nolan",
  "año": 2014,
  "genero": ["Ciencia Ficción", "Drama"],
  "duracion": 169,
  "puntuacion": 8.6
}
```

### Respuesta

```json
{
  "success": true,
  "message": "Película creada correctamente",
  "data": {
    "_id": "...",
    "titulo": "Interstellar",
    ...
  }
}
```

---

## 🗃️ Schema

```javascript
{
  titulo: String,
  director: String,
  año: Number,
  genero: [String],
  duracion: Number,
  disponible: Boolean,
  puntuacion: Number
}
```

---

## 👤 Autor

Fernando Dapía Rodriguez

---

## 📄 Licencia

MIT