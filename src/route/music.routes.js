
const express = require("express");
const router = express.Router();

const musicModel = require("../models/music.model");
const upload = require("../middleware/upload.middleware");

router.post("/upload", upload.single("song"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Please upload a song"
            });
        }

        const music = await musicModel.create({
            uri: req.file.path,
            title: req.body.title,
            artist: req.body.artist
        });

        return res.status(201).json({
            message: "Song uploaded successfully",
            musicId: music._id
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error uploading song"
        });
    }
});

router.post("/findAllmusic", async (req, res) => {
    try {
        const songs = await musicModel.find();
        return res.status(200).json({ songs });
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching songs"
        });
    }
});

router.post("/findById", async (req, res) => {
    try {
        const song = await musicModel.findById(req.body.id);

        if (!song) {
            return res.status(404).json({
                message: "Song not found"
            });
        }

        return res.status(200).json({ song });
    } catch (error) {
        return res.status(500).json({
            message: "Error finding song"
        });
    }
});

router.post("/findByArtist", async (req, res) => {
    try {
        const artist = req.body.artist;
        const songs = await musicModel.find({ artist });

        return res.status(200).json({ songs });
    } catch (error) {
        return res.status(500).json({
            message: "Error finding songs"
        });
    }
});

router.post("/delete", async (req, res) => {
    if (!req.body.title) {
        return res.status(400).json({
            message: "Please provide the song title"
        });
    }

    try {
        const song = await musicModel.findOneAndDelete({
            title: req.body.title
        });

        if (!song) {
            return res.status(404).json({
                message: "Song not found"
            });
        }

        return res.status(200).json({
            message: "Song deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error deleting song"
        });
    }
});

module.exports = router;
