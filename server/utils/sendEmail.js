import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, text) => {
    // Create a transport using nodemailer
    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    // Send the email
    await transport.sendMail({
        // from: process.env.SMTP_USER, // Make sure to specify the "from" field
        to,
        subject,
        text
    });
};


