const { z } = require("zod");
const baseStringSchema = require("../../../common/baseStringSchema");
const baseNumberSchema = require("../../../common/baseNumberSchema");

const createTrackExpenseSchema = z.object({
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "date must be in YYYY-MM-DD format",
    })
    .refine((value) => !isNaN(Date.parse(value)), {
      message: "date should be a valid date",
    }),
  item: z.string().trim().min(1, { message: "item cannot be left empty" }),
  cost: baseNumberSchema("cost"),
});

module.exports = createTrackExpenseSchema;
