const { z } = require("zod");

const createProfileSchema = z.object({
  firstName: z.string().trim().min(1, { message: "First name is required" }),
  lastName: z.string().trim().min(1, { message: "Last name is required" }),
  gender: z.string().trim().min(1, { message: "Gender is required" }),
  dob: z.string().refine((value) => !isNaN(Date.parse(value)), {
    message: "Date of birth is required and should be a valid date",
  }),
  address: z
    .string()
    .min(1, { message: "Address is required" })
    .max(190, { message: "Address cannot exceed 190 characters" }),
  city: z.string().trim().min(1, { message: "City is required" }),
  state: z.string().trim().min(1, { message: "State is required" }),
  about: z.string().trim().min(1, { message: "About is required" }),
});

module.exports = createProfileSchema;
