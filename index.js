const express = require("express");

const app = express();

app.use(express.json());

const authenticateUser = require('./src/middleware/authentication')

const authRouter = require("./src/routes/auth");
const jobsRouter = require("./src/routes/jobs");

app.use("", authRouter);
app.use("/jobs", authenticateUser, jobsRouter);



module.exports = app;
