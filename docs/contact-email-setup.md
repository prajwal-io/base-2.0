# Contact email delivery

The contact form uses Gmail SMTP when configured. It applies a shared limit of
20 direct-send attempts per hour per client IP using Upstash Redis. If SMTP is
not configured, the form prepares a Gmail draft for the visitor. If the rate
limit service or trusted client IP is unavailable, the server does not send
email and offers the draft instead.

Set these variables in the deployment environment (and in `.env.local` for
local testing):

| Variable | Purpose |
| --- | --- |
| `CONTACT_SMTP_USER` | Gmail account used to send the message; defaults to `backtobase2025@gmail.com`. |
| `CONTACT_SMTP_APP_PASSWORD` | App password for that Gmail account. |
| `UPSTASH_REDIS_REST_URL` | REST URL for the Upstash Redis database used by the limiter. |
| `UPSTASH_REDIS_REST_TOKEN` | REST token for that database. |

Create the Upstash database and copy its REST URL and token into the deployment
environment. Keep all four values private; do not commit `.env.local` or real
credentials. On Vercel, the action uses the platform-provided
`x-vercel-forwarded-for` address. On a different host, configure an equivalent
trusted client-IP source before enabling SMTP delivery; without one, the form
uses its Gmail draft fallback.
