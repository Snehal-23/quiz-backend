function errorHandler(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    return res
      .status(401)
      .json({ message: "User is not authorized. Please check auth_token" });
  }
  if (err.name === "ValidationError") {
    return res.status(401).json({ message: err });
  }
  return res.status(200).json({ message: "server error", error: err });
}

module.exports = errorHandler;
