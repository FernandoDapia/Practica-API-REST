require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/database");
const peliculaRoutes = require("./src/routes/pelicula-routes");
const errorHandler = require("./src/middleware/error-handle");

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    mensaje: "🎬 API de Películas funcionando",
    endpoints: {
      getAllPeliculas: "GET    /api/peliculas",
      getPeliculaById: "GET    /api/peliculas/:id",
      getPeliculasByGenero: "GET    /api/peliculas/genero/:genero",
      getPeliculasByDirector: "GET  /api/peliculas/director/:nombre",
      createPelicula: "POST   /api/peliculas",
      updatePelicula: "PUT    /api/peliculas/:id",
      deletePelicula: "DELETE /api/peliculas/:id",
    },
  });
});

app.use("/api/peliculas", peliculaRoutes);

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Ruta ${req.originalUrl} no encontrada`,
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
