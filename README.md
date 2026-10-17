# ISM 310 Learning Hub v1.1.0

One consolidated learning route for Dr. George Antoniou’s four-week Defense in Depth course. The Library-recovered Week 1–4 practice packages provide 16 days and 32 existing activity sections. The hub now enforces sequential day/week navigation with response-presence, feedback-attempt, and exit-response checks before completion. It retains research applications and progress/notes backup and restore.

## Open the package
Open `docs/index.html` locally, or serve the `docs` folder through an approved web host. Local file storage varies by browser, so use Download backup. Hosted HTTPS on one origin is the intended deployment path.

The `docs` folder contains all student-facing website files, eight student workbook/slide downloads, and the four adapted weekly practice pages. Instructor guides, full unpublished manuscripts, actual student records, credentials, APIs, and identity enrollment secrets are excluded.

## Authentication status
THIS VERSION DOES NOT IMPLEMENT AUTHENTICATION OR MFA. All client files can be opened directly. No email-domain form, Canvas-referrer bypass, custom Authenticator QR, or simulated login is included.

The requested Lynn-only restriction therefore is NOT active. Do not enable public GitHub Pages as the production student service while that restriction is required. GitHub can remain the private source repository; serve the student files behind an institution-controlled identity gateway. See `AUTHENTICATION_AND_MFA_PLAN.md` for the concrete design and prerequisites.

## GitHub organization
1. Create or use the intended ISM 310 repository; keep source private if Lynn-only access is required.
2. Upload this package’s contents, preserving `docs/`, root documentation, and `SOURCE_PROVENANCE.json`.
3. Commit the consolidated release as v1.1.0. Preserve the original weekly ZIP backups separately.
4. Do not add credentials, authentication QR secrets, student rosters, or submitted coursework.
5. A public preview can use Pages from `main` and `/docs` ONLY if the owner intentionally chooses public access. That would not meet the requested Lynn-only protection. No workflow is included that automatically publishes when pushed.
6. For the recommended protected deployment, have Lynn IT deploy `docs/` behind its approved Microsoft identity boundary and enforce access on all routes and downloads.

## Student route
Select Week 1 and Day 1. Use the lecture/workbook links, attempt the practice, review the debrief, and use the research connection when assigned. Enter the existing practice responses, check both activity feedback prompts, and answer the day’s exit questions. Then mark the day complete to unlock the next day. Day 4 unlocks the next week. Completed lessons remain revisitable. Correct answers are not required for an attempted practice check, and no grade is assigned. See `PROGRESSION_RULES_AND_RETEST.md`.

Thursday of Week 4 remains oral presentation day. Its two short checks do not add a substantive lecture. Its research synthesis is optional after presentations.

## Progress and notes
- Sequential completion, feedback-attempt records, and research notes save in browser storage when available.
- Weekly practice notes now save automatically in the unified version, using the earlier week-specific storage keys. Each embedded page states this change.
- No notes are sent to Canvas, Edcafe, an instructor dashboard, or a server by this application code. Hosting may keep normal access logs.
- A backup includes hub completion, research notes, and saved entries from all four weeks on that hosted origin.
- Restoring replaces this hub’s saved data on the device. Invalid schemas are rejected; permitted values are text/booleans with limits. Files must be under 2 MB.
- Clear removes this hub’s progress, four weekly practice keys, and four weekly feedback-review keys. Previously downloaded files remain unchanged.
- Existing notes saved under another hostname, protocol, or browser profile do not migrate automatically. Open the older site and export them before moving.
- No names, credentials, personal records, or graded submission text should be entered.

## Research applications
See `RESEARCH_INTEGRATION_MAP.md`. Each connection identifies its source type and limits. The empirical study, FILOTIMO-AI conceptual design, and watermarking technical/policy analysis are not interchangeable evidence. No full private manuscript is published. Consult the professor for assigned readings.

A 10–15-minute application replaces part of an existing debrief or clinic; it does not extend the 150-minute class or create a new graded task. Existing Word and PowerPoint files are preserved, not silently revised to include every new application.

## Dates and coursework
Current configuration is Fall Session C 2026. Weeks 1–3 Sunday due dates remain October 25, November 1, November 8 at 11:59 p.m. Eastern. Presentation upload is November 12 at 5:30 p.m. Eastern. DQ9–10, Project 4, and Final Report are November 13 at 5:00 p.m. Eastern. Current Canvas controls requirements and approved changes. The 3–5-minute versus 15-minute presentation wording conflict remains for the professor to resolve.

## Maintenance
`docs/course-data.js` stores week/day metadata, dates, research scenarios, source-scope descriptions, and existing course links. `docs/progress.js` contains sequential state normalization and validation. `docs/completion.js` checks practice-attempt completeness. `docs/lesson-bridge.js` reports current lesson readiness to the guarded hub. `docs/app.js` controls navigation and backup. Weekly original exercises remain in `docs/weeks/week1` through `week4`. Update course dates and links for a future section; no automatic Canvas synchronization exists.

## Verification
Pure state, application interaction, and simulated lesson-DOM tests cover sequential progression across all 16 days and 32 activities. Local resources, original activity preservation, and embedded script syntax are checked. Native browser visual testing of this new combined shell was unavailable in this managed session; the original weekly activities had previously passed browser checks. Verify the deployed protected site on desktop and mobile before student release.
