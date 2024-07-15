const UserNotesController = require("../Controllers/User/notes/user.notes.controller");
const UserAuthController = require("../Controllers/User/user.auth.controller");
const UserProfileController = require("../Controllers/User/user.profile.controller");
const { verifyToken } = require("../Middlewares/auth.middleware");
const isFileExists = require("../Middlewares/files.middleware");
const upload = require("../Middlewares/multer.middleware");
const { validateParams } = require("../Middlewares/validateParams");
const { validateSchema } = require("../Middlewares/validateSchema");
const createNoteSchema = require("../Schemas/Notes/createNotesSchema");
const {
  deleteNoteSchema,
  updateNoteSchema,
} = require("../Schemas/Notes/updateOrDeleteSchema");
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
  isFileExists("Profile Picture is required"),
  validateSchema(createProfileSchema),
  UserProfileController.createProfile
);

userRouter.get("/get-me", verifyToken, UserProfileController.getMe);

// ***********************************************USER NOTES ROUTE***************************************************
userRouter.post(
  "/create-note",
  verifyToken,
  validateSchema(createNoteSchema),
  UserNotesController.createNote
);

userRouter.get(
  "/get-all/notes",
  verifyToken,
  UserNotesController.fetchAllNotes
);

userRouter.delete(
  "/delete-note/:noteId",
  verifyToken,
  validateParams(deleteNoteSchema),
  UserNotesController.deleteNote
);

userRouter.patch(
  "/update-note/:noteId",
  verifyToken,
  validateParams(deleteNoteSchema),
  validateSchema(updateNoteSchema),
  UserNotesController.updateNote
);
module.exports = userRouter;
