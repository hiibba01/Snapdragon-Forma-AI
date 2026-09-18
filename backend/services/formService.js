import Form from "../models/Form.model.js";


const getFormById = async (formId) => {
    const form = await Form.findOne({
        formId: formId,
        status: "published"
    });

    if (!form) {
        throw new Error("Form not found!");
    }

    return form;
};

export default { getFormById };
