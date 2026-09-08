import nodemailer from "nodemailer"
import dns from "dns"

dns.setDefaultResultOrder("ipv4first") 

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  family: 4,
  auth: {
    user: process.env.BREVO_SMTP_LOGIN,
    pass: process.env.BREVO_SMTP_KEY,
  },
});

transporter.verify()
.then (() => {console.log("Email transporter is ready to send emails"); })
.catch((err) => {console.error("Email transporter verification failed" ,err); });

export async function sendEmail({to, subject, html, text}) {

    const mailOptions = {
        from: process.env.GOOGLE_USER,
        to,
        subject,
        html,
        text
    };

    const details = await transporter.sendMail(mailOptions);
    
    console.log("Email sent:" ,details)
}