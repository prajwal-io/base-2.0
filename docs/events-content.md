# Event content

Edit `src/data/editions.json` to add or update event records. Keep each record's
`editionNumber` unique and use `Completed` or `Upcoming` for `status`. The
homepage edition and venue totals, archive filters, speaker directory, and
edition links read from this shared catalogue.

After editing the JSON, run `pnpm typecheck` and `pnpm test`, then deploy the
site to publish the changes. This keeps event content separate from the React
components; it does not provide a browser-based CMS.

## Join applications

The join form opens a prefilled Gmail draft addressed to
`backtobase2025@gmail.com`. Applicants review and send the draft themselves; the
site does not send or store application details.
