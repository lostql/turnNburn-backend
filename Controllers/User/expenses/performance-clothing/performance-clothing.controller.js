const prisma = require("../../../../Configs/prisma.config");
const { handleOK } = require("../../../../responseHandlers/responseHandler");
const Utils = require("../../../../Utils/globalUtils");
const { NotFoundError } = require("../../../../customError");

class PerformanceClothingExpenseController {
  static async addPerformanceClothingExpense(req, res, next) {
    try {
      const performanceClothing = await prisma.userPerformanceClothing.create({
        data: {
          ...req.body,
          date: new Date(req.body.date),
          userId: req.user.id,
        },
      });

      handleOK(
        res,
        200,
        performanceClothing,
        "successfully added performance clothing expense"
      );
    } catch (error) {
      next(error);
    }
  }

  static async updatePerformanceClothingExpense(req, res, next) {
    try {
      const exist = await Utils.findOneWithIdAndUserId(
        prisma.userPerformanceClothing,
        req.params.id,
        req.user.id
      );
      if (!exist) {
        throw new NotFoundError("performance clothing expense not found");
      }
      const performanceClothingExpensePayload =
        Utils.removeNullValuesFromObject(req.body);

      if (performanceClothingExpensePayload.date) {
        performanceClothingExpensePayload.date = new Date(
          performanceClothingExpensePayload.date
        );
      }

      const updatedPerformanceClothing =
        await prisma.userPerformanceClothing.update({
          where: {
            id: exist.id,
          },
          data: performanceClothingExpensePayload,
        });

      handleOK(
        res,
        200,
        updatedPerformanceClothing,
        "record updated successfully"
      );
    } catch (error) {
      next(error);
    }
  }

  static async list(req, res, next) {
    try {
      const list = await prisma.userPerformanceClothing.findMany({
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
        list,
        "successfully fetched performance clothing expenses"
      );
    } catch (error) {
      next(error);
    }
  }

  static async detail(req, res, next) {
    try {
      const exist = await Utils.findOneWithIdAndUserId(
        prisma.userPerformanceClothing,
        req.params.id,
        req.user.id
      );
      if (!exist) {
        throw new NotFoundError("performance clothing expense not found");
      }

      handleOK(
        res,
        200,
        exist,
        "successfully fetch performance clothing expense"
      );
    } catch (error) {
      next(error);
    }
  }

  static async remove(req, res, next) {
    try {
      const exist = await Utils.findOneWithIdAndUserId(
        prisma.userPerformanceClothing,
        req.params.id,
        req.user.id
      );
      if (!exist) {
        throw new NotFoundError("Performance clothing expense not found");
      }

      await prisma.userPerformanceClothing.delete({
        where: {
          id: exist.id,
        },
      });

      handleOK(res, 200, "performance clothing expense deleted successfully");
    } catch (error) {
      next(error);
    }
  }

  static async fetchTotalCost(req, res, next) {
    try {
      const total = await prisma.userPerformanceClothing.aggregate({
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
        { cost: total._sum.cost },
        "successfully fetched total cost for perfomance clothing"
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PerformanceClothingExpenseController;
