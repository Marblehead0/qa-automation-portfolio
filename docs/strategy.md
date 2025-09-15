# 🧪 Test Strategy

This document explains the **test strategy** behind the QA Automation Portfolio project.  
It shows how tests are organized, why they are tagged, and how they align with the **testing pyramid**.

---

## 🎯 Goals
- Cover both **API** and **Web UI** with reliable automated tests.  
- Provide **fast feedback** with smoke tests on every push.  
- Ensure **deep coverage** with regression suites on PRs and main.  
- Integrate with **CI/CD** so quality gates are automatic.  

---

## 🔺 Testing Pyramid

    [ Few E2E / UI tests ]   → Playwright regression
    [ More Integration ]     → API + Web integration tests
    [ Lots of Unit tests ]   → Lightweight API calls, schema checks

- **Bottom (API tests):** Fast, stable, provide wide coverage of logic.  
- **Middle (Integration):** Small number of cross-layer checks (API ↔ Web).  
- **Top (UI regression):** Focused end-to-end user flows, tagged separately.  

---

## 🏷️ Test Types

### 1. API Tests
- **Framework:** Pytest (Python)  
- **Focus:** Validation of endpoints, response schemas, error handling.  
- **Features:**
  - Fixtures for clients & data  
  - Coverage reporting  
  - Schema validation (`jsonschema`)  
- **Tags:**
  - `@smoke` → health & happy-path API calls  
  - `@regression` → error handling, schema checks  

---

### 2. Web UI Tests
- **Framework:** Playwright (TypeScript)  
- **Pattern:** Page Object Model (LoginPage, ProductsPage, CartPage, CheckoutPage)  
- **Focus:** Critical flows and edge cases in **SauceDemo** app.  
- **Features:**
  - Screenshots, videos, traces for debugging  
  - Cross-browser support (Chromium, Firefox, WebKit)  
  - Path aliases (`@pages`, `@fixtures`, `@utils`)  
- **Tags:**
  - `@smoke` → Login + basic checkout flow  
  - `@regression` → Validation errors, logout, edge cases  

---

### 3. Integration Tests
- **Example:** API response cross-checked with UI content.  
- Purpose: Validate that **backend and frontend are in sync**.  
- Placed in `api_web_integration.spec.ts`.  

---

## ⚡ Execution Strategy

- **Local Development:**  
  - `pytest` for API (fast feedback).  
  - `npx playwright test` for UI (smoke or regression).  
  - Docker/Compose ensures reproducibility.  

- **Continuous Integration:**  
  - **Push:** Smoke API + Web.  
  - **Pull Request:** Regression API + Web.  
  - Reports + Coverage uploaded as artifacts and to GitHub Pages.  

---

## 📊 Metrics & Reporting
- **Coverage:** Measured for API layer with `pytest-cov`.  
- **Reports:**  
  - API → pytest-html  
  - Web → Playwright HTML  
  - Coverage → Codecov badge + trend  
- **Debugging:** Traces, videos, screenshots attached on failure.  

---

## 🚀 Continuous Improvement
- Add contract testing with Schemathesis or Pydantic.  
- Add visual regression testing.  
- Expand API↔Web integration scenarios.  
- Explore performance testing (Locust/k6).  

---
