const prisma = require("../../../Configs/prisma.config");
const { ConflictError, NotFoundError } = require("../../../customError");
const { handleOK } = require("../../../responseHandlers/responseHandler");
const Utils = require("../../../Utils/globalUtils");

class OtherServicesController {
  static async addOtherServices(req, res, next) {
    try {
      const exist = await prisma.otherService.findFirst({
        where: {
          name: req.body.name,
        },
      });
      if (exist) {
        throw new ConflictError("service with this name already exists");
      }
      const service = await prisma.otherService.create({
        data: {
          ...req.body,
          userId: req.user.id,
        },
      });
      handleOK(res, 200, service, "other service created successfully");
    } catch (error) {
      next(error);
    }
  }

  static async getDetail(req, res, next) {
    try {
      const otherService = await Utils.findOneWithIdAndUserId(
        prisma.otherService,
        req.params.id,
        req.user.id
      );
      if (!otherService) {
        throw new NotFoundError("other service not found");
      }
      handleOK(res, 200, otherService, "fetched other service");
    } catch (error) {
      next(error);
    }
  }

  static async listOtherServices(req, res, next) {
    try {
      const otherServices = await prisma.otherService.findMany({
        where: {
          userId: req.user.id,
        },
      });
      handleOK(res, 200, otherServices, "fetched all other services");
    } catch (error) {
      next(error);
    }
  }

  static async updateOtherService(req, res, next) {
    try {
      const exist = await Utils.findOneWithIdAndUserId(
        prisma.otherService,
        req.params.id,
        req.user.id
      );
      if (!exist) {
        throw new NotFoundError("other service not found");
      }
      const updateOtherServicePayload = Utils.removeNullValuesFromObject(
        req.body
      );
      const updatedOtherService = await prisma.otherService.update({
        where: {
          id: exist.id,
        },
        data: updateOtherServicePayload,
      });
      handleOK(
        res,
        200,
        updatedOtherService,
        "other service updated successfully"
      );
    } catch (error) {
      next(error);
    }
  }

  static async deleteOtherService(req, res, next) {
    try {
      const exist = await Utils.findOneWithIdAndUserId(
        prisma.otherService,
        req.params.id,
        req.user.id
      );
      if (!exist) {
        throw new NotFoundError("other service not found");
      }
      await prisma.otherService.delete({
        where: {
          id: Number(req.params.id),
          userId: req.user.id,
        },
      });
      handleOK(res, 200, null, "other service deleted successfully");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = OtherServicesController;
