"use client";

import { useEffect, useState } from "react";

const API = "https://sentinelops-qql6.onrender.com";

function SeverityBadge({ severity }) {
  const value = severity?.toLowerCase();

  return (
    <span className={`incident-badge ${value}`}>
      {severity}
    </span>
  );
}

function StatusBadge({ status }) {
  const value = status?.toLowerCase();

  return (
    <span className={`status-badge ${value}`}>
      {status}
    </span>
  );
}

export default function IncidentsPage() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch(`${API}/api/incidents`)
      .then((res) => res.json())
      .then((data) => {
        setIncidents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const active = incidents.filter(
    (incident) => incident.status?.toLowerCase() === "open"
  ).length;

  const critical = incidents.filter(
    (incident) => incident.severity?.toLowerCase() === "critical"
  ).length;

  return (
    <main className="incidents-page">

      <header className="incidents-header">
        <div>
          <p className="eyebrow">SENTINELOPS OPERATIONS</p>

          <h1>Incidents</h1>

          <p className="muted">
            Predictive and detected infrastructure events.
          </p>
        </div>

        <div className="live">
          <span></span>
          LIVE TELEMETRY
        </div>
      </header>

      <nav className="incident-nav">
        <a href="/">← Overview</a>
        <a href="/infrastructure">Infrastructure</a>
        <a href="/ai-analysis">AI Analysis</a>
      </nav>

      <section className="incident-stats">

        <div className="card incident-stat">
          <span>TOTAL INCIDENTS</span>
          <strong>{incidents.length}</strong>
          <small>All detected events</small>
        </div>

        <div className="card incident-stat">
          <span>ACTIVE</span>
          <strong>{active}</strong>
          <small>Requires attention</small>
        </div>

        <div className="card incident-stat">
          <span>CRITICAL</span>
          <strong>{critical}</strong>
          <small>High priority events</small>
        </div>

        <div className="card incident-stat">
          <span>MONITORING</span>
          <strong>24/7</strong>
          <small>Continuous telemetry</small>
        </div>

      </section>

      <section className="card incidents-card">

        <div className="section-title">
          <div>
            <h2>Recent Incidents</h2>

            <p>
              Latest infrastructure events and predicted risks.
            </p>
          </div>
        </div>

        {loading ? (
          <p className="muted">Loading incidents...</p>
        ) : incidents.length === 0 ? (
          <div className="empty-incidents">
            <h3>No incidents detected</h3>
            <p>All monitored services are operating normally.</p>
          </div>
        ) : (
          <div className="incident-table">

            <div className="incident-table-head">
              <span>INCIDENT</span>
              <span>SERVICE</span>
              <span>SEVERITY</span>
              <span>STATUS</span>
              <span>RISK</span>
            </div>

            {incidents.map((incident) => (
              <button
                className="incident-table-row"
                key={incident.id}
                onClick={() => setSelected(incident)}
              >

                <div>
                  <strong>{incident.id}</strong>

                  <small>
                    {incident.cause}
                  </small>
                </div>

                <div>
                  <strong>{incident.service}</strong>
                </div>

                <div>
                  <SeverityBadge
                    severity={incident.severity}
                  />
                </div>

                <div>
                  <StatusBadge
                    status={incident.status}
                  />
                </div>

                <div className="incident-risk">
                  {incident.risk}%
                </div>

              </button>
            ))}

          </div>
        )}

      </section>

      {selected && (
        <div
          className="modal-backdrop"
          onClick={() => setSelected(null)}
        >
          <div
            className="modal incident-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="close"
              onClick={() => setSelected(null)}
            >
              ×
            </button>

            <p className="eyebrow">
              INCIDENT DETAILS
            </p>

            <h2>{selected.id}</h2>

            <p className="muted">
              {selected.service}
            </p>

            <div className="incident-modal-risk">
              {selected.risk}%
            </div>

            <p className="muted">
              Predicted incident risk
            </p>

            <hr />

            <div className="detail-row">
              <span>Cause</span>
              <strong>{selected.cause}</strong>
            </div>

            <div className="detail-row">
              <span>Severity</span>
              <SeverityBadge severity={selected.severity} />
            </div>

            <div className="detail-row">
              <span>Status</span>
              <StatusBadge status={selected.status} />
            </div>

            <div className="detail-row">
              <span>Risk</span>
              <strong>{selected.risk}%</strong>
            </div>

          </div>
        </div>
      )}

    </main>
  );
}
