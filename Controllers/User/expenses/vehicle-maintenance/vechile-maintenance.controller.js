const { NotBeforeError } = require("jsonwebtoken");
const prisma = require("../../../../Configs/prisma.config");
const DTO = require("../../../../dto");
const { handleOK } = require("../../../../responseHandlers/responseHandler");
const Utils = require("../../../../Utils/globalUtils");

class VehicleMaintenanceController {
  static async addVehicleMaintenance(req, res, next) {
    try {
      const vehicleMaintenancePayload =
        DTO.transformVehicleMaintenanceExpensePayload(req.body, req.user.id);
      const vehicleExpense = await prisma.userVehicleMaintenanceExpense.create({
        data: vehicleMaintenancePayload,
      });
      handleOK(
        res,
        200,
        vehicleExpense,
        "vehicle-maintenance expenses added successfully"
      );
    } catch (error) {
      next(error);
    }
  }

  static async getAllVehiclesMaintenance(req, res, next) {
    try {
      const vehiclesmaintenance =
        await prisma.userVehicleMaintenanceExpense.findMany({
          where: {
            userId: req.body.id,
          },
        });
      handleOK(
        res,
        200,
        vehiclesmaintenance,
        "successfully fetched all vehicles maintenance expenses"
      );
    } catch (error) {
      next(error);
    }
  }

  static async getSingleVehicleMaintenanceExpense(req, res, next) {
    try {
      const vehiclemaintenance =
        await prisma.userVehicleMaintenanceExpense.findFirst({
          where: {
            id: Number(req.params.id),
          },
        });
      if (!vehiclemaintenance) {
        throw new NotBeforeError("Vehicle Expense not found");
      }
      handleOK(res, 200, vehiclemaintenance, "detail for vehicle maintenance");
    } catch (error) {
      next(error);
    }
  }

  static async deleteVehicleMaintenanceExpense(req, res, next) {
    try {
      const vehiclemaintenance =
        await prisma.userVehicleMaintenanceExpense.findFirst({
          where: {
            id: Number(req.params.id),
          },
        });
      if (!vehiclemaintenance) {
        throw new NotBeforeError("Vehicle Expense not found");
      }
      await prisma.userVehicleMaintenanceExpense.delete({
        where: {
          id: Number(req.params.id),
        },
      });
      handleOK(res, 200, null, "data deleted successfully");
    } catch (error) {
      next(error);
    }
  }

  static async updateVehicleMaintenanceExpense(req, res, next) {
    try {
      const updateVehicleMaintenancePayload = Utils.removeNullValuesFromObject(
        req.body
      );
      if (updateVehicleMaintenancePayload.date) {
        updateVehicleMaintenancePayload.date = new Date(
          updateVehicleMaintenancePayload.date
        );
      }
      const updatedVehicleMaintenance =
        await prisma.userVehicleMaintenanceExpense.update({
          where: {
            id: Number(req.params.id),
            userId: req.user.id,
          },
          data: {
            ...updateVehicleMaintenancePayload,
          },
        });
      handleOK(
        res,
        200,
        updatedVehicleMaintenance,
        "vehicle maintenance updated successfully"
      );
    } catch (error) {
      next(error);
    }
  }

  static async getTotalExpenseForVehicleMaintenance(req, res, next) {
    try {
      const totalCost = await prisma.userVehicleMaintenanceExpense.aggregate({
        _sum: {
          cost: true,
        },
        where: {
          userId: req.user.id,
        },
      });
      handleOK(res, 200, totalCost._sum.cost, "total cost fetched");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = VehicleMaintenanceController;
