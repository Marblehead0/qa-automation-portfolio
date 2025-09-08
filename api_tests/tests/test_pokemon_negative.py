import pytest

@pytest.mark.regression
def test_invalid_pokemon_returns_404(client):
    r = client.get("/pokemon/99999", timeout=10)
    assert r.status_code == 404, f"unexpected status code: {r.status_code}: {r.text[:200]}"
