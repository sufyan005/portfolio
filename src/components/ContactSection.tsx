import React, { useState, useRef } from 'react';
import { Mail, Linkedin, Github, Copy, Check, Send, ArrowUpRight, MessageSquare, AlertCircle, ExternalLink, Loader2, CheckCircle2, RefreshCw } from 'lucide-react';
import { PERSONAL_INFO, CONTACT_CONFIG } from '../data/portfolioData';
import { isSpamOrMalicious } from '../utils/spamFilter';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '', // anti-bot honeypot field
  });
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
    general?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastMailtoUrl, setLastMailtoUrl] = useState<string | null>(null);
  const formLoadTimeRef = useRef<number>(Date.now());

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(PERSONAL_INFO.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  // Standard structural syntax validation (avoids alerting bots to heuristics)
  const validateEmailFormat = (email: string): string | null => {
    const trimmed = email.trim();
    if (!trimmed) {
      return 'Email address is required.';
    }

    // Standard RFC compliant email format check
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9]))+$/;
    if (!emailRegex.test(trimmed)) {
      return 'Please provide a valid email format (e.g. name@company.com).';
    }

    const parts = trimmed.split('@');
    if (parts.length !== 2) {
      return 'Invalid email structure.';
    }

    const domain = parts[1];
    const domainParts = domain.split('.');
    const tld = domainParts[domainParts.length - 1];

    if (domainParts.length < 2 || tld.length < 2) {
      return 'Email must have a valid top-level domain (e.g. .com, .org, .io).';
    }

    return null;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { name?: string; email?: string; message?: string; general?: string } = {};

    // Standard Name validation
    const trimmedName = formData.name.trim();
    if (!trimmedName || trimmedName.length < 3) {
      errors.name = 'Please provide your full name (min 3 characters).';
    }

    // Standard Email format validation
    const emailError = validateEmailFormat(formData.email);
    if (emailError) {
      errors.email = emailError;
    }

    // Standard Message validation
    const trimmedMessage = formData.message.trim();
    if (!trimmedMessage || trimmedMessage.length < 10) {
      errors.message = 'Message must be at least 10 characters long.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Reset previous errors and start submission state
    setFormErrors({});
    setIsSubmitting(true);
    setErrorMessage(null);

    // Check if submission is bot, fake email, disposable domain, or malicious spam
    const isSuspicious = isSpamOrMalicious({
      name: trimmedName,
      email: formData.email.trim(),
      message: trimmedMessage,
      honeypot: formData.honeypot,
      formLoadTime: formLoadTimeRef.current,
    });

    if (isSuspicious) {
      // SILENT SHADOW-DROP:
      // Simulate realistic processing latency so the bot/fake submitter observes
      // a completely normal success flow, but behind the scenes no email or webhook is triggered.
      await new Promise((resolve) => setTimeout(resolve, 750));

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '', honeypot: '' });
      setIsSubmitting(false);
      return;
    }

    // Prepare backup mailto URL for genuine users in case of network drops
    const subject = `[Portfolio Inquiry] from ${trimmedName}`;
    const bodyText = `Name: ${trimmedName}\nEmail: ${formData.email.trim()}\n\nMessage:\n${trimmedMessage}\n\n---\nSent via Sufyan Siddiqui Portfolio Gateway`;
    setLastMailtoUrl(`mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`);

    try {
      // Use FormSubmit AJAX endpoint
      const targetEndpoint = CONTACT_CONFIG.defaultAjaxUrl;

      // Send structured payload to FormSubmit AJAX endpoint
      const payload = {
        name: trimmedName,
        email: formData.email.trim(),
        message: trimmedMessage,
        _subject: subject,
        _template: 'table',
        _captcha: 'false',
      };

      const response = await fetch(targetEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '', honeypot: '' });
    } catch (err: any) {
      console.warn('Direct message sending error:', err);
      setErrorMessage('Direct transmission encountered a connection error. You can retry or dispatch immediately via email client.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    formLoadTimeRef.current = Date.now();
    setFormData({ name: '', email: '', message: '', honeypot: '' });
    setFormErrors({});
    setSubmitStatus('idle');
    setErrorMessage(null);
  };

  return (
    <section id="contact" className="flex flex-col gap-6 pt-6 sm:pt-10 pb-24 scroll-mt-[4.5rem] sm:scroll-mt-20">
      {/* Section Header */}
      <div className="flex items-baseline justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 bg-[#F27D26] inline-block shadow-[0_0_10px_#F27D26]"></div>
          <h2 className="font-['Syne'] text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
            CONTACT
          </h2>
          <span className="font-['JetBrains_Mono'] text-[10px] tracking-[0.2em] px-2 py-0.5 bg-white/[0.04] text-[#F27D26] border border-white/20 uppercase">
            [DIRECT INBOX]
          </span>
        </div>
        <span className="font-['JetBrains_Mono'] text-[10px] tracking-[0.25em] text-white/50 uppercase">
          DIRECT CHANNELS &amp; MESSAGING
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Contact Direct Channels Ledger */}
        <div className="lg:col-span-7 bg-[#0E0E0E] p-4 sm:p-6 border border-white/15 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#F27D26] uppercase tracking-[0.25em] font-semibold">
              GET IN TOUCH
            </span>
            <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-white/70 font-light leading-relaxed">
              Reach out directly through any of the channels below.
            </p>
          </div>

          {/* Direct Channels List (Email, LinkedIn, GitHub) */}
          <div className="flex flex-col gap-2.5">
            {/* Primary Email - Direct Mail Link with Quick Copy Shortcut */}
            <div className="flex items-start sm:items-center justify-between p-3.5 bg-[#141414] hover:bg-white/[0.05] border border-white/15 hover:border-[#F27D26]/60 transition-all group relative">
              <div className="flex flex-1 min-w-0 items-center gap-3">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="w-8 h-8 bg-white/[0.04] group-hover:bg-[#F27D26]/10 flex items-center justify-center border border-white/15 group-hover:border-[#F27D26]/50 text-[#F27D26] shrink-0 transition-colors"
                  aria-label={`Email ${PERSONAL_INFO.email}`}
                  title={`Open mail client to ${PERSONAL_INFO.email}`}
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="flex flex-1 min-w-0 flex-col" title={`Open mail client to ${PERSONAL_INFO.email}`}>
                  <div className="flex items-center gap-2">
                    <span className="font-['JetBrains_Mono'] text-[9px] text-white/50 uppercase tracking-widest">
                      PRIMARY EMAIL
                    </span>
                  </div>
                  <span className="font-['JetBrains_Mono'] text-xs sm:text-sm text-white font-medium whitespace-nowrap group-hover:text-[#F27D26] transition-colors">
                    {PERSONAL_INFO.email}
                  </span>
                </a>
              </div>

              <div className="flex items-center gap-2 shrink-0 ml-2">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex max-[639px]:hidden max-[639px]:pointer-events-none px-2 sm:px-2.5 py-1 bg-white/[0.04] hover:bg-[#F27D26] text-white hover:text-[#080808] border border-white/15 text-[10px] font-['JetBrains_Mono'] uppercase tracking-wider items-center gap-1 transition-colors"
                  title="Copy email address"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-[#22C55E]" />
                      <span className="text-[#22C55E] font-bold">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-white/70" />
                      <span className="hidden sm:inline">COPY</span>
                    </>
                  )}
                </button>
                <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-[#F27D26] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </div>

            {/* LinkedIn Profile */}
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 bg-[#141414] hover:bg-white/[0.05] border border-white/15 hover:border-[#F27D26]/60 transition-all group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 bg-white/[0.04] group-hover:bg-[#F27D26]/10 flex items-center justify-center border border-white/15 group-hover:border-[#F27D26]/50 text-[#F27D26] shrink-0 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-['JetBrains_Mono'] text-[9px] text-white/50 uppercase tracking-widest">
                    LINKEDIN PROFILE
                  </span>
                  <span className="font-['JetBrains_Mono'] text-xs sm:text-sm text-white font-medium group-hover:text-[#F27D26] transition-colors">
                    {PERSONAL_INFO.linkedinDisplay}
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-[#F27D26] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
            </a>

            {/* GitHub Profile */}
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 bg-[#141414] hover:bg-white/[0.05] border border-white/15 hover:border-[#F27D26]/60 transition-all group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 bg-white/[0.04] group-hover:bg-[#F27D26]/10 flex items-center justify-center border border-white/15 group-hover:border-[#F27D26]/50 text-[#F27D26] shrink-0 transition-colors">
                  <Github className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-['JetBrains_Mono'] text-[9px] text-white/50 uppercase tracking-widest">
                    SOURCE REPOSITORY
                  </span>
                  <span className="font-['JetBrains_Mono'] text-xs sm:text-sm text-white font-medium group-hover:text-[#F27D26] transition-colors">
                    {PERSONAL_INFO.githubDisplay}
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-[#F27D26] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
            </a>
          </div>

          {/* Transmission Metadata Footer */}
          <div className="flex flex-col gap-1.5 pt-3 border-t border-white/10 text-[10px] font-['JetBrains_Mono'] tracking-wider">
            <div className="flex items-center justify-between flex-wrap gap-1">
              <span className="text-white/50 uppercase">SPOKEN LANGUAGES:</span>
              <span className="text-white">{PERSONAL_INFO.languages}</span>
            </div>
          </div>
        </div>

        {/* Right: Message Form Box */}
        <div className="lg:col-span-5 bg-[#0E0E0E] p-4 sm:p-6 border border-white/15 flex flex-col justify-start gap-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#F27D26]" />
              <h3 className="font-['Syne'] text-base font-bold text-white uppercase tracking-tight">
                SEND A MESSAGE
              </h3>
            </div>
          </div>

          {submitStatus === 'success' ? (
            <div className="p-6 bg-[#141414] border border-[#22C55E]/40 flex flex-col items-center text-center gap-3.5 font-['JetBrains_Mono'] relative">
              <div className="w-12 h-12 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 flex items-center justify-center text-[#22C55E]">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-white font-['Syne'] tracking-wide">
                  Your message was sent successfully.
                </span>
                <p className="text-xs text-white/60 font-['Plus_Jakarta_Sans'] font-light">
                  Thank you for reaching out. I will get back to you soon.
                </p>
              </div>

              <button
                type="button"
                onClick={handleResetForm}
                className="mt-2 px-4 py-2 bg-white/[0.06] hover:bg-[#F27D26] text-white hover:text-[#080808] border border-white/15 text-xs font-['JetBrains_Mono'] font-semibold tracking-wider transition-colors flex items-center justify-center gap-2 uppercase"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Send another message</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} noValidate className="flex flex-col gap-3">
              {/* Anti-spam honeypot input (hidden from real users, filled by bots) */}
              <input
                type="text"
                name="company_website_url"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: 'absolute', opacity: 0, zIndex: -1, pointerEvents: 'none' }}
              />

              {/* Error Banner if transmission failed */}
              {submitStatus === 'error' && (
                <div className="p-3 bg-[#FF5252]/10 border border-[#FF5252]/40 text-[11px] font-['JetBrains_Mono'] flex flex-col gap-2">
                  <div className="flex items-center gap-1.5 text-[#FF5252]">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span className="font-semibold uppercase tracking-wider">Direct Transmission Notice</span>
                  </div>
                  <p className="text-white/80 font-['Plus_Jakarta_Sans'] text-xs font-light">
                    {errorMessage}
                  </p>
                  {lastMailtoUrl && (
                    <div className="flex items-center gap-2 pt-1">
                      <a
                        href={lastMailtoUrl}
                        className="text-[10px] text-[#F27D26] hover:underline flex items-center gap-1 uppercase font-semibold"
                      >
                        <ExternalLink className="w-3 h-3" /> Open Email Client
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* Name Field */}
              <div className="flex flex-col gap-1">
                <label htmlFor="contact-name" className="font-['JetBrains_Mono'] text-[9px] text-white/50 uppercase tracking-widest flex items-center justify-between">
                  <span>YOUR NAME *</span>
                  {formErrors.name && (
                    <span id="contact-name-error" className="text-[#FF5252] flex items-center gap-1 normal-case text-[10px]">
                      <AlertCircle className="w-3 h-3 inline" /> {formErrors.name}
                    </span>
                  )}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  disabled={isSubmitting}
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (formErrors.name) setFormErrors({ ...formErrors, name: undefined });
                  }}
                  placeholder="e.g. Lead Engineer / Recruiter"
                  aria-invalid={Boolean(formErrors.name)}
                  aria-describedby={formErrors.name ? 'contact-name-error' : undefined}
                  className={`w-full px-3 py-2 bg-[#141414] border text-white text-xs font-['Plus_Jakarta_Sans'] focus:outline-none placeholder:text-white/30 transition-colors ${
                    formErrors.name ? 'border-[#FF5252] focus:border-[#FF5252]' : 'border-white/15 focus:border-[#F27D26]'
                  }`}
                />
              </div>

              {/* Email Field with Strict Anti-Spam Validation */}
              <div className="flex flex-col gap-1">
                <label htmlFor="contact-email" className="font-['JetBrains_Mono'] text-[9px] text-white/50 uppercase tracking-widest flex items-center justify-between">
                  <span>YOUR EMAIL *</span>
                  {formErrors.email && (
                    <span id="contact-email-error" className="text-[#FF5252] flex items-center gap-1 normal-case text-[10px]">
                      <AlertCircle className="w-3 h-3 inline" /> {formErrors.email}
                    </span>
                  )}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  disabled={isSubmitting}
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (formErrors.email) setFormErrors({ ...formErrors, email: undefined });
                  }}
                  placeholder="you@company.com"
                  aria-invalid={Boolean(formErrors.email)}
                  aria-describedby={formErrors.email ? 'contact-email-error' : undefined}
                  className={`w-full px-3 py-2 bg-[#141414] border text-white text-xs font-['Plus_Jakarta_Sans'] focus:outline-none placeholder:text-white/30 transition-colors ${
                    formErrors.email ? 'border-[#FF5252] focus:border-[#FF5252]' : 'border-white/15 focus:border-[#F27D26]'
                  }`}
                />
              </div>

              {/* Message Field */}
              <div className="flex flex-col gap-1">
                <label htmlFor="contact-message" className="font-['JetBrains_Mono'] text-[9px] text-white/50 uppercase tracking-widest flex items-center justify-between">
                  <span>MESSAGE *</span>
                  {formErrors.message && (
                    <span id="contact-message-error" className="text-[#FF5252] flex items-center gap-1 normal-case text-[10px]">
                      <AlertCircle className="w-3 h-3 inline" /> {formErrors.message}
                    </span>
                  )}
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  disabled={isSubmitting}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (formErrors.message) setFormErrors({ ...formErrors, message: undefined });
                  }}
                  placeholder="Discussing software engineering roles, distributed systems, or applied ML..."
                  aria-invalid={Boolean(formErrors.message)}
                  aria-describedby={formErrors.message ? 'contact-message-error' : undefined}
                  className={`w-full px-3 py-2 bg-[#141414] border text-white text-xs font-['Plus_Jakarta_Sans'] focus:outline-none placeholder:text-white/30 resize-none transition-colors ${
                    formErrors.message ? 'border-[#FF5252] focus:border-[#FF5252]' : 'border-white/15 focus:border-[#F27D26]'
                  }`}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-1 w-full py-2.5 bg-[#F27D26] hover:bg-[#FF9142] disabled:bg-[#F27D26]/50 disabled:cursor-not-allowed text-[#080808] font-['JetBrains_Mono'] text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-[0_2px_12px_rgba(242,125,38,0.25)]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>SENDING...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>SEND MESSAGE</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
