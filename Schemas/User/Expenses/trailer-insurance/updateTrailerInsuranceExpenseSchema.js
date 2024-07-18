const { z } = require("zod");
const baseDateSchema = require("../../../common/baseDateSchema");
const baseNumberSchema = require("../../../common/baseNumberSchema");
const baseStringSchema = require("../../../common/baseStringSchema");

const updateTrailerInsuranceExpenseSchema = z
  .object({
    trailer: baseStringSchema("trailer").nullable().optional(),
    companyName: baseStringSchema("companyName").nullable().optional(),
    cost: baseNumberSchema("cost").nullable().optional(),
    policyStartDate: baseDateSchema("policyStartDate").nullable().optional(),
    policyEndDate: baseDateSchema("policyEndDate").nullable().optional(),
  })
  .refine(
    (data) => {
      if (data.policyStartDate && data.policyEndDate) {
        const startDate = new Date(data.policyStartDate);
        const endDate = new Date(data.policyEndDate);
        return startDate < endDate;
      } else {
        return true;
      }
    },
    {
      message: "policyStartDate should be less than policyEndDate",
      path: ["policyStartDate"],
    }
  );

module.exports = updateTrailerInsuranceExpenseSchema;
