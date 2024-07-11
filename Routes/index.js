const rootRouter = require("express").Router();
const { handleError } = require("../responseHandlers/responseHandler");
const userRouter = require("./userRoutes");

rootRouter.use("/user", userRouter);
rootRouter.all("*", (req, res) => {
  handleError(res, 404, null, "Route Not Found");
});
module.exports = rootRouter;
