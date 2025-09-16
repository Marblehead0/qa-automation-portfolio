import os
import requests

BASE_URL = os.getenv("API_BASE_URL", "https://pokeapi.co/api/v2")

def test_species_bulbasaur_shape():
    r = requests.get(f"{BASE_URL}/pokemon-species/bulbasaur", headers={"Accept": "application/json"})
    assert r.status_code == 200
    j = r.json()
    assert j["name"] == "bulbasaur"
    assert "base_happiness" in j
    assert "capture_rate" in j
    assert isinstance(j.get("color"), dict)
