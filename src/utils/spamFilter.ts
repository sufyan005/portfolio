
const DISPOSABLE_OR_FAKE_DOMAINS = new Set([
  'mailinator.com',
  'tempmail.com',
  '10minutemail.com',
  'guerrillamail.com',
  'yopmail.com',
  'trashmail.com',
  'sharklasers.com',
  'throwawaymail.com',
  'dispostable.com',
  'getairmail.com',
  'fakeinbox.com',
  'temp-mail.org',
  'generator.email',
  'emailondeck.com',
  'burnermail.io',
  'crazymailing.com',
  'dropmail.me',
  'fakemailgenerator.com',
  'mohmal.com',
  'maildrop.cc',
  'inboxbear.com',
  'mytemp.email',
  'nada.ltd',
  'getnada.com',
  'test.com',
  'fake.com',
  'example.com',
  'sample.com',
  'none.com',
  'spam.com',
  'nowhere.com',
  'noemail.com',
]);

const BLOCKED_EXACT_EMAILS = new Set([
  'test@test.com',
  'test@gmail.com',
  'admin@admin.com',
  'fake@fake.com',
  'asdf@asdf.com',
  'asdf@gmail.com',
  'none@none.com',
  'spam@spam.com',
  'user@domain.com',
  'example@example.com',
  'sample@sample.com',
  'abc@xyz.com',
  'a@b.com',
  '123@123.com',
  'test@mail.com',
  'nobody@nowhere.com',
  'aaa@aaa.com',
  'qwerty@gmail.com',
  'noemail@noemail.com',
  'user@example.com',
]);

const MALICIOUS_OR_BOT_PATTERNS = [
  // Code injection / XSS / SQLi
  /<script[\s\S]*?>[\s\S]*?<\/script>/i,
  /javascript:/i,
  /<iframe[\s\S]*?>/i,
  /onerror\s*=/i,
  /onload\s*=/i,
  /eval\s*\(/i,
  /union\s+select/i,
  /drop\s+table/i,
  /'\s*or\s*'1'\s*=\s*'1'/i,
  /buy\s+backlinks/i,
  /guest\s+post\s+outreach/i,
  /first\s+page\s+of\s+google/i,
  /rank\s+on\s+google/i,
  /increase\s+da\s+dr/i,
  /crypto\s+(investment|doubler|bonus|giveaway)/i,
  /bitcoin\s+(investment|doubler|generator|giveaway)/i,
  /claim\s+your\s+(prize|free\s+btc|reward|usdt)/i,
  /passive\s+income\s+\$\d+/i,
  /earn\s+\$\d{3,}\s+daily/i,
  /viagra|cialis/i,
  /casino\s+(bonus|free\s+spins)/i,
  /adult\s+dating|escort\s+service/i,
];

export interface SubmissionPayload {
  name: string;
  email: string;
  message: string;
  honeypot?: string;
  formLoadTime?: number;
}

export function isSpamOrMalicious(payload: SubmissionPayload): boolean {
  const { name = '', email = '', message = '', honeypot = '', formLoadTime } = payload;

  if (honeypot && honeypot.trim().length > 0) {
    return true;
  }

  if (formLoadTime && Date.now() - formLoadTime < 1000) {
    return true;
  }

  const cleanEmail = email.trim().toLowerCase();
  const cleanName = name.trim();
  const cleanMessage = message.trim();

  if (BLOCKED_EXACT_EMAILS.has(cleanEmail)) {
    return true;
  }

  const atIndex = cleanEmail.lastIndexOf('@');
  if (atIndex > 0) {
    const domain = cleanEmail.substring(atIndex + 1);
    if (DISPOSABLE_OR_FAKE_DOMAINS.has(domain)) {
      return true;
    }
  }

  const username = cleanEmail.split('@')[0] || '';
  if (/^(.)\1{5,}$/.test(username)) {
    return true;
  }

  const combinedText = `${cleanName} ${cleanMessage}`;
  for (const pattern of MALICIOUS_OR_BOT_PATTERNS) {
    if (pattern.test(combinedText)) {
      return true;
    }
  }

  if (/(.)\1{10,}/.test(cleanMessage)) {
    return true;
  }

  return false;
}
