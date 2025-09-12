'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useState } from 'react';
import { registerTimeline } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import Textarea from '@/components/ui/textarea';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';

/**
 * Renders a contact form for the footer section.
 *
 * @param {object} props - The component props.
 * @returns {JSX.Element} The rendered footer contact form.
 */
const ContactForm = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const ref = useRef<HTMLDivElement>(null);

  /**
   * State for all form data.
   * @property {string} name - The name of the sender.
   * @property {string} email - The email of the sender.
   * @property {string} message - The message content.
   * @property {string} hp_field - Honeypot field to catch bots.
   * @property {number} timestamp - Timestamp of form load for time-based spam check.
   */
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    hp_field: '', // Honeypot field
    timestamp: Date.now(), // Timestamp for time-based check
  });

  /** State for form validation errors. */
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  /**
   * Handles the change event for any input field.
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - The event object.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Only update if it's not the honeypot field (to prevent accidental user input)
    if (name !== 'hp_field') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      // For honeypot, just set the value directly
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
    // Clear the error and success message when the user starts typing
    setError(null);
    setSuccessMessage(null);
  };

  /**
   * Validates the form data.
   * @returns {string | undefined} The first validation error message, or undefined if no errors.
   */
  const validate = (): string | undefined => {
    if (!formData.name.trim()) {
      return 'Name is required';
    }
    if (!formData.email.trim()) {
      return 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return 'Email address is invalid';
    }
    if (!formData.message.trim()) {
      return 'Message is required';
    }
    return undefined;
  };

  /**
   * Handles the form submission.
   * @param {React.FormEvent<HTMLFormElement>} e - The event object.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage(null); // Clear previous success messages
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setError(null); // Clear any previous errors

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message || 'Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          message: '',
          hp_field: '',
          timestamp: Date.now(), // Reset timestamp for next submission
        });
      } else {
        setError(data.message || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useGSAP(
    () => {
      const tl = gsap.timeline({ paused: true });

      tl.fromTo(
        ref.current?.querySelector('[data-contact-form-bg]') ?? null,
        { opacity: 0 },
        { opacity: 1, ease: 'none' },
      );
      tl.fromTo(
        ref.current?.querySelectorAll('[data-contact-form-item]') ?? null,
        { x: '5vh', opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.05 },
        '<',
      );

      registerTimeline('layout/contact/form', tl);
    },
    { scope: ref },
  );

  useGSAP(
    () => {
      if (error) {
        gsap
          .timeline()
          .fromTo('[data-contact-form-error]', { opacity: 0, y: '100%' }, { opacity: 1, y: 0 })
          .fromTo(
            '[data-contact-form-error]',
            { opacity: 1, y: 0 },
            { opacity: 0, y: '100%' },
            '+=5',
          )
          .then(() => setError(null));
      } else if (successMessage) {
        gsap
          .timeline()
          .fromTo('[data-contact-form-success]', { opacity: 0, y: '100%' }, { opacity: 1, y: 0 })
          .fromTo(
            '[data-contact-form-success]',
            { opacity: 1, y: 0 },
            { opacity: 0, y: '100%' },
            '+=5',
          )
          .then(() => setSuccessMessage(null));
      }
    },
    { scope: ref, dependencies: [error, successMessage] },
  );

  return (
    <div
      className={cn(
        'pt-8 px-8 lg:px-10 pb-20 -mx-8 lg:mx-0',
        'space-y-8',
        'relative overflow-hidden',
        className,
      )}
      ref={ref}
      {...props}
    >
      <div
        className={cn('absolute inset-0 -z-10', 'mb-0', 'bg-gray-950')}
        data-contact-form-bg
      ></div>

      <div className="space-y-2">
        <h2 className="text-3xl font-medium text-gray-400" data-contact-form-item>
          Get in touch!
        </h2>
        <p className={cn('section-desc', 'flex-1', 'text-gray-500')} data-contact-form-item>
          I&lsquo;d love to hear about your company or project needs.
        </p>
      </div>

      <form className={cn('flex flex-col gap-8 md:gap-12')} onSubmit={handleSubmit}>
        <div className="grid gap-4 xl:gap-6">
          <Input
            placeholder="What's  your name?"
            aria-label="Name"
            data-contact-form-item
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            placeholder="What's your email address?"
            aria-label="Email"
            data-contact-form-item
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Textarea
            placeholder="What's on your mind?"
            aria-label="Message"
            data-contact-form-item
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
          {/* Honeypot field - hidden from legitimate users */}
          <Input
            type="text"
            name="hp_field"
            value={formData.hp_field}
            onChange={handleChange}
            className="hidden" // Hide visually
            aria-hidden // Hide from screen readers
            data-nosnippet // Hide from search engines
            tabIndex={-1} // Prevent tabbing to it
            autoComplete="off" // Prevent browser autofill
          />
        </div>
        <Button
          className={cn('flex gap-2 justify-center items-center', 'text-gray-500 hover:text-white')}
          size="lg"
          type="submit"
          data-contact-form-item
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
        {error && (
          <p
            className={cn(
              'p-4',
              'absolute inset-x-8 lg:inset-x-10 bottom-0 translate-y-full',
              'bg-red-500',
              'text-white text-center',
            )}
            data-contact-form-error
          >
            {error}
          </p>
        )}
        {successMessage && (
          <p
            className={cn(
              'p-4',
              'absolute inset-x-8 lg:inset-x-10 bottom-0 translate-y-full',
              'bg-green-500',
              'text-white text-center',
            )}
            data-contact-form-success
          >
            {successMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
