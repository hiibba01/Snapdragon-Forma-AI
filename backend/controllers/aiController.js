import { extractClaimData } from "../services/ai.service.js";

export const extractClaim = async (req, res) => {
    try {
        const { story, fields } = req.body;

        if (!story || !story.trim()) {
            return res.status(400).json({
                success: false,
                message: "Claim description is required."
            });
        }

        if (!fields || !Array.isArray(fields)) {
            return res.status(400).json({
                success: false,
                message: "Form fields are required."
            });
        }

        const extractedData = await extractClaimData(story, fields);

        res.status(200).json({
            success: true,
            data: extractedData
        });

    } catch (error) {
        console.error("AI extraction error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to extract claim information!"
        });
    }
};