'use client'

import { useEffect, useState } from 'react';
import { BsSend } from 'react-icons/bs';
import { sendContactEmail } from '@/app/hooks/sendEmail';
import {
    CONTACT_FIELD_LIMITS,
    CONTACT_FIELDS,
    validateContactForm,
    type ContactFormData,
    type ContactFormErrors,
    type ContactFormField,
} from '@/lib/contactForm';

const EMPTY_FORM: ContactFormData = { name: '', email: '', subject: '', message: '' };
const DRAFT_KEY = 'contact-form-draft';

const labelClass = 'block text-neutral-600 dark:text-[#a3a3a3] text-xs md:text-sm mb-2';
const fieldClass = 'w-full px-4 py-3 bg-transparent border border-gray-300 dark:border-gray-600 rounded text-neutral-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-accent aria-invalid:border-accent-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent transition';
// Messages use <div> rather than <p>: the global p rule in globals.css would override their colour and size.
const fieldErrorClass = 'mt-2 text-accent-strong text-xs md:text-sm';

// Storage can throw (blocked site data, private windows). A draft is only a convenience, so carry on without it.
function readDraft(): Partial<ContactFormData> {
    try {
        return JSON.parse(sessionStorage.getItem(DRAFT_KEY) ?? '{}');
    } catch {
        return {};
    }
}

function writeDraft(data: ContactFormData) {
    try {
        sessionStorage.setItem(DRAFT_KEY, JSON.stringify(data));
    } catch { }
}

function clearDraft() {
    try {
        sessionStorage.removeItem(DRAFT_KEY);
    } catch { }
}

export default function ContactForm() {
    const [formData, setFormData] = useState<ContactFormData>(EMPTY_FORM);
    const [fieldErrors, setFieldErrors] = useState<ContactFormErrors>({});
    const [loading, setLoading] = useState(false);
    const [sendFailed, setSendFailed] = useState(false);
    const [sent, setSent] = useState(false);

    // Restored after mount so the server and first client render match.
    useEffect(() => {
        const draft = readDraft();
        setFormData(prev => {
            const restored = { ...prev };
            for (const field of CONTACT_FIELDS) {
                const value = draft[field];
                if (typeof value === 'string') restored[field] = value;
            }
            return restored;
        });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const field = e.target.name as ContactFormField;
        const next = { ...formData, [field]: e.target.value };
        setFormData(next);
        writeDraft(next);
        setSent(false);
        setFieldErrors(prev => ({ ...prev, [field]: undefined }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (loading) return;

        const form = e.currentTarget;
        const errors = validateContactForm(formData);
        setFieldErrors(errors);
        setSendFailed(false);
        setSent(false);

        const firstInvalid = CONTACT_FIELDS.find(field => errors[field]);
        if (firstInvalid) {
            (form.elements.namedItem(firstInvalid) as HTMLElement).focus();
            return;
        }

        setLoading(true);
        try {
            const fax = new FormData(form).get('fax');
            await sendContactEmail({ ...formData, fax: typeof fax === 'string' ? fax : '' });
            setFormData(EMPTY_FORM);
            clearDraft();
            setSent(true);
        } catch (err) {
            setSendFailed(true);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fieldProps = (field: ContactFormField) => ({
        id: `contact-${field}`,
        name: field,
        value: formData[field],
        onChange: handleChange,
        required: true,
        maxLength: CONTACT_FIELD_LIMITS[field],
        'aria-invalid': fieldErrors[field] ? true : undefined,
        'aria-describedby': fieldErrors[field] ? `contact-${field}-error` : undefined,
    });

    const fieldError = (field: ContactFormField) => fieldErrors[field] && (
        <div id={`contact-${field}-error`} className={fieldErrorClass}>{fieldErrors[field]}</div>
    );

    return (
        <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-6 md:mr-[40%]">
            {/* Spam trap: hidden from people, and submissions that fill it in are dropped. */}
            <div aria-hidden="true" className="absolute -left-[9999px]">
                <label htmlFor="contact-fax">Leave this field empty</label>
                <input id="contact-fax" type="text" name="fax" tabIndex={-1} autoComplete="off" />
            </div>

            {/* Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="contact-name" className={labelClass}>Name<span className="text-accent-strong">*</span></label>
                    <input
                        {...fieldProps('name')}
                        type="text"
                        autoComplete="name"
                        placeholder="Edsger Dijkstra"
                        className={fieldClass}
                    />
                    {fieldError('name')}
                </div>
                <div>
                    <label htmlFor="contact-email" className={labelClass}>Email<span className="text-accent-strong">*</span></label>
                    <input
                        {...fieldProps('email')}
                        type="email"
                        autoComplete="email"
                        placeholder="Dijkstra@example.com"
                        className={fieldClass}
                    />
                    {fieldError('email')}
                </div>
            </div>

            {/* Subject */}
            <div>
                <label htmlFor="contact-subject" className={labelClass}>Subject<span className="text-accent-strong">*</span></label>
                <input
                    {...fieldProps('subject')}
                    type="text"
                    placeholder="Project Inquiry"
                    className={fieldClass}
                />
                {fieldError('subject')}
            </div>

            {/* Message */}
            <div>
                <label htmlFor="contact-message" className={labelClass}>Message<span className="text-accent-strong">*</span></label>
                <textarea
                    {...fieldProps('message')}
                    placeholder="Tell me about your project..."
                    rows={8}
                    className={`${fieldClass} resize-none`}
                />
                {fieldError('message')}
            </div>

            <div>
                {/* Live regions stay mounted so screen readers announce what appears inside them. */}
                <div role="status">
                    {sent && (
                        <div className="mb-6 border-l-2 border-success pl-4 text-sm md:text-base text-neutral-900 dark:text-white">
                            Message sent. I&apos;ll reply within 24-48 hours.
                        </div>
                    )}
                </div>
                <div role="alert">
                    {sendFailed && (
                        <div className="mb-6 border-l-2 border-accent-strong pl-4 text-sm md:text-base text-neutral-900 dark:text-white">
                            Couldn&apos;t send. Your message is still here. Try again, or email{' '}
                            <a href="mailto:drydenbryson@dryd3n.ca" className="text-accent-strong underline underline-offset-2">drydenbryson@dryd3n.ca</a>.
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-3 bg-neutral-900 text-white font-semibold rounded hover:bg-neutral-700 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-white dark:text-black dark:hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                    <span><BsSend /></span> {loading ? 'Sending...' : 'Send Message'}
                </button>
            </div>
        </form>
    );
}
