const { z } = require("zod");
const baseStringSchema = require("../../../common/baseStringSchema");
const baseNumberSchema = require("../../../common/baseNumberSchema");
const baseDateSchema = require("../../../common/baseDateSchema");

const createTrailerInsuranceExpenseSchema = z
  .object({
    trailer: baseStringSchema("trailer"),
    companyName: baseStringSchema("companyName"),
    cost: baseNumberSchema("cost"),
    date: baseDateSchema("date"),
    policyStartDate: baseDateSchema("policyStartDate"),
    policyEndDate: baseDateSchema("policyEndDate"),
  })
  .refine(
    (data) => {
      const startDate = new Date(data.policyStartDate);
      const endDate = new Date(data.policyEndDate);
      return startDate < endDate;
    },
    {
      message: "policyStartDate should be less than policyEndDate",
      path: ["policyStartDate"],
    }
  );

module.exports = createTrailerInsuranceExpenseSchema;
