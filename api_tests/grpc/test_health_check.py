import os
import sys
import pathlib
import grpc
import pytest

# Add the stubs directory to sys.path so 'import health_pb2' works
STUBS_DIR = pathlib.Path(__file__).parent / "_stubs"
sys.path.insert(0, str(STUBS_DIR))

import health_pb2  # type: ignore
import health_pb2_grpc  # type: ignore

GRPC_TARGET = os.getenv("GRPC_TARGET", "localhost:4770")

@pytest.mark.grpc
def test_grpc_health_ok():
    with grpc.insecure_channel(GRPC_TARGET) as channel:
        stub = health_pb2_grpc.HealthServiceStub(channel)
        resp = stub.Check(health_pb2.HealthRequest())
        assert resp.status in ("SERVING", "OK", "UP")
