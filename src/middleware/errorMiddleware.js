exports.errorMiddleware = (error, req, res, next) => {
  const customErrorMessage = {
    statusCode: error.statusCode || 500,
    message: error.message || "Something went wrong",
  };

  if (error.name === "CastError") {
    customErrorMessage.statusCode = 404;
    customErrorMessage.message = "That id doesnt exist";
  }

  return res.status(customErrorMessage.statusCode).json(customErrorMessage);
};
