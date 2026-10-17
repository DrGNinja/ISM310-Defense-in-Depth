# ISM 310 sequential progression update v1.1.0

## What changed
Version 1.0.0 allowed free navigation. Version 1.1.0 requires the daily practice attempt before advancing. Future day and week buttons and the Continue button are disabled and visibly gray until prerequisites are satisfied. Completed days remain available for review.

## Daily completion
1. Enter responses in the existing activity fields. For checkbox activities, follow the existing selection instruction: A2 requires exactly three selections; C2 requires at least one; D7 requires its three readiness checks.
2. Use each activity’s Check practice reasoning button after completing the responses. Changing an activity response makes its feedback check pending again.
3. Answer the day’s existing exit questions. Week 4 Thursday uses its two brief checks and does not add an exit ticket. D7’s optional technical-issue field is not required.
4. The Mark this day complete control becomes available when those checks are satisfied.
5. Mark the day complete. Continue and the next day become available. Completing Day 4 unlocks the next week.

Incorrect attempts can still be reviewed and completed. These controls verify response presence and feedback interaction, not quality, correctness, understanding, attendance, or a grade. Optional faculty-research notes do not gate progression. No rubric, course deadline, Canvas requirement, or graded submission has changed.

## Revisit and reset behavior
Completed days can be reopened. Editing notes after completion does not automatically erase the completion record. If a student explicitly marks a completed day incomplete, the confirmation explains that later lessons will relock; notes remain saved. Clear hub progress and notes resets the full route to Week 1 Day 1.

Version 1.0.0 completion records were unrestricted. They therefore reset when loaded or imported into v1.1.0; research notes and practice responses remain available. Feedback checks must be performed under the new rules. The interface reports this migration. Later-version backups preserve only a contiguous sequence of completed days; gaps cannot unlock future weeks.

## Replace the GitHub files
1. Keep the old ZIP as a backup on your computer.
2. Extract the new v1.1.0 ZIP.
3. Upload its contents to the same repository root, preserving the `docs` folder. Replace matching files; do not put a second outer version folder inside `docs`.
4. The update adds `docs/completion.js` and `docs/lesson-bridge.js`. These files are required along with the updated root scripts and weekly pages.
5. Use commit message: Enforce sequential daily practice progression v1.1.0.
6. Download the updated repository ZIP, extract it, and open `docs/index.html` to test. On a hosted copy, use a hard refresh if old files appear. The root asset references include a version query to reduce stale-cache issues.
7. Authentication is still not implemented. Keep the deployment restrictions in the MFA plan.

## Retest in a fresh practice state
Download a backup first if you want to preserve your test notes. Then use Clear hub progress and notes.

A. First visit: only Week 1 Day 1 should be available. Day 2–4, Week 2–4, the completion checkbox, and Continue should be disabled.
B. Fill only the first activity: progression must remain locked.
C. Fill both activities without checking their feedback: progression must remain locked.
D. Check feedback but leave an exit response blank: progression must remain locked.
E. Complete both activities, their feedback checks, and all exit responses: the completion control should become available; Continue remains locked until you mark the day complete.
F. Mark Day 1 complete: Day 2 and Continue should become available; Day 3 and Week 2 remain locked.
G. Complete Days 2–4: Week 2 becomes available only after Day 4 is marked complete.
H. Try `#week=4&day=4` in the address bar before unlocking it: the hub should return to the current unlocked day.
I. Open a raw weekly page directly: it should redirect to the hub so the same normal navigation checks apply.
J. Reopen a completed earlier day: review is allowed. Mark it incomplete and confirm: later lessons relock while notes remain.
K. Refresh: saved sequential progress should return when browser storage is available.
L. Restore an older v1.0.0 backup: notes return, but unrestricted completion resets and the interface explains why.

## Test evidence and limits
Application/state and simulated lesson-DOM tests exercise all 16 days and all 32 activity sections, including feedback invalidation, exit checks, checkbox rules, blocked jumps, cross-week transitions, restore normalization, and scoped reset. Original activity prompts and answer explanations remain unchanged. Syntax and local-resource checks also pass.

Native browser visual testing was unavailable in this managed session. Perform the retest above in your actual Edge/Chrome browser before release. The new disabled-button styling and iframe interactions need that final deployed-browser check.

This is a browser-side learning workflow gate. A user who edits JavaScript/storage can bypass it, and downloaded workbook files remain readable. MFA or authenticated, tamper-resistant completion requires the protected server/Canvas architecture described separately. Do not use browser completion as a secure graded prerequisite or represent it as Lynn-authenticated evidence.
