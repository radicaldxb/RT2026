const WEBHOOK_ENV = {
  qualified_lead: "N8N_QUALIFIED_WEBHOOK",
  warm_lead: "N8N_WARM_WEBHOOK",
  job_seeker: "N8N_JOB_WEBHOOK",
  vendor: "N8N_VENDOR_WEBHOOK",
};

async function postWebhook(url, payload) {
  if (!url) return;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timeout);
  } catch (err) {
    console.error("Webhook dispatch failed:", err);
  }
}

function webhookUrl(event) {
  const key = WEBHOOK_ENV[event];
  if (!key) return null;
  return process.env[key] || null;
}

export function shouldBlockWebhook(meta) {
  return meta?.no_contact === true;
}

export async function fireQualifiedLead({ fields, score, unsubscribeToken, gdprOptIn }) {
  await postWebhook(webhookUrl("qualified_lead"), {
    event: "qualified_lead",
    name: fields.name,
    email: fields.email,
    score: score.total,
    situation_read: fields.situation_read,
    company: fields.company,
    url: fields.url,
    location: fields.location,
    gdpr_opt_in: gdprOptIn,
    unsubscribe_token: unsubscribeToken,
  });
}

export async function fireWarmLead({ fields, score, unsubscribeToken, gdprOptIn }) {
  await postWebhook(webhookUrl("warm_lead"), {
    event: "warm_lead",
    name: fields.name,
    email: fields.email,
    score: score.total,
    location: fields.location,
    gdpr_opt_in: gdprOptIn,
    unsubscribe_token: unsubscribeToken,
  });
}

export async function fireJobSeeker({ fields, unsubscribeToken }) {
  await postWebhook(webhookUrl("job_seeker"), {
    event: "job_seeker",
    name: fields.name,
    email: fields.email,
    role_interest: fields.role_interest,
    unsubscribe_token: unsubscribeToken,
  });
}

export async function fireVendor({ fields, unsubscribeToken }) {
  await postWebhook(webhookUrl("vendor"), {
    event: "vendor",
    name: fields.name,
    email: fields.email,
    company: fields.company,
    unsubscribe_token: unsubscribeToken,
  });
}
