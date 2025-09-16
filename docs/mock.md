# Mock API (Prism)

This repo provides a small **OpenAPI 3** spec and a **Prism** mock so tests/demos can run even if the real API is unavailable.

- **Spec**: `api/spec/openapi.yaml`
- **Default port**: `http://localhost:4010`

## Run locally
```bash
npm run mock:api
# or via Docker:
# docker compose up -d prism
