const { z } = require("zod");

const baseStringSchema = (field) =>
  z
    .string({ message: `${field} is required` })
    .trim()
    .min(1, { message: `${field} cannot be left empty` })
    .max(190, { message: `${field} cannot exceed 190 characters` });

const createHorseHotelSchema = z.object({
  name: baseStringSchema("name"),
  phoneNumber: baseStringSchema("phoneNumber"),
  email: baseStringSchema("email").email({ message: "email is required" }),
  address: baseStringSchema("address"),
  stallCost: z.coerce
    .number({ message: "stall cost is required" })
    .min(1, { message: "stall Cost cannot be less than 1" }),
  rvHookUp: z.boolean({
    invalid_type_error: "rvHookUp must be of type boolean",
    required_error: "rvHookUp is required",
  }),
  rvCost: z.coerce
    .number({
      required_error: "rvCost is required",
      invalid_type_error: "rvCost must be of type number",
    })
    .min(1, { message: "rvCost cannot be less than 1" }),
});

module.exports = createHorseHotelSchema;
