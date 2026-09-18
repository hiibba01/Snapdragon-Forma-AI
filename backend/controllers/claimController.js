import Claim from "../models/Claim.model.js";

export const submitClaim = async(req, res)=>{

    try {

        const { formId, data } = req.body;

        if (!formId || !data) {
            return res.status(400).json({
                success: false,
                message: "formId and data are required."
            });
        }

        const claim = await Claim.create({
            userId: req.user._id,
            formId,
            data
        });

        res.status(201).json({
            success: true,
            message: "Claim submitted successfully.",
            data: claim
        });
        
    } catch (error) {

        console.error("Claim submission error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to submit claim!"
        });
        
    }

}

export const getMyClaims = async (req, res) => {
    try {
        const claims = await Claim.find({
            userId: req.user._id
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: claims
        });

    } catch (error) {
        console.error("Fetch claims error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch claims."
        });
    }
};