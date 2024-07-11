const UserAuthController = require("../Controllers/User/user.auth.controller");
const { validateSchema } = require("../Middlewares/validateSchema");
const signUpWithEmailSchema = require("../Schemas/User/signUpWithEmailSchema");

const userRouter = require("express").Router();

userRouter.post(
  "/sign-in/email",
  validateSchema(signUpWithEmailSchema),
  UserAuthController.signUpWithEmail
);

module.exports = userRouter;
