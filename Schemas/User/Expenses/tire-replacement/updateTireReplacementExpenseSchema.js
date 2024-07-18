const { z } = require("zod");
const baseStringSchema = require("../../../common/baseStringSchema");
const baseNumberSchema = require("../../../common/baseNumberSchema");

const updateTireReplacementExpenseSchema = z.object({
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "date must be in YYYY-MM-DD format",
    })
    .nullable()
    .optional()
    .refine((value) => !isNaN(Date.parse(value)), {
      message: "date should be a valid date",
    })
    .nullable()
    .optional(),
  brand: baseStringSchema("brand").nullable().optional(),
  cost: baseNumberSchema("cost").nullable().optional(),
  mileage: baseNumberSchema("mileage").nullable().optional(),
});

module.exports = updateTireReplacementExpenseSchema;
