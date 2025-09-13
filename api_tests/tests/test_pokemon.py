def test_get_pokemon(api_client):
    res = api_client.get_pokemon("pikachu")
    assert res.status_code == 200

    data = res.json()
    # Basic schema checks
    assert data["name"] == "pikachu"
    assert "id" in data
    assert "abilities" in data and isinstance(data["abilities"], list)
