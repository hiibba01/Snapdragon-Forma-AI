import { extractClaimData, generateClaimSummary, checkClaimConsistency } from "../services/ai.service.js";

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


export const generateSummary = async (req, res) => {

    try {

        const {
            story,
            extractedData
        } = req.body;

        if (!story || !story.trim()) {
            return res.status(400).json({
                success: false,
                message: "Claim description is required."
            });
        }

        if (!extractedData) {
            return res.status(400).json({
                success: false,
                message: "Extracted claim data is required."
            });
        }

        const summary = await generateClaimSummary(
            story,
            extractedData
        );

        res.status(200).json({
            success: true,
            summary
        });

    } catch (error) {

        console.error(
            "Claim summary error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to generate claim summary."
        });
    }
};


export const checkConsistency = async (req, res) => {
    try {

        const {
            story,
            extractedData
        } = req.body;

        if (!story || !story.trim()) {
            return res.status(400).json({
                success: false,
                message: "Claim description is required."
            });
        }

        if (!extractedData) {
            return res.status(400).json({
                success: false,
                message: "Extracted claim data is required."
            });
        }

        const result = await checkClaimConsistency(
            story,
            extractedData
        );

        res.status(200).json({
            success: true,
            consistent: result.consistent,
            issues: result.issues
        });

    } catch (error) {

        console.error(
            "Claim consistency error:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message ||
                "Failed to check claim consistency."
        });
    }
};