const UserAuthController = require("../Controllers/User/user.auth.controller");
const { verifyToken } = require("../Middlewares/auth.middleware");
const { validateSchema } = require("../Middlewares/validateSchema");
const createProfileSchema = require("../Schemas/User/createProfileSchema");
const signInSchema = require("../Schemas/User/signInSchema");
const signUpWithEmailSchema = require("../Schemas/User/signUpWithEmailSchema");
const verifyOTPSchema = require("../Schemas/User/verifyOTPschema");

const userRouter = require("express").Router();

userRouter.post(
  "/sign-up/email",
  validateSchema(signUpWithEmailSchema),
  UserAuthController.signUpWithEmail
);

userRouter.post(
  "/verify-otp",
  validateSchema(verifyOTPSchema),
  UserAuthController.verifyOTP
);

userRouter.post(
  "/sign-in/email",
  validateSchema(signInSchema),
  UserAuthController.signInWithEmail
);

userRouter.post(
  "/create-profile",
  verifyToken,
  validateSchema(createProfileSchema),
  UserAuthController.createProfile
);

module.exports = userRouter;
