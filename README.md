# SentinelOps

AI-Powered Predictive Incident Intelligence Platform.

This is the starter MVP for the portfolio project. It contains:
- Next.js dashboard
- FastAPI backend
- simulated infrastructure telemetry
- health/risk cards
- server detail data
- incidents API foundation

## Project structure

sentinelops/
├── frontend/   # Next.js web dashboard
└── backend/    # FastAPI API + telemetry simulator

## 1. Backend

Open a terminal in `backend`:

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

API: http://127.0.0.1:8000
Docs: http://127.0.0.1:8000/docs

## 2. Frontend

Open another terminal in `frontend`:

```bash
npm install
npm run dev
```

Dashboard: http://localhost:3000

The frontend expects the backend at:
http://127.0.0.1:8000

## Next milestones

1. PostgreSQL persistence
2. Real telemetry generator
3. Isolation Forest anomaly detection
4. failure-risk model
5. root-cause analysis
6. AI explanations
7. authentication and roles
8. Docker + deployment
