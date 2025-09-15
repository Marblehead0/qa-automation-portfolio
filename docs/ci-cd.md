# ⚙️ CI/CD Pipeline

This project uses **GitHub Actions** to run tests, publish reports, and enforce quality gates.  
The pipeline is split into **API tests**, **Web UI smoke tests**, and **Web UI regression tests**, with clear triggers and artifacts.

---

## 🔄 Workflows

### 1. API Tests
- **Path:** `.github/workflows/api_tests.yml`
- **Triggers:** Every push and pull request.
- **Runs:**  
  - `pytest` for `api_tests/`  
  - Coverage (`pytest-cov`)  
  - HTML report (`pytest-html`)  
- **Artifacts:**  
  - API test report (HTML)  
  - Coverage report (HTML)  
- **Badges:** CI + Codecov displayed in README.

---

### 2. Web Smoke Tests
- **Path:** `.github/workflows/web_smoke.yml`
- **Triggers:** On push.  
- **Runs:**  
  - Playwright tests tagged `@smoke`  
- **Artifacts:**  
  - HTML report  
  - Screenshots  
  - Videos  
  - Traces  

---

### 3. Web Regression Tests
- **Path:** `.github/workflows/web_regression.yml`
- **Triggers:** On pull request (and optionally on main).  
- **Runs:**  
  - Playwright tests tagged `@regression`  
- **Artifacts:**  
  - HTML report  
  - Screenshots  
  - Videos  
  - Traces  

---

### 4. Deploy Reports
- **Path:** `.github/workflows/deploy-reports.yml`
- **Triggers:** When Smoke/Regression workflows finish.  
- **Action:** Publishes reports to `/docs` so they are viewable via GitHub Pages.  
- **Index:** `docs/index.html` links to the latest Smoke + Regression reports.

---

## 🐳 Docker Integration
- **Dockerfile** builds a shared image for API + Web tests.  
- **docker-compose.yml** defines services:
  - `api-tests`
  - `web-smoke`
  - `web-regression`
- Ensures local runs match CI environment.

---

## ✅ Quality Gates
- **Smoke tests** = fast feedback on push.  
- **Regression tests** = full suite on PR.  
- **Coverage** = enforced via Codecov.  
- **Artifacts** = always uploaded for debugging.  

---

## 📌 Notes
- Reports are available in **Actions artifacts** and via **GitHub Pages** (`/docs`).  
- Retry-on-fail is configured with Playwright traces.  
- Flaky tests are tracked in [Flake Triage Guide](flake-triage.md).  
