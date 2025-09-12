import nodemailer from 'nodemailer';
import { emailConfig } from '@/config/email';

/**
 * Creates a Nodemailer transporter using the email configuration.
 * @returns {nodemailer.Transporter} The Nodemailer transporter.
 */
export const createTransporter = (): nodemailer.Transporter => {
  return nodemailer.createTransport(emailConfig);
};

/**
 * Validates contact form data, including basic field presence, honeypot, and time-based spam checks.
 *
 * @param {object} data - The data object containing form fields.
 * @param {string} data.name - The name of the sender.
 * @param {string} data.email - The email of the sender.
 * @param {string} data.message - The message content.
 * @param {string} [data.hp_field] - Optional honeypot field to catch bots.
 * @param {number} [data.timestamp] - Optional timestamp of form load for time-based spam check.
 * @returns {{ isValid: boolean; message?: string }} An object indicating validity and an optional error message.
 */
export function validateContactForm(data: {
  name: string;
  email: string;
  message: string;
  hp_field?: string;
  timestamp?: number;
}) {
  const { name, email, message, hp_field, timestamp } = data;

  // Basic validation
  if (!name || !email || !message) {
    return { isValid: false, message: 'All fields are required.' };
  }

  // Honeypot check: If the hidden field is filled, it's likely a bot
  if (hp_field) {
    console.warn('Honeypot triggered: Bot detected.');
    return { isValid: false, message: 'Spam detected.' };
  }

  // Time-based check: If the form is submitted too quickly, it's likely a bot
  if (timestamp) {
    const submissionTime = Date.now();
    const timeElapsedSeconds = (submissionTime - timestamp) / 1000;

    if (timeElapsedSeconds < emailConfig.minSubmissionTimeSeconds) {
      console.warn(`Time-based spam triggered: Submission too fast (${timeElapsedSeconds}s).`);
      return { isValid: false, message: 'Spam detected.' };
    }
  }

  return { isValid: true };
}

/**
 * Generates the HTML content for the contact form email.
 * It converts newlines in the message to <br> tags for proper display in HTML emails.
 *
 * @param {object} params - The parameters for the email content.
 * @param {string} params.name - The name of the sender.
 * @param {string} params.email - The email of the sender.
 * @param {string} params.message - The message content.
 * @returns {string} The HTML string for the email body.
 */
export function generateContactEmailHtml({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}): string {
  const formattedMessage = message.replace(/\r?\n/g, '<br>');
  return `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong></p>
    <p>${formattedMessage}</p>
  `;
}
