const express= require("express");
const app= express();
const authRouter= require("./route/authRouter");
const dbconnect= require("./db/db");
const albumRouter = require("./route/album.routes");
dbconnect();
app.use("/register",authRouter);
app.use(express.json());
app.use("/logout",logoutUser);
app.use("/findAllmusic",findAll);
app.use("/findById",findById);
app.use("/findByArtist",findByArtist);
app.use("/delete",deleteSong);

app.use("/api/album", albumRouter);
app.use("/login",loginUser);
module.exports= app;