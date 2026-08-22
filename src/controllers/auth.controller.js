import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
    return jwt.sign({ _id: userId }, process.env.JWT_SECRET || "supersecretkey", { expiresIn: "1d" });
};

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ success: false, message: "Email already registered." });

        const user = await User.create({ name, email, password });
        return res.status(201).json({ success: true, message: "User registered successfully", userId: user._id });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.isPasswordCorrect(password))) {
            return res.status(401).json({ success: false, message: "Invalid email or password." });
        }

        const token = generateToken(user._id);
        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            token,
            userId: user._id
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};