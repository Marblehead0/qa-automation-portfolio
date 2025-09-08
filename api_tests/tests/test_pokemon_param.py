import pytest

@pytest.mark.parametrize("pokemon_id,expected_name", [
    (1, "bulbasaur"),
    (4, "charmander"),
    (7, "squirtle"),
])

@pytest.mark.smoke
def test_known_pokemon_names(client, pokemon_id, expected_name):
    r = client.get(f"/pokemon/{pokemon_id}", timeout=10)
    assert r.status_code == 200, f"unexpected status code: {r.status_code}: {r.text[:200]}"
    data = r.json()
    assert data["name"] == expected_name
    assert isinstance(data["id"], int)  