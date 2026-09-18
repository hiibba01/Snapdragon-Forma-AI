import dotenv from "dotenv";

import connectDB from "../config/db.js"
import Form from "../models/Form.model.js";
import insuranceForm from "../data/insuranceForm.js";

dotenv.config();

const seedForms = async () => {
    try {
        
        await connectDB();

        await Form.deleteOne({
            formId: insuranceForm.formId
        });

        const form = await Form.create(insuranceForm);

        console.log("Form seeded successfully!");
        console.log("Form ID:", form.formId);

        process.exit(0);

    } catch (error) {
        console.error("Error seeding form:", error.message);

        process.exit(1);
    }
}

seedForms();