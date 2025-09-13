# api_tests/utils/data_gen.py
"""
Deterministic test-data generator for API tests.

Usage:
    from utils.data_gen import DataGen

    dg = DataGen("signup1")
    email = dg.email()
    username = dg.username()
    order_id = dg.int_range(1000, 9999)
"""

from __future__ import annotations
import hashlib
import random
import string
import uuid
from typing import Optional


class DataGen:
    """Seeded generator so the same seed yields the same values every run."""

    def __init__(self, seed: str | int = "default") -> None:
        # Do NOT touch global RNG; keep a private RNG
        if isinstance(seed, int):
            self._rng = random.Random(seed)
        else:
            # Hash string seeds to a stable int
            h = int(hashlib.sha256(seed.encode("utf-8")).hexdigest(), 16) % (2**32)
            self._rng = random.Random(h)

    def letters(self, n: int = 8) -> str:
        return "".join(self._rng.choices(string.ascii_lowercase, k=n))

    def digits(self, n: int = 6) -> str:
        return "".join(self._rng.choices(string.digits, k=n))

    def username(self, prefix: str = "user", n: int = 6) -> str:
        return f"{prefix}_{self.letters(n)}"

    def email(self, domain: str = "example.com", local_len: int = 8) -> str:
        return f"{self.letters(local_len)}@{domain}"

    def int_range(self, lo: int, hi: int) -> int:
        return self._rng.randint(lo, hi)

    def uuid_deterministic(self, namespace: Optional[uuid.UUID] = None, name: Optional[str] = None) -> str:
        """
        Deterministic UUID (v5) based on current RNG state + optional namespace/name.
        Useful for idempotent resource keys in tests.
        """
        ns = namespace or uuid.NAMESPACE_URL
        nm = name or f"{self.letters(6)}-{self.digits(4)}"
        return str(uuid.uuid5(ns, nm))
