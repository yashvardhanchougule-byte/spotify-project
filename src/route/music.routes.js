import musicModel from "../models/music.model.js";
const express = require("express");

const router = express.Router();
const upload = require("../middlewares/upload.middleware");
router.post("/upload", upload.single("song"), async (req, res) => {
    const music=await musicModel.create({
        uri:req.file.path,
        title:req.body.title,
        artist:req.body.artist
    });
    return res.status(200).json({ message: "Song uploaded successfully" ,
        musicId:music._id,
    }
    );
});
router.post("/findAllmusic", async (req, res) => {
    const songs=await musicModel.find();
    return res.status(200).json({ songs });
});
router.post("/findById", async (req, res) => {
    const song=await musicModel.findById(req.body.id);
    return res.status(200).json({ song });
});
router.post("/findByArtist", async (req, res) => {
    const artist=req.body.artist;
    const songs=await musicModel.find({artist});
    return res.status(200).json({ songs });
});
router.post("/delete", async (req, res) => {
    if(!req.body.title){
        return res.status(400).json({ message: "Please provide the song title" });
    }
    try {
    await musicModel.findOneAndDelete({ title: req.body.title });
    return res.status(200).json({ message: "Song deleted successfully" });
} catch (error) {
    return res.status(500).json({ message: "Error deleting song" });
}
});

module.exports = router;

