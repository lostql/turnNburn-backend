const { PutObjectCommand } = require("@aws-sdk/client-s3");
const jwt = require("jsonwebtoken");
const s3 = require("../configs/s3.config");
const fs = require("fs");
const transporter = require("../Configs/nodemailer.config");

class Utils {
  static generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  static verifyOTP(requestOTP, otp, createdAt) {
    const now = new Date();
    const created_at = new Date(createdAt);
    const timeDiffSeconds = Math.floor((now - created_at) / 1000);
    return requestOTP == otp && timeDiffSeconds <= 70;
  }

  static async sendMail(reciever, subject, text, html = null) {
    try {
      await transporter.sendMail({
        from: process.env.DEV_EMAIL_USER,
        to: reciever,
        subject: subject,
        text: text,
        html: `<b>${text}</b>`,
      });
    } catch (error) {
      console.error(error, "error sending email");
    }
  }

  static generateToken(payload) {
    try {
      return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "2d",
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  static removeNullValuesFromObject(object) {
    try {
      if (!Object.keys(object).length) {
        return;
      }
      return Object.fromEntries(
        Object.entries(object).filter(([_, value]) => value != null)
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  static async handleS3Upload(path, filename, contentType, folder) {
    try {
      const fileBuffer = fs.readFileSync(path);
      const command = new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: `${folder}/${filename}`,
        ContentType: contentType,
        Body: fileBuffer,
      });
      await s3.send(command);
      fs.unlinkSync(path);
      return `${process.env.AWS_S3_URL}/${folder}/${filename}`;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async findOneWithIdAndUserId(model, id, userId) {
    return model.findFirst({
      where: {
        id: Number(id),
        userId: userId,
      },
    });
  }
}

module.exports = Utils;
