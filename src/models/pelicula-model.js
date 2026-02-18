const mongoose = require("mongoose");

const peliculaSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, "El título es obligatorio"],
      trim: true,
      maxlength: [100, "El título no puede exceder 100 caracteres"],
    },
    director: {
      type: String,
      required: [true, "El director es obligatorio"],
      trim: true,
    },
    año: {
      type: Number,
      required: [true, "El año es obligatorio"],
      min: [1888, "El año no puede ser anterior a 1888"],
      max: [new Date().getFullYear() + 5, "El año no puede ser tan futuro"],
    },
    genero: {
      type: [String],
      required: [true, "Debe tener al menos un género"],
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: "Debe incluir al menos un género",
      },
    },
    duracion: {
      type: Number,
      required: [true, "La duración es obligatoria"],
      min: [1, "La duración debe ser mayor a 0"],
    },
    disponible: {
      type: Boolean,
      default: true,
    },
    puntuacion: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Pelicula = mongoose.model("peliculas", peliculaSchema);

module.exports = Pelicula;
