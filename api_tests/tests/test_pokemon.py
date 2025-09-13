import pytest

@pytest.mark.parametrize("pokemon", ["pikachu", "bulbasaur", "charmander"])
def test_get_pokemon_basic_fields(api_client, pokemon):
    res = api_client.get_pokemon(pokemon)
    assert res.status_code == 200

    data = res.json()
    assert data["name"] == pokemon
    assert "id" in data
    assert isinstance(data.get("abilities"), list)

@pytest.mark.regression
def test_pokemon_schema_has_core_keys(api_client):
    res = api_client.get_pokemon("squirtle")
    assert res.status_code == 200
    data = res.json()

    expected_keys = {"id", "name", "height", "weight", "abilities"}
    missing = expected_keys.difference(data.keys())
    assert not missing, f"Missing keys from schema: {missing}"
