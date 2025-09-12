# Dockerfile
FROM mcr.microsoft.com/playwright:v1.48.0-jammy

# Install Python 3 + pip (Playwright image is Ubuntu Jammy, Node+browsers only)
RUN apt-get update && \
    apt-get install -y --no-install-recommends python3 python3-pip python3-venv && \
    ln -sf /usr/bin/python3 /usr/bin/python && \
    ln -sf /usr/bin/pip3 /usr/bin/pip && \
    rm -rf /var/lib/apt/lists/*

ENV PIP_DISABLE_PIP_VERSION_CHECK=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

COPY api_tests/requirements.txt api_tests/requirements.txt
RUN pip install --no-cache-dir -r api_tests/requirements.txt \
    && pip install pytest-html pytest-cov

# Copy the rest
COPY . .

# Install Node deps & Playwright browsers
WORKDIR /app/web_tests
RUN npm ci && npx playwright install --with-deps

CMD ["bash"]
