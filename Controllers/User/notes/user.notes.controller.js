const prisma = require("../../../Configs/prisma.config");
const { NotFoundError, BadRequestError } = require("../../../customError");
const { handleOK } = require("../../../responseHandlers/responseHandler");
const Utils = require("../../../Utils/globalUtils");

class UserNotesController {
  static async createNote(req, res, next) {
    try {
      const userId = req.user.id;
      const note = await prisma.userNote.create({
        data: {
          ...req.body,
          userId,
        },
      });
      handleOK(res, 200, note, "Note created successfully");
    } catch (error) {
      next(error);
    }
  }

  static async deleteNote(req, res, next) {
    try {
      const { noteId } = req.params;
      const note = await prisma.userNote.findFirst({
        where: {
          id: Number(noteId),
        },
      });
      if (!note) {
        throw new NotFoundError("Note not found");
      }
      await prisma.userNote.delete({
        where: {
          id: note.id,
        },
      });
      handleOK(res, 200, null, "Note deleted successfully");
    } catch (error) {
      next(error);
    }
  }

  static async fetchAllNotes(req, res, next) {
    try {
      const notes = await prisma.userNote.findMany({
        where: {
          userId: req.user.id,
        },
      });
      handleOK(res, 200, notes, "All notes fetched");
    } catch (error) {
      next(error);
    }
  }

  static async updateNote(req, res, next) {
    try {
      const { noteId } = req.params;
      const note = await prisma.userNote.findFirst({
        where: {
          id: Number(noteId),
        },
      });
      if (!note) {
        throw new NotFoundError("Note not found");
      }
      const updatePayload = Utils.removeNullValuesFromObject(req.body);
      const updatedNote = await prisma.userNote.update({
        where: {
          userId: req.user.id,
          id: note.id,
        },
        data: updatePayload,
      });
      handleOK(res, 200, updatedNote, "Note updated successfully");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserNotesController;
