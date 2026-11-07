// Shared by the contact form and its server action, so both apply the same rules.

export type ContactFormData = {
    name: string;
    email: string;
    subject: string;
    message: string;
};

export type ContactFormField = keyof ContactFormData;
export type ContactFormErrors = Partial<Record<ContactFormField, string>>;

export const CONTACT_FIELD_LIMITS: Record<ContactFormField, number> = {
    name: 100,
    email: 254,
    subject: 150,
    message: 5000,
};

// In the order they appear on the page, so the first error can take focus.
export const CONTACT_FIELDS: ContactFormField[] = ['name', 'email', 'subject', 'message'];

const REQUIRED_MESSAGES: Record<ContactFormField, string> = {
    name: 'Enter your name.',
    email: 'Enter your email address.',
    subject: 'Enter a subject.',
    message: 'Enter a message.',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(data: ContactFormData): ContactFormErrors {
    const errors: ContactFormErrors = {};

    for (const field of CONTACT_FIELDS) {
        const value = data[field].trim();
        if (!value) {
            errors[field] = REQUIRED_MESSAGES[field];
        } else if (value.length > CONTACT_FIELD_LIMITS[field]) {
            errors[field] = `Keep this under ${CONTACT_FIELD_LIMITS[field]} characters.`;
        }
    }

    if (!errors.email && !EMAIL_PATTERN.test(data.email.trim())) {
        errors.email = 'Enter a valid email address, like name@example.com.';
    }

    return errors;
}
