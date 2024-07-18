const { z } = require("zod");

const baseStringSchema = (field) =>
  z
    .string({ message: `${field} is required` })
    .trim()
    .min(1, { message: `${field} cannot be left empty` })
    .max(190, { message: `${field} cannot exceed 190 characters` });

const addVetLocationSchema = z.object({
  clinic: baseStringSchema("clinic"),
  veterinarian: baseStringSchema("veterinarian"),
  phoneNumber: baseStringSchema("phoneNumber"),
  city: baseStringSchema("city"),
  state: baseStringSchema("state"),
});

module.exports = addVetLocationSchema;
