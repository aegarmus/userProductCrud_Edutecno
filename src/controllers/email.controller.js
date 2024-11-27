import { sendEmail } from "../utils/emailUtils.js"

export const sendEmailController = async (req, res, next) => {
    try {
        const emailData = await sendEmail(req.body);

        res.status(200).json({
            message: "Email enviado con éxito",
            status: 200,
            data: emailData
        })
    } catch(error) {
        next(error)
    }
}