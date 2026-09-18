import formService from "../services/formService.js";

export const getForm = async(req, res)=>{
    try {
        const { formId } = req.params;
        const form = await formService.getFormById(formId);
        res.status(200).json({
            success: true,
            data: form
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
}