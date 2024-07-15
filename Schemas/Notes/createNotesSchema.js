const { z } = require("zod");

const createNoteSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "title is required" })
    .max(190, { message: "title cannot exceed more than 190 characters" }),
  content: z
    .string()
    .trim()
    .min(1, { message: "content cannot be left empty" }),
});

module.exports = createNoteSchema;
