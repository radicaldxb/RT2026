const WEBHOOK_ENV = {
  qualified_lead: "N8N_QUALIFIED_WEBHOOK",
  warm_lead: "N8N_WARM_WEBHOOK",
  job_seeker: "N8N_JOB_WEBHOOK",
  vendor: "N8N_VENDOR_WEBHOOK",
};

async function postWebhook(url, event, payload) {
  if (!url) {
    console.error(`Webhook skipped (${event}): no URL configured`);
    return false;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(
        `Webhook failed (${event}): HTTP ${res.status} ${res.statusText}`,
        body.slice(0, 500)
      );
      return false;
    }

    return true;
  } catch (err) {
    console.error(`Webhook dispatch failed (${event}):`, err);
    return false;
  }
}

function webhookUrl(event) {
  const key = WEBHOOK_ENV[event];
  if (key && process.env[key]) {
    return process.env[key];
  }

  // Legacy single-webhook fallback (payload includes event field)
  return process.env.N8N_CHAT_WEBHOOK || null;
}

export function shouldBlockWebhook(meta) {
  return meta?.no_contact === true;
}

export async function fireQualifiedLead({ fields, score, unsubscribeToken, gdprOptIn }) {
  return postWebhook(webhookUrl("qualified_lead"), "qualified_lead", {
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
  return postWebhook(webhookUrl("warm_lead"), "warm_lead", {
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
  return postWebhook(webhookUrl("job_seeker"), "job_seeker", {
    event: "job_seeker",
    name: fields.name,
    email: fields.email,
    role_interest: fields.role_interest,
    unsubscribe_token: unsubscribeToken,
  });
}

export async function fireVendor({ fields, unsubscribeToken }) {
  return postWebhook(webhookUrl("vendor"), "vendor", {
    event: "vendor",
    name: fields.name,
    email: fields.email,
    company: fields.company,
    unsubscribe_token: unsubscribeToken,
  });
}
