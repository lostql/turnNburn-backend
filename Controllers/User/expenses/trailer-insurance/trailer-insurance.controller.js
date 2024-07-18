const prisma = require("../../../../Configs/prisma.config");
const { handleOK } = require("../../../../responseHandlers/responseHandler");
const Utils = require("../../../../Utils/globalUtils");
const { NotFoundError } = require("../../../../customError");

class TrailerInsuranceController {
  static async createtrailerInsuranceExpense(req, res, next) {
    try {
      const trailerInsuranceExpense =
        await prisma.userTrailerInsuranceExpense.create({
          data: {
            ...req.body,
            date: new Date(req.body.date),
            policyStartDate: new Date(req.body.policyStartDate),
            policyEndDate: new Date(req.body.policyEndDate),
            userId: req.user.id,
          },
        });

      handleOK(
        res,
        200,
        trailerInsuranceExpense,
        "trailer insurance expense added successfully"
      );
    } catch (error) {
      next(error);
    }
  }

  static async updateTrailerInsuranceExpense(req, res, next) {
    try {
      const exist = await prisma.userTrailerInsuranceExpense.findFirst({
        where: {
          id: Number(req.params.id),
          userId: req.user.id,
        },
      });

      if (!exist) {
        throw new NotFoundError("trailer insurance expense not found");
      }

      const updateTrailerInsuranceExpensePayload =
        Utils.removeNullValuesFromObject(req.body);

      if (updateTrailerInsuranceExpensePayload.policyStartDate) {
        updateTrailerInsuranceExpensePayload.policyStartDate = new Date(
          updateTrailerInsuranceExpensePayload.policyStartDate
        );
      }

      if (updateTrailerInsuranceExpensePayload.policyEndDate) {
        updateTrailerInsuranceExpensePayload.policyEndDate = new Date(
          updateTrailerInsuranceExpensePayload.policyEndDate
        );
      }

      if (updateTrailerInsuranceExpensePayload.date) {
        updateTrailerInsuranceExpensePayload.date = new Date(
          updateTrailerInsuranceExpensePayload.date
        );
      }

      const updatedTrailerInsuranceExpense =
        await prisma.userTrailerInsuranceExpense.update({
          where: {
            id: exist.id,
          },
          data: updateTrailerInsuranceExpensePayload,
        });

      handleOK(
        res,
        200,
        updatedTrailerInsuranceExpense,
        "successfully updated trailer insurance expense"
      );
    } catch (error) {
      next(error);
    }
  }

  static async list(req, res, next) {
    try {
      const trailerInsuranceExpenseList =
        await prisma.userTrailerInsuranceExpense.findMany({
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
        trailerInsuranceExpenseList,
        "successfully fetched trailer insurance expenses"
      );
    } catch (error) {
      next(error);
    }
  }

  static async detail(req, res, next) {
    try {
      const exist = await prisma.userTrailerInsuranceExpense.findFirst({
        where: {
          userId: req.user.id,
          id: Number(req.params.id),
        },
      });

      if (!exist) {
        throw new NotFoundError("trailer insurance not found");
      }

      handleOK(
        res,
        200,
        exist,
        "successfully fetched trailer insurance expense"
      );
    } catch (error) {
      next(error);
    }
  }

  static async remove(req, res, next) {
    try {
      const exist = await prisma.userTrailerInsuranceExpense.findFirst({
        where: {
          id: Number(req.params.id),
          userId: req.user.id,
        },
      });

      if (!exist) {
        throw new NotFoundError("trailer insurance expense not found");
      }
      await prisma.userTrailerInsuranceExpense.delete({
        where: {
          id: exist.id,
        },
      });

      handleOK(
        res,
        200,
        null,
        "successfully deleted trailer insurance expense"
      );
    } catch (error) {
      next(error);
    }
  }

  static async totalCost(req, res, next) {
    try {
      const total = await prisma.userTrailerInsuranceExpense.aggregate({
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
        "successfully fetched total cost for trailer insurance expenses"
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TrailerInsuranceController;
