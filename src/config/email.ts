/**
 * Configuration for the email transporter.
 * Populated from environment variables.
 */
export interface EmailConfig {
  /** The SMTP host. */
  host: string;
  /** The SMTP port. */
  port: number;
  /** Whether to use TLS (true for 465, false for other ports). */
  secure: boolean;
  /** Authentication details. */
  auth: {
    /** The email address for authentication. */
    user: string;
    /** The password for authentication. */
    pass: string;
  };
  /** The email address from which the email will be sent. */
  fromEmail: string;
  /** The email address to which the contact form submissions will be sent. */
  toEmail: string;
  /** Minimum time in seconds for a legitimate contact form submission to prevent spam. */
  minSubmissionTimeSeconds: number;
}

/**
 * Defines the email configuration by reading directly from environment variables.
 */
export const emailConfig: EmailConfig = {
  host: process.env.SMTP_HOST || '',
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASSWORD || '',
  },
  fromEmail: process.env.SMTP_FROM_EMAIL || '',
  toEmail: process.env.SMTP_TO_EMAIL || '',
  minSubmissionTimeSeconds: 10, // Default value, can be overridden by environment variable if needed
};
