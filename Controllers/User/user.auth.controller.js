const prisma = require("../../Configs/prisma.config");
const bcrypt = require("bcryptjs");
const Utils = require("../../Utils/globalUtils");
const { BadRequestError } = require("../../customError");
const { handleOK } = require("../../responseHandlers/responseHandler");

class UserAuthController {
  static async signUpWithEmail(req, res, next) {
    try {
      const { email } = req.body;
      const existUser = await prisma.user.findFirst({
        where: {
          email,
        },
      });
      if (existUser) {
        throw new BadRequestError("Profile with this email already exists");
      }
      const otp = Utils.generateOTP();
      const newOTP = await prisma.userOtp.upsert({
        where: {
          email,
        },
        update: {
          isUsed: false,
          otp,
        },
        create: {
          email,
          otp,
        },
      });
      await Utils.sendMail(
        email,
        "Email Verification",
        `Enter this ${newOTP.otp} otp to verify your email`
      );
      handleOK(
        res,
        200,
        null,
        "An otp has been sent to your mail for email verification"
      );
    } catch (error) {
      next(error);
    }
  }

  static async verifyOTP(req, res, next) {
    try {
      const { otp, email, password } = req.body;
      const existotp = await prisma.userOtp.findFirst({
        where: {
          isUsed: false,
          email,
          otp,
        },
      });
      if (!existotp) {
        throw new BadRequestError("Invalid OTP");
      }
      if (!Utils.verifyOTP(otp, existotp.otp, existotp.updatedAt)) {
        await prisma.userOtp.update({
          where: {
            email: email,
            otp: otp,
            isUsed: false,
          },
          data: {
            isUsed: true,
          },
        });
        throw new BadRequestError("OTP expired, please try again");
      }
      const hashPassword = bcrypt.hashSync(password, 10);
      const [updatedOTP, user] = await Promise.all([
        prisma.userOtp.update({
          where: {
            otp,
          },
          data: {
            isUsed: true,
          },
        }),
        prisma.user.create({
          data: {
            email,
            password: hashPassword,
          },
        }),
      ]);
      const token = Utils.generateToken({ userId: user.id });
      handleOK(
        res,
        200,
        null,
        "Email verified successfully, Now please complete profile",
        token
      );
    } catch (error) {
      next(error);
    }
  }

  static async signInWithEmail(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (!user) {
        throw new BadRequestError("Invalid credentials");
      }

      if (!bcrypt.compareSync(password, user.password)) {
        throw new BadRequestError("Invalid credentials");
      }

      const token = Utils.generateToken({ userId: user.id });

      if (!user.isProfileCompleted) {
        return handleOK(
          res,
          200,
          { ...user, password: null },
          "Please complete your profile to continue",
          token
        );
      } else {
        handleOK(res, 200, user, "Successfully logged in", token);
      }
    } catch (error) {
      next(error);
    }
  }

  //if profile is not completed then fe will send me payload except email and password
  static async createProfile(req, res, next) {
    try {
      const userId = req.user.id;
      const userPayload = Utils.removeNullValuesFromObject(req.body);
      const user = await prisma.user.create({
        data: {
          ...userPayload,
          isProfileCompleted: true,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserAuthController;
