# api_tests/utils/api_client.py
from __future__ import annotations
import requests
from typing import Any, Dict, Optional


class APIClient:
    def __init__(self, base_url: str, token: Optional[str] = None, default_headers: Optional[Dict[str, str]] = None):

        self.base_url = base_url.rstrip("/")
        self.session = requests.Session()

        # Start with JSON-friendly defaults
        headers: Dict[str, str] = {
            "Accept": "application/json",
        }

        if token:
            headers["Authorization"] = f"Bearer {token}"

        if default_headers:
            headers.update(default_headers)

        self.session.headers.update(headers)

    # ---- Low-level helpers ----
    def get(self, path: str, **kwargs) -> requests.Response:
        return self.session.get(f"{self.base_url}{path}", **kwargs)

    def post(self, path: str, json: Any = None, **kwargs) -> requests.Response:
        return self.session.post(f"{self.base_url}{path}", json=json, **kwargs)

    def put(self, path: str, json: Any = None, **kwargs) -> requests.Response:
        return self.session.put(f"{self.base_url}{path}", json=json, **kwargs)

    def patch(self, path: str, json: Any = None, **kwargs) -> requests.Response:
        return self.session.patch(f"{self.base_url}{path}", json=json, **kwargs)

    def delete(self, path: str, **kwargs) -> requests.Response:
        return self.session.delete(f"{self.base_url}{path}", **kwargs)

    # ---- Domain helpers (examples you use) ----
    def get_pokemon(self, name: str) -> requests.Response:
        return self.get(f"/pokemon/{name}")
