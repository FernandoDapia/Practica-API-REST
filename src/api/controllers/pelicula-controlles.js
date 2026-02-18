const Pelicula = require("../../models/pelicula-model.js");
const { successResponse, errorResponse } = require("../../utils/response.js");

const getAllPeliculas = async (req, res) => {
  try {
    console.log("Peticion recibida: Get todas las peliculas");
    const peliculas = await Pelicula.find().sort({ año: -1 });
    console.log(`Se encontraron ${peliculas.length} peliculas`);

    successResponse(
      res,
      {
        cantidad: peliculas.length,
        peliculas,
      },
      "Peliculas obtenidas correctamente",
    );
  } catch (error) {
    console.log("Error en getAllPeliculas", error.message);
    errorResponse(res, "Error al obtener las peliculas ", 500, error);
  }
};

const getPeliculaById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Peticion recivida: Get pelicula ckn ID: ${id}`);

    const pelicula = await Pelicula.findById(id);

    if (!pelicula) {
      console.log(`No se encontro pelicula con ID: ${id}`);
      return errorResponse(res, "Pelicula no encontrada", 404);
    }
    console.log(`Pelicula encontrada: ${pelicula.titulo}`);
    successResponse(res, pelicula, "Pelicula encontrada");
  } catch (error) {
    console.log("Error en getPeliculaById:", error.message);
    errorResponse(res, "Error al obtener la pelicula", 500, error);
  }
};

const getPeliculasByGenero = async (req, res) => {
  try {
    const { genero } = req.params;
    console.log(`Peticion recibida: Get peliculas del genero ${genero}`);
    const peliculas = await Pelicula.Find({ genero: { $in: [genero] } }).sort({
      puntuacion: -1,
    });

    console.log(
      `✅ Se encontraron ${peliculas.length} películas del género ${genero}`,
    );
    successResponse(
      res,
      {
        genero,
        cantidad: peliculas.length,
        peliculas,
      },
      `Películas del género "${genero}" obtenidas`,
    );
  } catch (error) {
    console.error("❌ Error en getPeliculasByGenero:", error.message);
    errorResponse(res, "Error al buscar por género", 500, error);
  }
};

const getPeliculasByDirector = async (req, res) => {
  try {
    const { director } = req.params;
    console.log(
      `📋 Petición recibida: GET películas del director: ${director}`,
    );

    const peliculas = await Pelicula.find({
      director: { $regex: director, $options: "i" },
    }).sort({ año: -1 });

    console.log(
      `✅ Se encontraron ${peliculas.length} películas del director ${director}`,
    );

    successResponse(
      res,
      {
        director,
        cantidad: peliculas.length,
        peliculas,
      },
      `Películas del director "${director}" obtenidas`,
    );
  } catch (error) {
    console.error("❌ Error en getPeliculasByDirector:", error.message);
    errorResponse(res, "Error al buscar por director", 500, error);
  }
};

const createPelicula = async (req, res) => {
  try {
    console.log("📦 Petición recibida: POST crear película");
    console.log("📦 Datos recibidos del cliente:", req.body);

    const nuevaPelicula = new Pelicula(req.body);
    const peliculaGuardada = await nuevaPelicula.save();

    console.log(`✅ Película creada con ID: ${peliculaGuardada._id}`);
    console.log(`✅ Título guardado: ${peliculaGuardada.titulo}`);

    successResponse(
      res,
      peliculaGuardada,
      "Película creada correctamente",
      201,
    );
  } catch (error) {
    console.error("❌ Error en createPelicula:", error.message);
    errorResponse(res, "Error al crear la película", 500, error);
  }
};

const updatePelicula = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`📦 Petición recibida: PUT actualizar película con ID: ${id}`);
    console.log("📦 Datos a actualizar:", req.body);

    const peliculaActualizada = await Pelicula.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!peliculaActualizada) {
      console.log(`⚠️  No se encontró película con ID: ${id}`);
      return errorResponse(res, "Película no encontrada", 404);
    }

    console.log(`✅ Película actualizada: ${peliculaActualizada.titulo}`);

    successResponse(
      res,
      peliculaActualizada,
      "Película actualizada correctamente",
    );
  } catch (error) {
    console.error("❌ Error en updatePelicula:", error.message);
    errorResponse(res, "Error al actualizar la película", 500, error);
  }
};

const deletePelicula = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`🗑️  Petición recibida: DELETE película con ID: ${id}`);

    const peliculaEliminada = await Pelicula.findByIdAndDelete(id);

    if (!peliculaEliminada) {
      console.log(`⚠️  No se encontró película con ID: ${id}`);
      return errorResponse(res, "Película no encontrada", 404);
    }

    console.log(`✅ Película eliminada: ${peliculaEliminada.titulo}`);

    successResponse(res, peliculaEliminada, "Película eliminada correctamente");
  } catch (error) {
    console.error("❌ Error en deletePelicula:", error.message);
    errorResponse(res, "Error al eliminar la película", 500, error);
  }
};

module.exports = {
  getAllPeliculas,
  getPeliculaById,
  getPeliculasByGenero,
  getPeliculasByDirector,
  createPelicula,
  updatePelicula,
  deletePelicula,
};
