# ISM 310 hub v1.1.0 release checks

Completed locally:
- Retrieved all four original weekly ZIPs from Library and recorded SHA-256 provenance.
- Confirmed four weeks, sixteen daily routes, and thirty-two unchanged activity records.
- Exercised cross-week continuation, revisiting, response/feedback/exit gated completion, and contiguous state normalization through application and pure-state tests.
- Tested progress/notes backup, valid restore, malformed-schema rejection, scoped reset, and blocked-storage handling.
- Checked iframe message source and hosted-origin rejection paths.
- Checked all local HTML resource links and all embedded script syntax.
- Confirmed eight student workbook/slide downloads and exclusion of instructor/Joe guides.
- Confirmed final deadlines retained in course configuration.
- No actual student roster, grades, authentication secret, MFA enrollment seed, or private full manuscript included.

Verification limit:
The new combined shell has not been visually tested in a native browser during this managed session. Browser-control capability required by the local workflow was unavailable. The four original weekly practice versions had previously passed browser checks. Before student release, test the protected deployed origin on desktop/mobile and verify iframe resizing, keyboard navigation, file downloads, local saving, backup/restore, and authentication. DOM simulation is not a substitute for that final browser check.

Not performed:
No GitHub repository was created or changed, no Pages site was published, no Canvas item was edited, and no identity tenant, MFA policy, or LTI registration was configured. Lynn-only protection is not active in this static preview. See the authentication plan before deployment.

Sequential update checks: future buttons and Next disabled, feedback invalidation after edits, all 16 lessons completed through actual legacy activity scripts in a simulated DOM, raw weekly-page redirect, legacy backup reset with notes retained, stale message rejection, and earlier-day relock. Browser completion remains editable local data, not a secure grade or authenticated record.
