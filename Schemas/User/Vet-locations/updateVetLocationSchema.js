const { z } = require("zod");
const addVetLocationSchema = require("./createVetLocationSchema");
const baseStringSchema = require("../../common/baseStringSchema");

const updateVetLocation = addVetLocationSchema.extend({
  clinic: baseStringSchema("clinic").nullable().optional(),
  veterinarian: baseStringSchema("veterinarian").nullable().optional(),
  phoneNumber: baseStringSchema("phoneNumber").nullable().optional(),
  city: baseStringSchema("city").nullable().optional(),
  state: baseStringSchema("state").nullable().optional(),
});

module.exports = updateVetLocation;
