const VehicleMaintenanceController = require("../Controllers/User/expenses/vehicle-maintenance/vechile-maintenance.controller");
const { verifyToken } = require("../Middlewares/auth.middleware");
const { validateParams } = require("../Middlewares/validateParams");
const { validateSchema } = require("../Middlewares/validateSchema");
const getDetailWithIdSchema = require("../Schemas/common/getDetailWithIdSchema");
const addVehicleExpenseSchema = require("../Schemas/User/Expenses/addVehicleExpenseSchema");
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
module.exports = userExpenseRouter;
