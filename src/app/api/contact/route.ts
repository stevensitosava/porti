import { NextResponse } from 'next/server';
import { createTransporter } from '@/lib/email';
import { emailConfig } from '@/config/email';
import { siteConfig } from '@/config/site';
import { validateContactForm, generateContactEmailHtml } from '@/lib/email';

/**
 * Nodemailer transporter instance.
 * This is created once and reused for all email sending operations.
 * @type {import('nodemailer').Transporter}
 */
const transporter = createTransporter();

/**
 * Handles POST requests for the contact form.
 *
 * @param {Request} request - The incoming request object containing form data.
 * @returns {NextResponse} The response indicating success or failure of the message sending.
 */
export async function POST(request: Request) {
  try {
    /**
     * Destructured form data from the request body.
     * @property {string} name - The name of the sender.
     * @property {string} email - The email of the sender.
     * @property {string} message - The message content.
     * @property {string} hp_field - Honeypot field to catch bots.
     * @property {number} timestamp - Timestamp of form load for time-based spam check.
     * @type {{ name: string; email: string; message: string; hp_field?: string; timestamp?: number }}
     */
    const { name, email, message, hp_field, timestamp } = await request.json();

    const { isValid, message: validationMessage } = validateContactForm({
      name,
      email,
      message,
      hp_field,
      timestamp,
    });

    if (!isValid) {
      return NextResponse.json({ message: validationMessage }, { status: 400 });
    }

    /**
     * Mail options for sending the contact form email.
     * @type {import('nodemailer/lib/mailer').Options}
     */
    const mailOptions = {
      from: emailConfig.fromEmail, // Sender address
      to: emailConfig.toEmail, // Recipient address (e.g., your email)
      replyTo: email, // Set the user's email as the reply-to address
      subject: `[${siteConfig.name}] New Message from ${name}`,
      html: generateContactEmailHtml({ name, email, message }),
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Message sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Failed to send message.' }, { status: 500 });
  }
}
