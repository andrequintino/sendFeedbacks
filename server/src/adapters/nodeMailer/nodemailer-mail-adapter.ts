import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "227953b73200be",
      pass: "bad4cc12b14ca7"
    }
  });

export class NodemailerMailAdapter implements MailAdapter{
    async sendMail({subject, body}: SendMailData) {
        
        await transport.sendMail({
            from: 'Equipe feedget <oi@feedget.com',
            to: 'Andre Quintino <andre.quintino2005@gmail.com>',
            subject: `${subject}`,
            html: body
        });
    }
}