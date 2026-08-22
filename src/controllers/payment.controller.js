import crypto from "crypto";


export const createPaymentIntent = async (req, res) => {
    const { amount, currency = "INR" } = req.body;
    const userId = req.user._id;

    try {
        
        const transactionId = "txn_" + crypto.randomBytes(12).toString("hex");

        return res.status(200).json({
            success: true,
            message: "Payment intent created successfully",
            transactionId,
            amount,
            currency,
            status: "CREATED"
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};


export const verifyPayment = async (req, res) => {
    const { transactionId, paymentStatus } = req.body;

    try {
        
        if (paymentStatus !== "SUCCESS") {
            return res.status(400).json({ success: false, message: "Payment failed or was canceled." });
        }

        return res.status(200).json({
            success: true,
            message: "Payment verified successfully",
            transactionId,
            verifiedAt: new Date()
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};