const { z } = require("zod");

const signUpWithEmailSchema = z.object({
  email: z
    .string({ message: "email must be a string" })
    .email({ message: "Please enter valid email" }),
});

module.exports = signUpWithEmailSchema;
