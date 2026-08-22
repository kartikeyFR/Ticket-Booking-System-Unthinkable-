import { User } from "../models/user.model.js";
import { Waitlist } from "../models/waitlist.model.js";

export const joinWaitlist = async (req, res) => {
    const { eventId,category } = req.body;
    const userId=req.user._id

    try {
        
        const existingEntry = await Waitlist.findOne({
            eventId,
            userId,
            category,
            status: 'waiting'
        });

        if (existingEntry) {
            return res.status(400).json({
                success: false,
                message: "You are already on the waitlist for this category."
            });
        }

        const waitlistEntry = await Waitlist.create({
            eventId,
            userId,
            category,
            status: 'waiting'
        });

        return res.status(201).json({
            success: true,
            message: "Successfully added to the waitlist.",
            waitlistEntry
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};