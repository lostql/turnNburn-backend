const prisma = require("../../../Configs/prisma.config");
const { NotFoundError, ConflictError } = require("../../../customError");
const { handleOK } = require("../../../responseHandlers/responseHandler");
const Utils = require("../../../Utils/globalUtils");

class VetLocations {
  static async addVetLocations(req, res, next) {
    try {
      const exist = await prisma.vet.findFirst({
        where: {
          clinic: req.body.clinic,
        },
      });
      if (exist) {
        throw new ConflictError("Vet location with name already exists");
      }
      const vet = await prisma.vet.create({
        data: { ...req.body, userId: req.user.id },
      });
      handleOK(res, 200, vet, "vet location added successfully");
    } catch (error) {
      next(error);
    }
  }

  static async listVetLocations(req, res, next) {
    try {
      const vetLocations = await prisma.vet.findMany({
        where: {
          userId: req.user.id,
        },
      });
      handleOK(res, 200, vetLocations, "fetched all vet locations");
    } catch (error) {
      next(error);
    }
  }

  static async getSingleVetLocation(req, res, next) {
    try {
      const vet = await prisma.vet.findFirst({
        where: {
          id: Number(req.params.id),
          userId: req.user.id,
        },
      });
      if (!vet) {
        throw new NotFoundError("vet location not found");
      }
      handleOK(res, 200, vet, "fetched sinlge vet location");
    } catch (error) {
      next(error);
    }
  }

  static async deleteVetLocation(req, res, next) {
    try {
      const vet = await prisma.vet.findFirst({
        where: {
          id: Number(req.params.id),
          userId: req.user.id,
        },
      });
      if (!vet) {
        throw new NotFoundError("vet location not found");
      }
      await prisma.vet.delete({
        where: {
          id: vet.id,
        },
      });
      handleOK(res, 200, null, "vet location deleted successfully");
    } catch (error) {
      next(error);
    }
  }

  static async updateVetLocation(req, res, next) {
    try {
      const updateVetLocationPayload = Utils.removeNullValuesFromObject(
        req.body
      );
      const vet = await prisma.vet.findFirst({
        where: {
          id: Number(req.params.id),
          userId: req.user.id,
        },
      });
      if (!vet) {
        throw new NotFoundError("Vet location not found");
      }
      const updatedVetLocation = await prisma.vet.update({
        where: {
          id: vet.id,
          userId: req.user.id,
        },
        data: updateVetLocationPayload,
      });
      handleOK(
        res,
        200,
        updatedVetLocation,
        "Vet Location updated successfully"
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = VetLocations;
