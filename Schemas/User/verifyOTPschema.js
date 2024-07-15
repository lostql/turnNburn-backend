const { z } = require("zod");

const verifyOTPSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  otp: z
    .string()
    .trim()
    .min(1, { message: "otp is required" })
    .length(6, { message: "OTP must be 6 numbers long" }),
  password: z
    .string()
    .trim()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

module.exports = verifyOTPSchema;
