const prisma = require("../../../../Configs/prisma.config");
const { NotFoundError } = require("../../../../customError");
const DTO = require("../../../../dto");
const { handleOK } = require("../../../../responseHandlers/responseHandler");
const Utils = require("../../../../Utils/globalUtils");

class TrailerMaintenanceController {
  static async addTrailerMaintenance(req, res, next) {
    try {
      const trailerMaintenancePayload =
        DTO.transformTrailerMaintenanceExpensePayload(req.body, req.user.id);
      const trailerExpense = await prisma.userTrailerMaintenanceExpense.create({
        data: trailerMaintenancePayload,
      });
      handleOK(
        res,
        200,
        trailerExpense,
        "trailer-maintenance expenses added successfully"
      );
    } catch (error) {
      next(error);
    }
  }

  static async getAllTrailerssMaintenance(req, res, next) {
    try {
      const trailersMaintenance =
        await prisma.userTrailerMaintenanceExpense.findMany({
          where: {
            userId: req.body.id,
          },
        });
      handleOK(
        res,
        200,
        trailersMaintenance,
        "successfully fetched all vehicles maintenance expenses"
      );
    } catch (error) {
      next(error);
    }
  }

  static async getSingleVehicleMaintenanceExpense(req, res, next) {
    try {
      const trailersMaintenance =
        await prisma.userTrailerMaintenanceExpense.findFirst({
          where: {
            id: Number(req.params.id),
          },
        });
      if (!trailersMaintenance) {
        throw new NotFoundError("trailer Expense not found");
      }
      handleOK(res, 200, trailersMaintenance, "detail for vehicle maintenance");
    } catch (error) {
      next(error);
    }
  }

  static async deleteTrailerMaintenanceExpense(req, res, next) {
    try {
      const trailerMaintenance =
        await prisma.userTrailerMaintenanceExpense.findFirst({
          where: {
            id: Number(req.params.id),
          },
        });
      if (!trailerMaintenance) {
        throw new NotFoundError("trailer Expense not found");
      }
      await prisma.userTrailerMaintenanceExpense.delete({
        where: {
          id: Number(req.params.id),
        },
      });
      handleOK(res, 200, null, "data deleted successfully");
    } catch (error) {
      next(error);
    }
  }

  static async updateTrailerMaintenanceExpense(req, res, next) {
    try {
      const exist = await prisma.userTrailerMaintenanceExpense.findFirst({
        where: {
          id: Number(req.params.id),
        },
      });

      if (!exist) {
        throw new NotFoundError("Trailer expense not found");
      }

      const updateTrailerMaintenancePayload = Utils.removeNullValuesFromObject(
        req.body
      );

      if (updateTrailerMaintenancePayload.date) {
        updateTrailerMaintenancePayload.date = new Date(
          updateTrailerMaintenancePayload.date
        );
      }

      const updatedTrailerMaintenance =
        await prisma.userTrailerMaintenanceExpense.update({
          where: {
            id: exist.id,
            userId: req.user.id,
          },
          data: updateTrailerMaintenancePayload,
        });

      handleOK(
        res,
        200,
        updatedTrailerMaintenance,
        "trailer maintenance updated successfully"
      );
    } catch (error) {
      next(error);
    }
  }

  static async getTotalExpenseForTrailerMaintenance(req, res, next) {
    try {
      const totalCost = await prisma.userTrailerMaintenanceExpense.aggregate({
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

module.exports = TrailerMaintenanceController;
