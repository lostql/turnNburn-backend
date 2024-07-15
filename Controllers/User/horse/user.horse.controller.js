const prisma = require("../../../Configs/prisma.config");
const { BadRequestError } = require("../../../customError");
const DTO = require("../../../dto");
const { handleOK } = require("../../../responseHandlers/responseHandler");
const Utils = require("../../../Utils/globalUtils");

class UserHorseController {
  static async createHorse(req, res, next) {
    try {
      console.log(req.body);
      const existHorseWithSameName = await prisma.horse.findFirst({
        where: {
          horseName: req.body.horseName,
        },
      });
      if (existHorseWithSameName) {
        throw new BadRequestError("Horse with this name already exists");
      }
      const createHorsePayload = DTO.transformCreateHorsePayload(
        req.body,
        req.user.id
      );
      console.log(createHorsePayload);
      const horse = await prisma.horse.create({
        data: createHorsePayload,
      });

      const horseImages = await Promise.all(
        req.files.map(async (image) => {
          const url = await Utils.handleS3Upload(
            image.path,
            image.filename,
            image.mimetype,
            "horse"
          );
          return { horseUrl: url, horseId: horse.id };
        })
      );

      await prisma.horseImage.createMany({
        data: horseImages,
      });

      handleOK(res, 200, null, "sucess");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserHorseController;
