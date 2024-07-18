const TrailerMaintenanceController = require("../Controllers/User/expenses/trailer-maintenance/trailer-maintenance.controller");
const VehicleMaintenanceController = require("../Controllers/User/expenses/vehicle-maintenance/vehicle-maintenance.controller");
const { verifyToken } = require("../Middlewares/auth.middleware");
const { validateParams } = require("../Middlewares/validateParams");
const { validateSchema } = require("../Middlewares/validateSchema");
const getDetailWithIdSchema = require("../Schemas/common/getDetailWithIdSchema");
const addVehicleExpenseSchema = require("../Schemas/User/Expenses/addVehicleExpenseSchema");
const addTrailerMaintenanceSchema = require("../Schemas/User/Expenses/trailer-maintenance/addTrailerMaintenanceSchema");
const updateTrailerMaintenanceSchema = require("../Schemas/User/Expenses/trailer-maintenance/updateTrailerMaintenanceSchema");
const updateVehicleExpenseSchema = require("../Schemas/User/Expenses/updateVehicleExpenseSchema");

const userExpenseRouter = require("express").Router();

// ***************************************VEHICLE MAINTENANCE ***************************
userExpenseRouter.post(
  "/add/vehicle-maintenance",
  verifyToken,
  validateSchema(addVehicleExpenseSchema),
  VehicleMaintenanceController.addVehicleMaintenance
);

userExpenseRouter.get(
  "/list/vehicle-maintenance",
  verifyToken,
  VehicleMaintenanceController.getAllVehiclesMaintenance
);

userExpenseRouter.get(
  "/single/vehicle-maintenance/:id",
  verifyToken,
  validateParams(getDetailWithIdSchema),
  VehicleMaintenanceController.getSingleVehicleMaintenanceExpense
);

userExpenseRouter.patch(
  "/single/vehicle-maintenance/:id",
  verifyToken,
  validateParams(getDetailWithIdSchema),
  validateSchema(updateVehicleExpenseSchema),
  VehicleMaintenanceController.updateVehicleMaintenanceExpense
);

userExpenseRouter.delete(
  "/single/vehicle-maintenance/:id",
  verifyToken,
  validateParams(getDetailWithIdSchema),
  VehicleMaintenanceController.deleteVehicleMaintenanceExpense
);

userExpenseRouter.get(
  "/total-cost/vehicle-maintenance",
  verifyToken,
  VehicleMaintenanceController.getTotalExpenseForVehicleMaintenance
);

// ***************************************TRAILER MAINTENANCE ***************************
userExpenseRouter.post(
  "/add/trailer-maintenance",
  verifyToken,
  validateSchema(addTrailerMaintenanceSchema),
  TrailerMaintenanceController.addTrailerMaintenance
);

userExpenseRouter.get(
  "/list/trailer-maintenance",
  verifyToken,
  TrailerMaintenanceController.getAllTrailerssMaintenance
);

userExpenseRouter.get(
  "/single/trailer-maintenance/:id",
  verifyToken,
  validateParams(getDetailWithIdSchema),
  TrailerMaintenanceController.getSingleVehicleMaintenanceExpense
);

userExpenseRouter.delete(
  "/single/trailer-maintenance/:id",
  verifyToken,
  validateParams(getDetailWithIdSchema),
  TrailerMaintenanceController.deleteTrailerMaintenanceExpense
);

userExpenseRouter.patch(
  "/update/trailer-maintenance/:id",
  verifyToken,
  validateParams(getDetailWithIdSchema),
  validateSchema(updateTrailerMaintenanceSchema),
  TrailerMaintenanceController.updateTrailerMaintenanceExpense
);

userExpenseRouter.get(
  "/total-cost/trailer-maintenance",
  verifyToken,
  TrailerMaintenanceController.getTotalExpenseForTrailerMaintenance
);

module.exports = userExpenseRouter;
