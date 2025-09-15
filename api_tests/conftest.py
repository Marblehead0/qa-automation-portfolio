
import pytest
from .utils.api_client import APIClient
from api_tests.utils.data_gen import DataGen
from dotenv import load_dotenv
import os

load_dotenv()

BASE = os.getenv("API_BASE_URL", "https://pokeapi.co/api/v2")
TOKEN = os.getenv("API_TOKEN") 

env = os.getenv("ENV", "local")

urls = {
    "local": "https://pokeapi.co/api/v2",
    "staging": os.getenv("STAGING_API_URL", "https://staging.example.com/api"),
    "prod": os.getenv("PROD_API_URL", "https://prod.example.com/api"),
}

# pass into your client as needed
client = APIClient(BASE, token=TOKEN)

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

@pytest.fixture(scope="session")
def api_client():
    base_url = os.getenv("API_BASE_URL", urls[env])
    token = os.getenv("API_TOKEN")
    return APIClient(base_url, token=token)
