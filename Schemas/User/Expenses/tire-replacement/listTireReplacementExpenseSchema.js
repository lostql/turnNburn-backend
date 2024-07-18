const { z } = require("zod");
const { TireReplacementType } = require("../../../../Utils/constants");

const listTireReplacementSchema = z.object({
  type: z.enum(Object.values(TireReplacementType), {
    required_error: "type is required",
    invalid_type_error: "type can be either Trailer or Truck",
  }),
});

module.exports = listTireReplacementSchema;
