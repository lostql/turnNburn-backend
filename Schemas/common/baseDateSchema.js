const { z } = require("zod");

const baseDateSchema = (field) =>
  z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: `${field} must be in YYYY-MM-DD format`,
    })
    .refine((value) => !isNaN(Date.parse(value)), {
      message: `${field} should be a valid date`,
    });

module.exports = baseDateSchema;
