const rootRouter = require("express").Router();
const { handleError } = require("../responseHandlers/responseHandler");
const userHorseRouter = require("./userHorseRoutes");
const userRouter = require("./userRoutes");

rootRouter.use("/user", userRouter);
rootRouter.use("/user-horse", userHorseRouter);
rootRouter.all("*", (req, res) => {
  handleError(res, 404, null, "Route Not Found");
});
module.exports = rootRouter;
