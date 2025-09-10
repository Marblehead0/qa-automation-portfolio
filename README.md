# QA Automation Portfolio

![Build](https://github.com/Marblehead0/qa-automation-portfolio/actions/workflows/playwright.yml/badge.svg)
![Languages](https://img.shields.io/badge/languages-Python%20%7C%20TypeScript-blue)
[![CI](https://github.com/Marblehead0/qa-automation-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/Marblehead0/qa-automation-portfolio/actions/workflows/ci.yml)
[![Coverage](https://codecov.io/gh/Marblehead0/qa-automation-portfolio/branch/main/graph/badge.svg)](https://codecov.io/gh/Marblehead0/qa-automation-portfolio)

---

🧪 QA Automation Portfolio

A QA Automation portfolio project showcasing both API testing (Python + Pytest) and Web UI testing (Playwright + TypeScript) with CI/CD pipelines on GitHub Actions.

This project demonstrates modern test automation practices used in real-world QA teams:

API tests with coverage + HTML reporting

Web UI tests with Page Object Model and tagged test suites

GitHub Actions workflows with artifacts, coverage, and status badges

🚀 Features

API Tests → Python + Pytest + Coverage + HTML report

Web UI Tests → Playwright + TypeScript + Page Object Model + path aliases

Test Tagging → @smoke and @regression

GitHub Actions CI/CD

API tests run on every push + PR

Smoke tests (@smoke) run on push

Regression tests (@regression) run on PRs + main branch

Artifacts uploaded (reports, traces, screenshots, coverage)

Badges → Build Status + Code Coverage

📂 Project Structure
qa-automation-portfolio/
├── api-tests/
│   ├── tests/                # API test cases
│   ├── conftest.py           # Shared fixtures
│   └── pytest.ini            # Pytest config
├── web-tests/
│   ├── tests/                # UI test cases
│   ├── pages/                # Page Object Model
│   ├── playwright.config.ts  # Playwright config
│   └── tsconfig.json         # TypeScript config (with path aliases)
├── .github/
│   └── workflows/
│       ├── api-tests.yml     # CI for API tests
│       └── web-tests.yml     # CI for UI tests
├── reports/                  # Test reports (HTML, coverage, traces, screenshots)
├── requirements.txt          # Python dependencies
├── package.json              # Node dependencies
├── README.md

⚙️ Setup & Usage
🔹 Run API Tests
# Install dependencies
pip install -r requirements.txt

# Run all API tests with coverage + HTML report
pytest --html=reports/api-report.html --self-contained-html \
       --cov=api-tests --cov-report=html

🔹 Run Web Tests
# Install dependencies
npm install

# Run all Playwright tests
npx playwright test

🔹 Run Tagged Tests
# Run smoke tests only
npx playwright test --grep @smoke

# Run regression tests only
npx playwright test --grep @regression

📊 Sample Reports & Screenshots

API Test Report (Pytest)


Web Test Report (Playwright)


Coverage Report (Codecov)


(Reports and screenshots are stored in reports/ and uploaded as GitHub Actions artifacts.)

🏗️ CI/CD Workflows

The project uses GitHub Actions for continuous testing:

✅ API Tests → Run on push + PR

✅ Smoke Tests (@smoke) → Run on push

✅ Regression Tests (@regression) → Run on PRs + main

📦 Artifacts → Test reports, coverage reports, screenshots, and traces are uploaded

👉 See the workflows in .github/workflows
.

✅ Status Badges

[![API Tests](https://github.com/Marblehead0/qa-automation-portfolio/actions/workflows/api-tests.yml/badge.svg)](https://github.com/Marblehead0/qa-automation-portfolio/actions/workflows/api-tests.yml)  
[![Web Tests](https://github.com/Marblehead0/qa-automation-portfolio/actions/workflows/web-tests.yml/badge.svg)](https://github.com/Marblehead0/qa-automation-portfolio/actions/workflows/web-tests.yml)  
[![codecov](https://codecov.io/gh/Marblehead0/qa-automation-portfolio/branch/main/graph/badge.svg)](https://codecov.io/gh/Marblehead0/qa-automation-portfolio)
[![Playwright Smoke Report](https://img.shields.io/badge/Report-Smoke-blue?logo=github)](https://Marblehead0.github.io/qa-automation-portfolio/web-smoke-report/index.html)  
[![Playwright Regression Report](https://img.shields.io/badge/Report-Regression-blue?logo=github)](https://Marblehead0.github.io/qa-automation-portfolio/web-regression-report/index.html)


👨‍💻 Tech Stack

Python (Pytest, Coverage, HTML reporting)

TypeScript (Playwright, Page Object Model)

GitHub Actions (CI/CD, artifacts, badges)

Codecov (coverage tracking)

📌 Future Improvements

Add API contract testing with schemathesis or pydantic

Add Visual Regression testing for UI

Integrate with Allure Reports for unified reporting

Add Docker support for easier local setup


