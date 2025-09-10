# QA Automation Portfolio

![Build](https://github.com/Marblehead0/qa-automation-portfolio/actions/workflows/playwright.yml/badge.svg)
![Coverage](https://img.shields.io/badge/coverage-85%25-brightgreen)
![Languages](https://img.shields.io/badge/languages-Python%20%7C%20TypeScript-blue)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

---

## 📌 Overview
This is my end-to-end **QA Automation Portfolio** showcasing skills in API, Web, and CI/CD test automation.

It includes:
- ✅ API tests with **pytest + requests**
- ✅ Web tests with **Playwright + TypeScript** (Page Object Model)
- ✅ Negative & positive test flows
- ✅ CI/CD integration via **GitHub Actions**
- ✅ Coverage reporting with pytest-cov

## 🐞 Debugging & Reports

### Playwright (Web)
- Run tests: `cd web-tests && npx playwright test`
- HTML report: `npx playwright show-report`
- Headed mode (see browser): `npx playwright test --headed`
- Debug mode (inspector): `npx playwright test --debug`
- Trace viewer (on retries): `npx playwright show-trace test-results/**/trace.zip`

Artifacts on failures:
- Screenshots (`only-on-failure`)
- Videos (`retain-on-failure`)
- Traces (`on-first-retry`)

### Pytest (API)
- With coverage + HTML report:
  ```bash
  python -m pytest api_tests --cov=api_tests --cov-report=term-missing \
    --html=api-report.html --self-contained-html

📂 Project Structure & Imports

This project uses TypeScript path aliases for clean, maintainable imports.
Instead of long relative paths (../../pages/LoginPage), we configure tsconfig.json with baseUrl + paths to support absolute imports.

Example (web-tests/tsconfig.json):

{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "pages/*": ["pages/*"],
      "fixtures/*": ["fixtures/*"],
      "helpers/*": ["helpers/*"]
    }
  }
}


Before (relative imports):

import { LoginPage } from "../pages/LoginPage";
import { CREDS } from "../helpers/creds";


After (absolute imports):

import { LoginPage } from "pages/LoginPage";
import { CREDS } from "helpers/creds";


✅ This ensures:

Cleaner code — no fragile ../.. paths

Cross-platform reliability — avoids case sensitivity issues in CI (Linux vs Windows)

Scalability — easy to manage as the project grows


