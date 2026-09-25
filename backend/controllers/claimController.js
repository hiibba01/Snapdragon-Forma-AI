import Claim from "../models/Claim.model.js";
import cloudinary from "../config/cloudinary.js";

export const submitClaim = async (req, res) => {

    try {

        const { formId, data } = req.body;

        if (!formId || !data) {
            return res.status(400).json({
                success: false,
                message: "formId and data are required."
            });
        }

        let parsedData;

        try {
            parsedData = JSON.parse(data);
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Invalid claim data."
            });
        }

        const evidence = [];

        if (req.files && req.files.length > 0) {

            for (const file of req.files) {

                const resourceType =
                    file.mimetype.startsWith("video/")
                        ? "video"
                        : "image";

                const result = await new Promise(
                    (resolve, reject) => {

                        const uploadStream =
                            cloudinary.uploader.upload_stream(
                                {
                                    folder: "forma-ai/claims",
                                    resource_type: resourceType
                                },
                                (error, result) => {

                                    if (error) {
                                        reject(error);
                                    } else {
                                        resolve(result);
                                    }

                                }
                            );

                        uploadStream.end(file.buffer);
                    }
                );

                evidence.push({
                    url: result.secure_url,
                    publicId: result.public_id,
                    resourceType,
                    originalName: file.originalname
                });
            }
        }

        const claim = await Claim.create({
            userId: req.user._id,
            formId,
            data: parsedData,
            evidence
        });

        res.status(201).json({
            success: true,
            message: "Claim submitted successfully.",
            data: claim
        });

    } catch (error) {

        console.error(
            "Claim submission error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to submit claim!"
        });

    }
};

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