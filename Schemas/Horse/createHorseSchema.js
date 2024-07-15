const { z } = require("zod");

const createHorseSchema = z.object({
  horseName: z.string().min(1, { message: "horse name is required" }),
  registrationNumber: z
    .string()
    .min(1, { message: "registration number is required" }),
  height: z.coerce.number({ message: "height must be of type number" }),
  weight: z.coerce.number({ message: "weight must be of type number" }),
  dob: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Date of birth must be in YYYY-MM-DD format",
    })
    .refine((value) => !isNaN(Date.parse(value)), {
      message: "Date of birth is required and should be a valid date",
    }),
  feed: z.string().min(1, { message: "feed is required" }),
  maintenanceSupplements: z
    .string()
    .min(1, { message: "maintenanceSupplements is required" }),
  scheduledTime: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "scheduledTime must be in YYYY-MM-DD format",
    })
    .refine((value) => !isNaN(Date.parse(value)), {
      message: "scheduledTime should be a valid date",
    }),
  type: z.string().min(1, { message: "type is required" }),
  volume: z.coerce.number(),
});

module.exports = createHorseSchema;
