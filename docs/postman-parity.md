# Postman ↔ Pytest parity (PokeAPI)

This repo keeps lightweight **Postman requests** in sync with **pytest** checks for the same flows.  
Target API (default): `https://pokeapi.co/api/v2`

## Parity table

| Area         | Endpoint/Flow                              | Postman request                       | Pytest test(s) (suggested path)                                  | Notes |
|--------------|--------------------------------------------|----------------------------------------|-------------------------------------------------------------------|------|
| Smoke list   | `GET /pokemon?limit=1`                     | **PokeAPI smoke**                      | `api_tests/pokeapi/test_pokemon_list.py::test_pokemon_list_smoke` | Asserts HTTP 200, response has `results` array, length ≤ 1 |
| Species info | `GET /pokemon-species/bulbasaur`           | **Pokemon species - Bulbasaur**        | `api_tests/pokeapi/test_species.py::test_species_bulbasaur_shape` | Asserts HTTP 200, `name == 'bulbasaur'`, has `base_happiness`, `capture_rate`, `color` |

> If you change the Postman assertions, mirror them in the pytest tests so both tools validate the same contract.

---

## Suggested pytest tests

Create these (if you haven’t already):

**`api_tests/pokeapi/test_pokemon_list.py`**
```python
import os
import requests

BASE_URL = os.getenv("API_BASE_URL", "https://pokeapi.co/api/v2")

def test_pokemon_list_smoke():
    r = requests.get(f"{BASE_URL}/pokemon", params={"limit": 1}, headers={"Accept": "application/json"})
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data.get("results"), list)
    assert len(data["results"]) <= 1
