# Flake Triage Playbook

A guide for identifying, categorizing, and handling flaky tests in this project.

---

## 1. Detecting a Flake
- Test passes locally but fails intermittently in CI.  
- Test fails with no related code changes.  
- Rerunning the same test produces different outcomes.

---

## 2. Common Flake Causes
- **Timing issues** → race conditions, missing awaits, brittle waits.  
- **External dependencies** → network, APIs, services unavailable.  
- **Test data** → reused IDs, random values without seeds.  
- **Environment** → slow CI runners, parallel execution side effects.  
- **Selectors** → unstable locators, changing DOM structure.  

---

## 3. Triage Steps
1. Re-run test locally and in CI.  
2. Capture logs, screenshots, traces, console errors.  
3. Check if failure reproduces reliably under `--headed` or `--debug`.  
4. Isolate flaky step (e.g., selector, API call, race).  
5. Decide: Fix now, quarantine, or delete test.  

---

## 4. Fix Strategies
- Replace `waitForTimeout` with smarter waits (`toBeVisible`, `locator.waitFor`).  
- Use **deterministic test data** with seeded generators.  
- Add **network mocks** for unreliable API calls.  
- Strengthen **selectors** with roles, `data-test` attributes.  
- Add **retry logic** only if truly external (e.g., 3rd-party API).  

---

## 5. Handling in CI
- Mark flaky tests with `@flaky` tag until fixed.  
- Auto-rerun once in CI (`--retries=1`) to detect real vs flaky.  
- Quarantine unstable tests into a `flaky/` folder or tag.  

---

## 6. Communication
- Document flaky test in `README` or issue tracker.  
- Assign owner + expected resolution timeline.  
- Track flake frequency to decide whether to delete test.  

---

✅ **Goal:** Keep the suite trustworthy.  
Every flaky test reduces confidence — fix or remove quickly.
