const { z } = require("zod");
const baseStringSchema = require("../../common/baseStringSchema");

const updateOtherServiceSchema = z.object({
  name: baseStringSchema("name").nullable().optional(),
  email: baseStringSchema("email")
    .email({
      message: "enter valid email address",
    })
    .nullable()
    .optional(),
  phoneNumber: baseStringSchema("phoneNumber").nullable().optional(),
  address: baseStringSchema("address").nullable().optional(),
  cost: z.coerce
    .number({
      invalid_type_error: "cost must be of type number",
      required_error: "cost is required",
    })
    .min(1, { message: "cost cannot be less than 1" })
    .nullable()
    .optional(),
});

module.exports = updateOtherServiceSchema;
