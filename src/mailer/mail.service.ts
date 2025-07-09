// src/mailer/mailer.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // or 'Outlook365', 'Yahoo', or a custom SMTP
      auth: {
        user: 'qaiserwaheed00@gmail.com',
        pass: 'wigt zobu peoj kaob' // Use App Password if using Gmail
      }
    });
  }

  async sendMail(
    to: string,
    subject: string,
    text: string,
    html?: string
  ): Promise<void> {
    const mailOptions = {
      from: '"gmail" <qaiserwaheed00@gmail.com>',
      to,
      subject,
      text,
      html
    };

    await this.transporter.sendMail(mailOptions);
  }
}
