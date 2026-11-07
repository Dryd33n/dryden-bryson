'use server'

import { Resend } from 'resend';
import { validateContactForm, type ContactFormData } from '@/lib/contactForm';

const resend = new Resend(process.env.RESEND_API_KEY);

// Form values are visitor input, so they must not be able to add markup to the email.
function escapeHtml(value: string) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Server actions can be called directly, so the input can't be assumed to be what the form sends.
const clean = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

export async function sendContactEmail(submission: ContactFormData & { fax?: string }) {
    // The spam trap was filled in. Report success so bots have no reason to adapt.
    if (submission.fax) return;

    const formData: ContactFormData = {
        name: clean(submission.name),
        email: clean(submission.email),
        subject: clean(submission.subject),
        message: clean(submission.message),
    };

    if (Object.keys(validateContactForm(formData)).length > 0) {
        throw new Error('Invalid contact form submission');
    }

    try {
        // Resend returns API failures (bad key, unverified domain, rate limit) instead of throwing them.
        const { error } = await resend.emails.send({
            from: 'no-reply@dryd3n.ca',
            to: 'owner@dryd3n.ca',
            replyTo: formData.email,
            subject: `dryd3n.ca Contact Form Submission: ${formData.subject}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <style>
                        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
                        .header { background: linear-gradient(135deg, #f76855 0%, #ff9a76 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
                        .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
                        .content { background: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
                        .field { margin-bottom: 24px; }
                        .field-label { font-size: 12px; font-weight: 700; color: #999; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; }
                        .field-value { font-size: 16px; color: #333; padding: 12px; background: #f9f9f9; border-left: 3px solid #f76855; border-radius: 4px; }
                        .message-field { background: white; border: 1px solid #e0e0e0; padding: 16px; border-radius: 6px; }
                        .message-field p { margin: 0; white-space: pre-wrap; word-wrap: break-word; }
                        .footer { text-align: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #999; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>📬 dryd3n.ca Contact Form Submission</h1>
                        </div>
                        <div class="content">
                            <div class="field">
                                <div class="field-label">From</div>
                                <div class="field-value">${escapeHtml(formData.name)}</div>
                            </div>
                            <div class="field">
                                <div class="field-label">Email</div>
                                <div class="field-value"><a href="mailto:${escapeHtml(formData.email)}" style="color: #f76855; text-decoration: none;">${escapeHtml(formData.email)}</a></div>
                            </div>
                            <div class="field">
                                <div class="field-label">Subject</div>
                                <div class="field-value">${escapeHtml(formData.subject)}</div>
                            </div>
                            <div class="field">
                                <div class="field-label">Message</div>
                                <div class="message-field">
                                    <p>${escapeHtml(formData.message).replace(/\n/g, '<br/>')}</p>
                                </div>
                            </div>
                            <div class="footer">
                                <p>This message was sent from your dryd3n.ca contact form</p>
                            </div>
                        </div>
                    </div>
                </body>
                </html>
            `
        });

        if (error) throw new Error(`Resend rejected the email: ${error.message}`);
    } catch (error) {
        console.error('Failed to send email:', error);
        throw error;
    }
}
