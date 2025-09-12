# QA Automation Portfolio
![Languages](https://img.shields.io/badge/languages-Python%20%7C%20TypeScript-blue)
[![Coverage](https://codecov.io/gh/Marblehead0/qa-automation-portfolio/branch/main/graph/badge.svg)](https://codecov.io/gh/Marblehead0/qa-automation-portfolio)
[![Playwright Smoke Report](https://img.shields.io/badge/Report-Smoke-blue?logo=github)](https://Marblehead0.github.io/qa-automation-portfolio/web-smoke-report/index.html)  
[![Playwright Regression Report](https://img.shields.io/badge/Report-Regression-blue?logo=github)](https://Marblehead0.github.io/qa-automation-portfolio/web-regression-report/index.html)

---
# 📖 Overview

This project demonstrates API and Web automation with CI/CD pipelines, reporting, and coverage — similar to real QA team setups.

It showcases:

API testing with Pytest + coverage + HTML reports

Web UI testing with Playwright + TypeScript + Page Object Model

CI/CD pipelines in GitHub Actions (push/PR triggers, smoke/regression tags, artifacts)

Reporting & coverage with Codecov and GitHub Pages

# 🚀 Features

API Tests → Python + Pytest + Coverage + HTML report

Web UI Tests → Playwright + TypeScript + Page Object Model + path aliases

Test Tagging → @smoke and @regression

GitHub Actions CI/CD

API tests run on every push + PR

Smoke tests (@smoke) run on push

Regression tests (@regression) run on PRs + main branch

Artifacts uploaded (reports, traces, screenshots, coverage)

Badges → Build Status + Code Coverage

# 📂 Project Structure
qa-automation-portfolio/
├── api-tests/
│   ├── tests/                # API test cases
│   ├── conftest.py           # Shared fixtures
│   └── pytest.ini            # Pytest config
├── web-tests/
│   ├── tests/                # UI test cases
│   ├── pages/                # Page Object Model
│   ├── playwright.config.ts  # Playwright config
│   └── tsconfig.json         # Path aliases
├── .github/
│   └── workflows/            # CI/CD workflows
├── docs/                     # Screenshots & published reports
├── reports/                  # Local test reports
├── requirements.txt          # Python deps
├── package.json              # Node deps
└── README.md

# ⚙️ Usage

# Run API Tests
🔹 Install Python dependencies
pip install -r requirements.txt

🔹 Run all API tests with coverage + HTML report
python -m pytest api-tests \
  --html=reports/api-report.html --self-contained-html \
  --cov=api-tests --cov-report=html

# Run Web Tests
🔹 Install Node.js dependencies
npm install

🔹 Run all Playwright tests
npx playwright test

🔹 Run smoke tests only
npx playwright test --grep @smoke

🔹 Run regression tests only
npx playwright test --grep @regression



# 📊 Sample Reports & Screenshots

🔹 API Test Report (Pytest)
- [View API Coverage on Codecov](https://codecov.io/gh/Marblehead0/qa-automation-portfolio)
- Local sample report generated at: `reports/api-report.html`
- Example screenshot:

![API Report Example](docs/sample-api-report.png)

🔹 Web Test Report (Playwright)
- [Live Smoke Report](https://Marblehead0.github.io/qa-automation-portfolio/web-smoke-report/index.html)
- [Live Regression Report](https://Marblehead0.github.io/qa-automation-portfolio/web-regression-report/index.html)
- Example screenshot:

![Playwright Report Example](docs/sample-playwright-report.png)

### 🔹 Coverage Report (HTML)
- Local HTML coverage report generated at: `htmlcov/index.html`
- Uploaded automatically to Codecov

(Reports and screenshots are stored in reports/ and uploaded as GitHub Actions artifacts.)

# 🏗️ CI/CD Workflows

API tests → on push & PR

Smoke tests → on push

Regression tests → on PR & main

Reports deployed to GitHub Pages under /docs/.

# ✅ Status Badges

## ✅ Status Badges

[![API Tests](https://github.com/Marblehead0/qa-automation-portfolio/actions/workflows/api-tests.yml/badge.svg)](https://github.com/Marblehead0/qa-automation-portfolio/actions/workflows/api-tests.yml)  
[![Web Smoke Tests](https://github.com/Marblehead0/qa-automation-portfolio/actions/workflows/web-smoke.yml/badge.svg)](https://github.com/Marblehead0/qa-automation-portfolio/actions/workflows/web-smoke.yml)  
[![Web Regression Tests](https://github.com/Marblehead0/qa-automation-portfolio/actions/workflows/web-regression.yml/badge.svg)](https://github.com/Marblehead0/qa-automation-portfolio/actions/workflows/web-regression.yml)  
[![Coverage](https://codecov.io/gh/Marblehead0/qa-automation-portfolio/branch/main/graph/badge.svg)](https://codecov.io/gh/Marblehead0/qa-automation-portfolio)  
[![Playwright Smoke Report](https://img.shields.io/badge/Report-Smoke-blue?logo=github)](https://Marblehead0.github.io/qa-automation-portfolio/web-smoke-report/index.html)  
[![Playwright Regression Report](https://img.shields.io/badge/Report-Regression-blue?logo=github)](https://Marblehead0.github.io/qa-automation-portfolio/web-regression-report/index.html)



# 👨‍💻 Tech Stack

Python (Pytest, Coverage, HTML reporting)

TypeScript (Playwright, Page Object Model)

GitHub Actions (CI/CD, artifacts, Pages deployment)

Codecov (coverage tracking)

# 📌 Future Improvements

API contract testing (schemathesis, pydantic)

Visual regression for UI

Allure reports integration

Docker setup for local runs


