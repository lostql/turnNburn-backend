const prisma = require("../../../../Configs/prisma.config");
const { NotFoundError } = require("../../../../customError");
const { handleOK } = require("../../../../responseHandlers/responseHandler");
const Utils = require("../../../../Utils/globalUtils");

class TrackExpenseController {
  static async createTrackExpense(req, res, next) {
    try {
      const track = await prisma.userTackExpense.create({
        data: {
          ...req.body,
          userId: req.user.id,
          date: new Date(req.body.date),
        },
      });
      handleOK(res, 200, track, "track expense added successfully");
    } catch (error) {
      next(error);
    }
  }

  static async updateTrackExpense(req, res, next) {
    try {
      const exist = await Utils.findOneWithIdAndUserId(
        prisma.userTackExpense,
        req.params.id,
        req.user.id
      );

      if (!exist) {
        throw new NotFoundError("track expense not found");
      }

      const updateTrackExpensePayload = Utils.removeNullValuesFromObject(
        req.body
      );
      if (updateTrackExpensePayload.date) {
        updateTrackExpensePayload.date = new Date(
          updateTrackExpensePayload.date
        );
      }
      const updatedTrackExpense = await prisma.userTackExpense.update({
        where: {
          id: exist.id,
        },
        data: updateTrackExpensePayload,
      });

      handleOK(
        res,
        200,
        updatedTrackExpense,
        "track expense updated successfully"
      );
    } catch (error) {
      next(error);
    }
  }

  static async getTrackExpenseDetail(req, res, next) {
    try {
      const track = await Utils.findOneWithIdAndUserId(
        prisma.userTackExpense,
        req.params.id,
        req.user.id
      );
      if (!track) {
        throw new NotFoundError("track expense not found");
      }
      handleOK(res, 200, track, "track expense detail fetched");
    } catch (error) {
      next(error);
    }
  }

  static async listTrackExpenses(req, res, next) {
    try {
      const trackExpenses = await prisma.userTackExpense.findMany({
        where: {
          userId: req.user.id,
        },
        orderBy: {
          date: "desc",
        },
      });

      handleOK(
        res,
        200,
        trackExpenses,
        "successfully fetched all track expenses"
      );
    } catch (error) {
      next(error);
    }
  }

  static async deleteTrackExpense(req, res, next) {
    try {
      const exist = await Utils.findOneWithIdAndUserId(
        prisma.userTackExpense,
        req.params.id,
        req.user.id
      );
      if (!exist) {
        throw new NotFoundError("track expense not found");
      }
      await prisma.userTackExpense.delete({
        where: {
          id: exist.id,
        },
      });
      handleOK(res, 200, null, "track expense deleted successfully");
    } catch (error) {
      next(error);
    }
  }

  static async fetchTotalCost(req, res, next) {
    try {
      const total = await prisma.userTackExpense.aggregate({
        _sum: {
          cost: true,
        },
        where: {
          userId: req.user.id,
        },
      });
      handleOK(
        res,
        200,
        total._sum.cost,
        "successfully fetched total cost for track expense"
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TrackExpenseController;
