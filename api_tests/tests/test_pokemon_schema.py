import pytest
import requests
from jsonschema import validate
from api_tests.schemas.pokemon_schema import pokemon_schema

@pytest.mark.regression
def test_pokemon_response_schema():
    resp = requests.get("https://pokeapi.co/api/v2/pokemon/1")
    assert resp.status_code == 200
    data = resp.json()

    # Validate against schema
    validate(instance=data, schema=pokemon_schema)
