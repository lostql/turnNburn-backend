const { z } = require("zod");

const addVehicleExpenseSchema = z.object({
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "date must be in YYYY-MM-DD format",
    })
    .refine((value) => !isNaN(Date.parse(value)), {
      message: "date should be a valid date",
    }),
  cost: z.coerce
    .number({ message: "cost must be of type number" })
    .min(0, { message: "cost cannot be less than 0" }),

  mileage: z.coerce
    .number({ message: "mileage must be of type number" })
    .min(-1, { message: "mileage cannot be less than 0" }),
  repair: z.string().trim().min(1, { message: "repair cannot be left empty" }),
});

module.exports = addVehicleExpenseSchema;
