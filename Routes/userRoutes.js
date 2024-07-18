const HorseHotelController = require("../Controllers/User/horse-hotel/horse-hotel.controller");
const UserNotesController = require("../Controllers/User/notes/user.notes.controller");
const OtherServicesController = require("../Controllers/User/other-services/other-services.controller");
const UserAuthController = require("../Controllers/User/user.auth.controller");
const UserProfileController = require("../Controllers/User/user.profile.controller");
const VetLocations = require("../Controllers/User/vet-locations/vet-location.controller");
const { verifyToken } = require("../Middlewares/auth.middleware");
const isFileExists = require("../Middlewares/files.middleware");
const upload = require("../Middlewares/multer.middleware");
const { validateParams } = require("../Middlewares/validateParams");
const { validateSchema } = require("../Middlewares/validateSchema");
const getDetailWithIdSchema = require("../Schemas/common/getDetailWithIdSchema");
const createNoteSchema = require("../Schemas/Notes/createNotesSchema");
const {
  deleteNoteSchema,
  updateNoteSchema,
} = require("../Schemas/Notes/updateOrDeleteSchema");
const createProfileSchema = require("../Schemas/User/createProfileSchema");
const createHorseHotelSchema = require("../Schemas/User/Horse-Hotel/createHorseHotelSchema");
const createOtherServiceSchema = require("../Schemas/User/Other-services/createOtherServiceSchema");
const updateOtherServiceSchema = require("../Schemas/User/Other-services/updateOtherServiceSchema");
const signInSchema = require("../Schemas/User/signInSchema");
const signUpWithEmailSchema = require("../Schemas/User/signUpWithEmailSchema");
const verifyOTPSchema = require("../Schemas/User/verifyOTPschema");
const addVetLocationSchema = require("../Schemas/User/Vet-locations/createVetLocationSchema");
const updateVetLocation = require("../Schemas/User/Vet-locations/updateVetLocationSchema");

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

// ***********************************************USER VET ROUTE***************************************************

userRouter.post(
  "/vet/create",
  verifyToken,
  validateSchema(addVetLocationSchema),
  VetLocations.addVetLocations
);

userRouter.get("/vet/list", verifyToken, VetLocations.listVetLocations);

userRouter.get(
  "/vet/detail/:id",
  verifyToken,
  validateParams(getDetailWithIdSchema),
  VetLocations.getSingleVetLocation
);

userRouter.delete(
  "/vet/delete/:id",
  verifyToken,
  validateParams(getDetailWithIdSchema),
  VetLocations.deleteVetLocation
);

userRouter.patch(
  "/vet/update/:id",
  verifyToken,
  validateParams(getDetailWithIdSchema),
  validateSchema(updateVetLocation),
  VetLocations.updateVetLocation
);

// ***********************************************USER HORSE HOTEL***************************************************

userRouter.post(
  "/horse-hotel/create",
  verifyToken,
  validateSchema(createHorseHotelSchema),
  HorseHotelController.createHorseHotel
);

userRouter.get(
  "/horse-hotel/list",
  verifyToken,
  HorseHotelController.listHorseHotel
);

userRouter.get(
  "/horse-hotel/detail/:id",
  verifyToken,
  validateParams(getDetailWithIdSchema),
  HorseHotelController.getHorseHotelDetail
);

userRouter.delete(
  "/horse-hotel/delete/:id",
  verifyToken,
  validateParams(getDetailWithIdSchema),
  HorseHotelController.deleteHorseHotel
);

// ***********************************************USER OTHER SERVICE ***************************************************

userRouter.post(
  "/other-service/create",
  verifyToken,
  validateSchema(createOtherServiceSchema),
  OtherServicesController.addOtherServices
);

userRouter.get(
  "/other-service/list",
  verifyToken,
  OtherServicesController.listOtherServices
);

userRouter.get(
  "/other-service/detail/:id",
  verifyToken,
  validateParams(getDetailWithIdSchema),
  OtherServicesController.getDetail
);

userRouter.delete(
  "/other-service/delete/:id",
  verifyToken,
  validateParams(getDetailWithIdSchema),
  OtherServicesController.deleteOtherService
);

userRouter.patch(
  "/other-service/update/:id",
  verifyToken,
  validateParams(getDetailWithIdSchema),
  validateSchema(updateOtherServiceSchema),
  OtherServicesController.updateOtherService
);

module.exports = userRouter;
