const { z } = require("zod");
const baseStringSchema = require("../../common/baseStringSchema");

const createOtherServiceSchema = z.object({
  name: baseStringSchema("name"),
  email: baseStringSchema("email").email({
    message: "enter valid email address",
  }),
  phoneNumber: baseStringSchema("phoneNumber"),
  address: baseStringSchema("address"),
  cost: z.coerce
    .number({
      invalid_type_error: "cost must be of type number",
      required_error: "cost is required",
    })
    .min(1, { message: "cost cannot be less than 1" }),
});

module.exports = createOtherServiceSchema;
