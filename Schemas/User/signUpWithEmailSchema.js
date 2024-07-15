const { z } = require("zod");

const passwordSchema = z
  .string()
  .trim()
  .min(8, "Password must be at least 8 characters long")
  .regex(
    /[!@#$%^&*(),.?":{}|<>]/,
    "Password must include at least one special character"
  );

const signUpWithEmailSchema = z
  .object({
    email: z
      .string({ message: "email must be a string" })
      .email({ message: "Please enter valid email" }),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Both new passwords must be the same",
        path: ["newConfirmPassword"],
      });
    }
  });

module.exports = signUpWithEmailSchema;
