
const express = require("express");
const app = express();

const authRouter = require("./route/authRouter");
const musicRouter = require("./route/music.routes");
const albumRouter = require("./route/album.routes");

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/music", musicRouter);
app.use("/api/album", albumRouter);

module.exports = app;
