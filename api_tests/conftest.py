import pytest
from .utils.api_client import APIClient

@pytest.fixture(scope="session")
def base_url():
    return "https://pokeapi.co/api/v2"

@pytest.fixture(scope="session")
def client(base_url):
    return APIClient(base_url)
