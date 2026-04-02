import { Resend } from "resend"
import "dotenv/config"

const from = process.env.EMAIL_FROM;

const resend = new Resend(process.env.RESEND_API_KEY);
export const sendEmail = async (recipientMailId, subject, content)=>{
    const {data, error} = await resend.emails.send({
        from: from, 
        to: ["sym.pandya.dev@gmail.com"],
        subject: subject,
        html: content
    });

    if(error) {
        console.error("Error sending email!!!", error);
        throw error;
    }

    console.log("Email sent successfully...");
    return data;
}