
const express = require("express");
const router = express.Router();

const albumModel = require("../models/album.model.js");

// Create album
router.post("/create", async (req, res) => {
    if (!req.body.title || !req.body.artist) {
        return res.status(400).json({
            message: "Please provide album title and artist"
        });
    }

    try {
        const album = await albumModel.create({
            title: req.body.title,
            artist: req.body.artist,
            musics: req.body.musics || []
        });

        return res.status(201).json({
            message: "Album created successfully",
            album
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error creating album"
        });
    }
});

// Find all albums
router.post("/findAll", async (req, res) => {
    try {
        const albums = await albumModel.find();
        return res.status(200).json({ albums });
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching albums"
        });
    }
});

// Find album by title
router.post("/findByTitle", async (req, res) => {
    if (!req.body.title) {
        return res.status(400).json({
            message: "Please provide the album title"
        });
    }

    try {
        const album = await albumModel.findOne({
            title: req.body.title
        });

        return res.status(200).json({ album });
    } catch (error) {
        return res.status(500).json({
            message: "Error finding album"
        });
    }
});

// Find albums by artist
router.post("/findByArtist", async (req, res) => {
    if (!req.body.artist) {
        return res.status(400).json({
            message: "Please provide the artist ID"
        });
    }

    try {
        const albums = await albumModel.find({
            artist: req.body.artist
        });

        return res.status(200).json({ albums });
    } catch (error) {
        return res.status(500).json({
            message: "Error finding albums"
        });
    }
});

// Delete album by title
router.post("/delete", async (req, res) => {
    if (!req.body.title) {
        return res.status(400).json({
            message: "Please provide the album title"
        });
    }

    try {
        const album = await albumModel.findOneAndDelete({
            title: req.body.title
        });

        if (!album) {
            return res.status(404).json({
                message: "Album not found"
            });
        }

        return res.status(200).json({
            message: "Album deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error deleting album"
        });
    }
});

module.exports = router;
