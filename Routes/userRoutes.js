const UserAuthController = require("../Controllers/User/user.auth.controller");
const UserProfileController = require("../Controllers/User/user.profile.controller");
const { verifyToken } = require("../Middlewares/auth.middleware");
const isImageExists = require("../Middlewares/isImageRequired.middleware");
const upload = require("../Middlewares/multer.middleware");
const { validateSchema } = require("../Middlewares/validateSchema");
const createProfileSchema = require("../Schemas/User/createProfileSchema");
const signInSchema = require("../Schemas/User/signInSchema");
const signUpWithEmailSchema = require("../Schemas/User/signUpWithEmailSchema");
const verifyOTPSchema = require("../Schemas/User/verifyOTPschema");

const userRouter = require("express").Router();

// *****************************************USER AUTH ROUTES *********************************

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

// ***********************************************USER PROFILE ROUTES *******************************************************
userRouter.post(
  "/create-profile",
  verifyToken,
  upload.single("profileImage"),
  isImageExists("Profile Picture is required"),
  validateSchema(createProfileSchema),
  UserProfileController.createProfile
);

userRouter.get("/get-me", verifyToken, UserProfileController.getMe);

module.exports = userRouter;
