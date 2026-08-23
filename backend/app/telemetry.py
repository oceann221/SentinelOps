import random
from datetime import datetime, timezone

SERVICES = [
    ("payment-api-01", "Payment API"),
    ("auth-service-01", "Auth Service"),
    ("user-api-01", "User API"),
    ("database-01", "Primary Database"),
    ("notification-01", "Notification Service"),
    ("analytics-01", "Analytics Service"),
    ("gateway-01", "API Gateway"),
    ("search-01", "Search Service"),
]

def make_server(server_id, name, forced_risk=None):
    risk = forced_risk if forced_risk is not None else random.randint(8, 72)
    cpu = min(99, round(25 + risk * 0.62 + random.uniform(-5, 5), 1))
    memory = min(99, round(35 + risk * 0.48 + random.uniform(-5, 5), 1))
    latency = max(25, round(45 + risk * 4.2 + random.uniform(-15, 15)))
    errors = max(0.1, round(0.2 + risk * 0.065 + random.uniform(-0.2, 0.4), 2))
    status = "critical" if risk >= 80 else "warning" if risk >= 55 else "healthy"

    return {
        "id": server_id,
        "name": name,
        "status": status,
        "risk": risk,
        "cpu": cpu,
        "memory": memory,
        "latency": latency,
        "error_rate": errors,
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }

def get_servers():
    return [
        make_server(server_id, name, 87 if server_id == "payment-api-01" else None)
        for server_id, name in SERVICES
    ]

def get_summary():
    servers = get_servers()
    critical = sum(s["status"] == "critical" for s in servers)
    warning = sum(s["status"] == "warning" for s in servers)
    health = round(sum(100 - s["risk"] for s in servers) / len(servers), 1)
    return {
        "health": health,
        "active_incidents": critical,
        "at_risk": critical + warning,
        "servers": len(servers),
    }

def get_server(server_id):
    for sid, name in SERVICES:
        if sid == server_id:
            forced = 87 if sid == "payment-api-01" else None
            server = make_server(sid, name, forced)
            server["analysis"] = {
                "probable_cause": (
                    "Database latency is the strongest contributor to the current risk."
                    if server["risk"] >= 70 else
                    "No dominant failure signal detected."
                ),
                "confidence": 91 if server["risk"] >= 70 else 68,
                "recommendation": (
                    "Investigate database connection-pool utilization and slow queries."
                    if server["risk"] >= 70 else
                    "Continue monitoring telemetry trends."
                ),
            }
            return server
    return {"error": "Server not found"}

def get_incidents():
    return [
        {
            "id": "INC-1021",
            "service": "Payment API",
            "severity": "CRITICAL",
            "risk": 91,
            "status": "Open",
            "cause": "Database latency",
        },
        {
            "id": "INC-1020",
            "service": "Auth Service",
            "severity": "MEDIUM",
            "risk": 54,
            "status": "Resolved",
            "cause": "Latency spike",
        },
    ]
