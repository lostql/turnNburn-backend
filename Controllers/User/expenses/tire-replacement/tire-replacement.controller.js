const prisma = require("../../../../Configs/prisma.config");
const { NotFoundError } = require("../../../../customError");
const { handleOK } = require("../../../../responseHandlers/responseHandler");
const { TireReplacementType } = require("../../../../Utils/constants");
const Utils = require("../../../../Utils/globalUtils");

class TireReplacementExpenseController {
  //create
  static async createTireReplacementExpense(req, res, next) {
    try {
      const tireExpense = await prisma.tireReplacementExpense.create({
        data: {
          ...req.body,
          userId: req.user.id,
          date: new Date(req.body.date),
        },
      });
      handleOK(res, 200, tireExpense, "tire expense added successfully");
    } catch (error) {
      next(error);
    }
  }

  //update
  static async updateTireReplacementExpense(req, res, next) {
    try {
      const exist = await Utils.findOneWithIdAndUserId(
        prisma.tireReplacementExpense,
        req.params.id,
        req.user.id
      );

      if (!exist) {
        throw new NotFoundError("tire replacement not found");
      }

      const updateTireReplacementExpense = Utils.removeNullValuesFromObject(
        req.body
      );
      if (updateTireReplacementExpense.date) {
        updateTireReplacementExpense.date = new Date(
          updateTireReplacementExpense.date
        );
      }
      const updatedTireReplacement = await prisma.tireReplacementExpense.update(
        {
          where: {
            id: exist.id,
          },
          data: updateTireReplacementExpense,
        }
      );

      handleOK(
        res,
        200,
        updatedTireReplacement,
        "tire replacement updated successfully"
      );
    } catch (error) {
      next(error);
    }
  }

  //list all tire expenses based on type
  static async listTireReplacementExpense(req, res, next) {
    try {
      const { type } = req.params;
      const list = await prisma.tireReplacementExpense.findMany({
        where: {
          userId: req.user.id,
          TireReplacementType: {
            name: type,
          },
        },
        orderBy: {
          date: "desc",
        },
      });
      handleOK(
        res,
        200,
        list,
        `successfully fetched tire replacement expense for type ${type}`
      );
    } catch (error) {
      next(error);
    }
  }

  //get detail for single tire replacement
  static async tireReplacementExpenseDetail(req, res, next) {
    try {
      const exist = await Utils.findOneWithIdAndUserId(
        prisma.tireReplacementExpense,
        req.params.id,
        req.user.id
      );

      if (!exist) {
        throw new NotFoundError("tire replacement expense not found");
      }

      handleOK(
        res,
        200,
        exist,
        "successfully fetched single tire replacement expense"
      );
    } catch (error) {
      next(error);
    }
  }

  //delete single tire replacement
  static async deleteTireReplacementExpense(req, res, next) {
    try {
      const exist = await Utils.findOneWithIdAndUserId(
        prisma.tireReplacementExpense,
        req.params.id,
        req.user.id
      );

      if (!exist) {
        throw new NotFoundError("Tire Expense Not Found");
      }

      await prisma.tireReplacementExpense.delete({
        where: {
          id: exist.id,
        },
      });

      handleOK(res, 200, null, "tire replacement deleted successfully");
    } catch (error) {
      next(error);
    }
  }

  static async fetchTotalCostForTrailerType(req, res, next) {
    try {
      const totalCost = await prisma.tireReplacementExpense.aggregate({
        _sum: {
          cost: true,
        },
        where: {
          userId: req.user.id,
          TireReplacementType: {
            name: TireReplacementType.TRAILER,
          },
        },
      });

      handleOK(
        res,
        200,
        { cost: totalCost._sum.cost },
        "fetched total cost of tire replacement for type trailer"
      );
    } catch (error) {
      next(error);
    }
  }

  static async fetchTotalCostForTruckType(req, res, next) {
    try {
      const totalCost = await prisma.tireReplacementExpense.aggregate({
        _sum: {
          cost: true,
        },
        where: {
          userId: req.user.id,
          TireReplacementType: {
            name: TireReplacementType.TRUCK,
          },
        },
      });

      handleOK(
        res,
        200,
        { cost: totalCost._sum.cost },
        "fetched total cost of tire replacement for type truck"
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TireReplacementExpenseController;
