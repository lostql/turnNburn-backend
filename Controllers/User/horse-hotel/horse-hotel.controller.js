const prisma = require("../../../Configs/prisma.config");
const { ConflictError, NotFoundError } = require("../../../customError");
const { handleOK } = require("../../../responseHandlers/responseHandler");
const Utils = require("../../../Utils/globalUtils");

class HorseHotelController {
  static async createHorseHotel(req, res, next) {
    try {
      const existWithSameName = await prisma.horseHotel.findFirst({
        where: {
          name: req.body.name,
        },
      });
      if (existWithSameName) {
        throw new ConflictError("horse hotel with this name already exists");
      }
      const horse = await prisma.horseHotel.create({
        data: { ...req.body, userId: req.user.id },
      });
      handleOK(res, 200, horse, "horse hotel created successfully");
    } catch (error) {
      next(error);
    }
  }

  static async updateHorseHotel(req, res, next) {
    try {
      const updateHorseHotelPayload = Utils.removeNullValuesFromObject(
        req.body
      );
      const updatedHorseHotel = await prisma.horseHotel.update({
        where: {
          id: Number(req.params.id),
          userId: req.user.id,
        },
        data: updateHorseHotelPayload,
      });
      handleOK(
        res,
        200,
        updateHorseHotelPayload,
        "horse hotel updated successfully"
      );
    } catch (error) {
      next(error);
    }
  }

  static async listHorseHotel(req, res, next) {
    try {
      const list = await prisma.horseHotel.findMany({
        where: {
          userId: req.user.id,
        },
      });
      handleOK(res, 200, list, "successfully fetched horse hotels list");
    } catch (error) {
      next(error);
    }
  }

  static async getHorseHotelDetail(req, res, next) {
    try {
      const horseHotel = await prisma.horseHotel.findFirst({
        where: {
          id: Number(req.params.id),
          userId: req.user.id,
        },
      });
      if (!horseHotel) {
        throw new NotFoundError("horse hotel not found");
      }
      handleOK(res, 200, horseHotel, "successfuly fetch horse hotel detail");
    } catch (error) {
      next(error);
    }
  }

  static async deleteHorseHotel(req, res, next) {
    try {
      const horseHotel = await prisma.horseHotel.findFirst({
        where: {
          id: Number(req.params.id),
          userId: req.user.id,
        },
      });
      if (!horseHotel) {
        throw new NotFoundError("horse hotel not found");
      }
      await prisma.horseHotel.delete({
        where: {
          id: horseHotel.id,
        },
      });
      handleOK(res, 200, null, "horse hotel deleted successfully");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = HorseHotelController;
