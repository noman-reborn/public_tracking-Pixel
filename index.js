const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const sessions = require("express-session");
const usersRouter = require("./routes/users.router");
const pixelRouter = require("./routes/pixels.router");
const morgan = require(`morgan`);
const app = express();
require("dotenv").config();
app.use(express.json());
app.use(morgan(`dev`));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
//connecting with mongodb database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error(`ERROR: ${err}`);
  });

app.use("/api/user", usersRouter);
app.use("/api/pixel", pixelRouter);
app.use("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});

app.listen(process.env.PORT || 3000, () =>
  console.log(`server is listening on ${process.env.PORT}`)
);
// example pixel

// https://www.pluralsight.com/courses/twilio-service-basics?aid=7010a000002LUv7AAG&promo=&utm_source=non_branded&utm_medium=digital_paid_search_google&utm_campaign=XYZ_APAC_Dynamic&utm_content=&cq_cmp=1576650374&gclid=CjwKCAiApvebBhAvEiwAe7mHSGLvAYA9_ziWLocTvubM74ECDBCMXyd5blcnIJzH6WTmu8u_F-jRTBoC07QQAvD_BwE
