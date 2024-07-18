const { z } = require("zod");
const baseNumberSchema = require("../../../common/baseNumberSchema");
const baseStringSchema = require("../../../common/baseStringSchema");

const addTireReplacementExpense = z.object({
  tireReplacementTypeId: z.coerce
    .number({
      invalid_type_error: "tireReplacementTypeId must be of type number",
      required_error: "tireReplacementTypeId is required",
    })
    .min(1, { message: "invalid id, cannot be less than 0" }),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "date must be in YYYY-MM-DD format",
    })
    .refine((value) => !isNaN(Date.parse(value)), {
      message: "date should be a valid date",
    }),
  brand: baseStringSchema("brand"),
  cost: baseNumberSchema("cost"),
  mileage: baseNumberSchema("mileage"),
});

module.exports = addTireReplacementExpense;
