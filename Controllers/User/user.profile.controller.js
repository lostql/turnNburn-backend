const prisma = require("../../Configs/prisma.config");
const { handleOK } = require("../../responseHandlers/responseHandler");
const Utils = require("../../Utils/globalUtils");

class UserProfileController {
  static async createProfile(req, res, next) {
    try {
      const userId = req.user.id;
      let imageUrl = await Utils.handleS3Upload(
        req.file.path,
        req.file.filename,
        req.file.mimetype,
        "user"
      );
      const userPayload = Utils.removeNullValuesFromObject(req.body);
      const user = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          ...userPayload,
          isProfileCompleted: true,
          profileUrl: imageUrl,
          dob: new Date(req.body.dob),
        },
      });
      const token = Utils.generateToken({ userId: user.id });
      handleOK(
        res,
        200,
        { ...user, password: null },
        "Profile Completion Sucessfully",
        token
      );
    } catch (error) {
      next(error);
    }
  }

  static async getMe(req, res, next) {
    try {
      const userId = req.user.id;
      const user = await prisma.user.findFirst({
        where: {
          id: userId,
        },
      });
      handleOK(
        res,
        200,
        { ...user, password: null },
        "profile data fetched successfully"
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserProfileController;
