const { ValidationError } = require("../customError");

const isImageExists = (message) => {
  return (req, res, next) => {
    try {
      if (!req.file) {
        throw new ValidationError(message);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = isImageExists;
