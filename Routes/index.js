const rootRouter = require("express").Router();
const { handleError } = require("../responseHandlers/responseHandler");
const userExpenseRouter = require("./userExpenseRoute");
const userHorseRouter = require("./userHorseRoutes");
const userRouter = require("./userRoutes");

rootRouter.use("/user", userRouter);
rootRouter.use("/user-horse", userHorseRouter);
rootRouter.use("/user-expense", userExpenseRouter);
rootRouter.all("*", (req, res) => {
  handleError(res, 404, null, "Route Not Found");
});
module.exports = rootRouter;
