from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .telemetry import get_servers, get_summary, get_server, get_incidents

app = FastAPI(
    title="SentinelOps API",
    version="0.1.0",
    description="Predictive infrastructure intelligence API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"name": "SentinelOps API", "status": "online"}

@app.get("/api/summary")
def summary():
    return get_summary()

@app.get("/api/servers")
def servers():
    return get_servers()

@app.get("/api/servers/{server_id}")
def server(server_id: str):
    return get_server(server_id)

@app.get("/api/incidents")
def incidents():
    return get_incidents()
