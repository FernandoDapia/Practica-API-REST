// Middleware para manejo centralizado de errores

const errorHandler = (err, req, res, next) => {
  console.error("❌ Error:", err);

  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: "Error de validación",
      errors,
    });
  }


  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "ID no válido",
    });
  }


  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Error del servidor",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = errorHandler;
