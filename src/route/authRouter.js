
const express = require("express");
const router = express.Router();

const userModel = require("../models/user.model");
const hash = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please enter the required fields"
            });
        }

        const existingUser = await userModel.findOne({
            $or: [{ username: name }, { email: email }]
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await hash.hash(password, 10);

        await userModel.create({
            username: name,
            email: email,
            password: hashedPassword,
            role: role
        });

        return res.status(201).json({
            message: "User registered successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error registering user"
        });
    }
}

router.post("/register", registerUser);

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please enter the required fields"
            });
        }

        const user = await userModel.findOne({ email: email });

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        const isMatch = await hash.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET_KEY
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax"
        });

        return res.status(200).json({
            message: "Login successful"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error logging in"
        });
    }
}

router.post("/login", loginUser);

async function logoutUser(req, res) {
    try {
        res.clearCookie("token");

        return res.status(200).json({
            message: "Logout successful"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error occurred while logging out"
        });
    }
}

router.post("/logout", logoutUser);

module.exports = router;
