import requests

class APIClient:
    def __init__(self, base_url: str, timeout: int = 10):
        self.base_url = base_url.rstrip('/')
        self.timeout = timeout

    def get(self,path: str, **kwargs):
        url = f"{self.base_url}/{path.lstrip('/')}"
        if "timeout" not in kwargs:
            kwargs["timeout"] = self.timeout
        return requests.get(url, **kwargs)
    
    def get_pokemon(self, name: str):
        return self.get(f"/pokemon/{name}")


