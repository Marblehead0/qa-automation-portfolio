
import pytest
from .utils.api_client import APIClient
from api_tests.utils.data_gen import DataGen

@pytest.fixture(scope="session")
def base_url() -> str:
    return "https://pokeapi.co/api/v2"

@pytest.fixture(scope="session")
def client(base_url):
    return APIClient(base_url)

@pytest.fixture(scope="session")
def pokeapi_client():
    return APIClient("https://pokeapi.co/api/v2")

@pytest.fixture
def api_client(base_url: str) -> APIClient:
    return APIClient(base_url)

@pytest.fixture
def temp_user(api_client):
    dg = DataGen("temp-user-1")
    email = dg.email()
    res = api_client.create_user(email=email, password="Password123!")
    user = res.json()
    yield user

    try:
        api_client.delete_user(user["id"])
    except Exception:
        pass

@pytest.fixture
def api_client(pokeapi_client):
    yield pokeapi_client

