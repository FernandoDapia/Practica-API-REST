const successResponse = (
  res,
  data,
  message = "Operación exitosa",
  statusCode = 200,
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

const errorResponse = (
  res,
  message = "Error del servidor",
  statusCode = 500,
  error = null,
) => {
  const response = {
    success: false,
    message,
  };
  if (error && process.env.NODE_ENV === "development") {
    response.error = error.message;
  }

  return res.status(statusCode).json(response);
};

module.exports = { successResponse, errorResponse };
