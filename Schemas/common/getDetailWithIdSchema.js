const { z } = require("zod");

const getDetailWithIdSchema = z.object({
  id: z.coerce
    .number({ message: "id must be of type number" })
    .min(1, { message: "id cannot be less than 0" }),
});
module.exports = getDetailWithIdSchema;
