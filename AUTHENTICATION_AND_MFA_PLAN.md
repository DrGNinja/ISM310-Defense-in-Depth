# ISM 310 Lynn sign in and MFA implementation plan

Status: design for implementation with Lynn IT. The consolidated v1.0.0 hub is a static preview with no authentication. No tenant, application, authentication policy, Canvas external tool, server session, or MFA enrollment was configured.

## Recommended access experience
Use one institutional sign-in policy regardless of entry route.

Canvas entry: student opens the hub from the course. The protected host checks for a valid application session; otherwise it redirects to Lynn Microsoft sign-in. If the existing institutional session satisfies policy, the identity service may provide seamless single sign-on. A Canvas hyperlink, browser referrer, query string, or iframe is never accepted as proof of identity or MFA.

Direct entry: the same application session and Lynn identity checks apply. Microsoft enforces the institution’s configured MFA requirement. An already enrolled student uses the existing approved method. If registration is required, Microsoft presents the institution-authorized setup flow; its individual QR code can enroll the work/school account in Authenticator. The hub does not generate, display, receive, or store an MFA seed or recovery code.

Recommendation: do not require a second app-specific Authenticator enrollment just because a student opens the hub outside Canvas. Entry location is not an authentication assurance level. A valid policy-compliant institutional session can be reused according to Lynn’s settings.

## Lynn identity and authorization
Ask Lynn IT to provision a single-tenant application in the actual Lynn Microsoft Entra tenant. Single-tenant configuration alone can still admit guest accounts in that tenant; it is not sufficient for the full requirement.

Proposed authorization policy:
- Permit only institution-managed Lynn member identities assigned to the application and approved student/faculty groups. Exclude guests/external identities unless the owner explicitly changes the requirement.
- If access should be limited to ISM 310, use a maintained course-access group or verified enrollment mapping, not every Lynn account.
- Confirm institutional sign-in domains and aliases with IT. Use directory-backed identity and group checks, not a user-entered email or an `endsWith('@lynn.edu')` client check as the security boundary.
- Reject personal Microsoft accounts, other tenants, unassigned accounts, expired/revoked sessions, and malformed credentials.
- Enforce MFA or an approved authentication strength through the identity policy. Lynn IT must confirm available licensing, permitted methods, registration rules, recovery arrangements, and session/sign-in frequency.

A domain allowlist may be a supplementary check on authoritative directory attributes after identity verification. It cannot replace tenant, membership, assignment, and session validation.

## Protected hosting boundary
Keep GitHub for version control. The recommended production deployment serves `docs/` from a Lynn-approved protected host or identity-aware gateway using Microsoft identity. The gateway must protect the homepage, every weekly page, downloads, and any future APIs. A public alternative origin or public copies of protected content would bypass that boundary.

Standard public GitHub Pages cannot implement this application’s arbitrary Lynn-domain/MFA authorization by adding JavaScript. A private repository also does not automatically make its Pages site private. GitHub Enterprise Pages access control is a separate organizational feature and is not a substitute for the proposed Lynn Entra course-access policy.

No fake login button, QR image, or referrer-based bypass should be added to the static package. Until a protected host is configured and tested, the preview must not be represented as Lynn-only.

## Technical flow for the implementer
Preferred approach: institution-managed authentication at the hosting layer, with server-side authorization for all student content. If a custom application is required, use the supported Microsoft sign-in library and authorization-code flow with PKCE. Validate returned identity assertions with the supported library, including issuer/tenant, audience, signature, expiry, state, and nonce as appropriate to the flow. Establish a secure application session and recheck authorization.

Keep secrets and certificates in server-side secret management. Use secure HttpOnly cookies and appropriate SameSite/CSRF protections for the chosen top-level launch. Validate API access tokens at the resource/API for the intended issuer, audience, and permissions; an ID token is not an API authorization token. Do not put secrets, refresh tokens, or MFA material in GitHub, static JavaScript, URLs, or practice localStorage.

Use top-level/new-tab launches initially to avoid third-party cookie and identity-provider framing problems. Session reuse must follow the identity provider’s verified state, not the presence of an `amr` string supplied by the browser.

## Optional Canvas LTI 1.3 integration
LTI 1.3 is useful if the hub must receive a verified course/role context. It requires Canvas administrator registration and a server endpoint; a normal module link is not an LTI launch.

The tool must validate the platform’s signed launch and deployment/context using an established LTI library. Bind launch identity to the authorized application identity/enrollment model. A valid LTI launch alone does not establish that Lynn’s required Microsoft MFA policy was satisfied. Continue the common identity policy unless IT has explicitly designed and verified an equivalent trusted federation arrangement. Grade return and roster access are unnecessary for this practice hub and should not be requested by default.

## Concrete information needed from Lynn IT
1. Actual Entra tenant and approved application registration owner.
2. Application/client ID, protected production hostname, and registered redirect/logout URLs.
3. Approved Lynn member/role/course groups and lifecycle owner.
4. Permitted institutional domains/aliases and treatment of guests.
5. MFA/authentication-strength policy, registration, recovery, and session rules.
6. Protected hosting configuration covering all resources and eliminating public bypass origins.
7. If LTI is selected: Canvas issuer, client/deployment configuration, key-discovery details, launch endpoints, and approved identity mapping.

These are prerequisites for configuration, not credentials the student supplies. Do not send client secrets, QR enrollment codes, or passwords through this document or the course hub.

## Release tests before claiming Lynn-only access
- Assigned Lynn member through Canvas: access only after valid identity/policy checks; existing compliant session may be reused.
- Assigned Lynn member via a direct deep link: identical policy enforcement.
- Lynn member not enrolled in the approved method: identity service applies its registration or denial flow.
- Non-Lynn tenant, personal account, guest, and unassigned member: denied according to the defined policy.
- Forged `fromCanvas=true`, spoofed referrer, unsigned/tampered LTI launch, and expired/replayed assertions: no bypass.
- Direct weekly page and DOCX/PPTX download before sign-in: blocked by the protected host.
- Logout, revoked access, disabled account, and expired session: behavior follows the institutional policy.
- Browser back, mobile, supported accessibility paths, and top-level launch: tested with IT-approved accounts.
- No authentication secrets or student records in repository, browser practice storage, or URLs.

## Official implementation sources reviewed October 17 2026
Microsoft tenancy and guests: https://learn.microsoft.com/en-us/entra/identity-platform/single-and-multi-tenant-apps
Microsoft Conditional Access: https://learn.microsoft.com/en-us/entra/identity/conditional-access/overview
Microsoft tokens: https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens
Microsoft Authenticator work/school enrollment: https://support.microsoft.com/en-us/authenticator/how-to-add-your-accounts-to-microsoft-authenticator
LTI 1.3 specification: https://www.imsglobal.org/spec/lti/v1p3
GitHub Pages visibility: https://docs.github.com/en/enterprise-cloud@latest/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site

The architecture and release tests above are proposed design decisions for this hub, not a claim that Lynn currently uses a particular tenant configuration, license, or Canvas federation flow.
