import requests
import pytest

@pytest.mark.smoke
def test_health_pokemon_endpoint(base_url):
    r = requests.get(f"{base_url}/pokemon/1", timeout=10)
    assert r.status_code == 200
    body = r.json()
    assert "name" in body
    assert "id" in body
    assert isinstance(body["id"], int)