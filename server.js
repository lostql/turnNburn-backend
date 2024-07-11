const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const globalErrorMiddleware = require("./Middlewares/globalErrorMiddleware");
const { reqLogger } = require("./Configs/logger.config");
const server = require("./Routes/index");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(express.static("public"));

app.use("/health-check", (req, res, next) => {
  handleOK(res, 200, null, "Health check route");
});

app.use(reqLogger);
app.use("/api", server);

app.use(globalErrorMiddleware);
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
