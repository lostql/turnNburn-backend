const UserHorseController = require("../Controllers/User/horse/user.horse.controller");
const { verifyToken } = require("../Middlewares/auth.middleware");
const isFileExists = require("../Middlewares/files.middleware");
const upload = require("../Middlewares/multer.middleware");
const { validateSchema } = require("../Middlewares/validateSchema");
const createHorseSchema = require("../Schemas/Horse/createHorseSchema");

const userHorseRouter = require("express").Router();

userHorseRouter.post(
  "/create",
  verifyToken,
  upload.array("horseImage"),
  isFileExists("Please upload atleast 1 image for horse", true),
  validateSchema(createHorseSchema),
  UserHorseController.createHorse
);
module.exports = userHorseRouter;
