const { z } = require("zod");

const signInSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email format" })
    .trim()
    .min(1, { message: "email is required" }),
  password: z.string().trim().min(1, { message: "password is required" }),
});

module.exports = signInSchema;
