const { z } = require("zod");

const deleteNoteSchema = z.object({
  noteId: z.coerce
    .number({ message: "id must be a number" })
    .min(1, "Invalid id"),
});

const updateNoteSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, { message: "Content is required" })
    .nullable()
    .optional(),
  title: z
    .string()
    .trim()
    .min(1, { message: "Title is required" })
    .nullable()
    .optional(),
});

module.exports = { deleteNoteSchema, updateNoteSchema };
