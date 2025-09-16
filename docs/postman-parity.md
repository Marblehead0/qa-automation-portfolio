# Postman ↔ Pytest parity

| Area   | Endpoint/Flow | Pytest test(s)                                       | Postman request(s) | Notes             |
|--------|----------------|------------------------------------------------------|--------------------|-------------------|
| Health | GET /health    | `api_tests/test_health.py::test_health_ok` (example) | `Health`           | Asserts status ok |

**How to keep parity**
- Each time you add a new API pytest, add a matching Postman request and update this table.
- Align expected shapes with your JSON Schemas and/or OpenAPI examples.
