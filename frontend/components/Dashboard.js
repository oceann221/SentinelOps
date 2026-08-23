"use client";

import { useEffect, useState } from "react";

const API = "http://127.0.0.1:8000";

function RiskBadge({ status, risk }) {
  return (
    <span className={`badge ${status}`}>
      {status === "critical"
        ? "CRITICAL"
        : status === "warning"
        ? "AT RISK"
        : "HEALTHY"}{" "}
      · {risk}%
    </span>
  );
}

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [servers, setServers] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch(`${API}/api/summary`).then((r) => r.json()),
      fetch(`${API}/api/servers`).then((r) => r.json()),
      fetch(`${API}/api/incidents`).then((r) => r.json()),
    ])
      .then(([summaryData, serversData, incidentsData]) => {
        setSummary(summaryData);
        setServers(serversData);
        setIncidents(incidentsData);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, []);

  async function openServer(id) {
    try {
      const response = await fetch(`${API}/api/servers/${id}`);
      const data = await response.json();
      setSelected(data);
    } catch (error) {
      console.error("Server details error:", error);
    }
  }

  return (
    <main className="shell">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="brand">
          <div className="logo">S</div>

          <div>
            <b>SentinelOps</b>
            <small>Predictive Intelligence</small>
          </div>
        </div>

        <nav>
          <a href="/" className="active">
            Overview
          </a>

          <a href="/infrastructure">
            Infrastructure
          </a>

          <a href="/incidents">
            Incidents
          </a>

          <a href="/ai-analysis">
            AI Analysis
          </a>

          <a href="/settings">
            Settings
          </a>
        </nav>

        <div className="user">
          <div className="avatar">A</div>

          <div>
            <b>Admin</b>
            <small>Operations</small>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <section className="content">
        <header>
          <div>
            <p className="eyebrow">OPERATIONS CENTER</p>

            <h1>Infrastructure Overview</h1>

            <p className="muted">
              Real-time health and predictive risk monitoring
            </p>
          </div>

          <div className="live">
            <span></span>
            LIVE TELEMETRY
          </div>
        </header>

        {/* STAT CARDS */}
        <section className="stats">
          <div className="card stat">
            <span>System Health</span>

            <strong>
              {summary?.health ?? "—"}%
            </strong>

            <em>↑ 2.4% vs yesterday</em>
          </div>

          <div className="card stat">
            <span>Active Incidents</span>

            <strong>
              {summary?.active_incidents ?? "—"}
            </strong>

            <em>Requires attention</em>
          </div>

          <div className="card stat">
            <span>Services At Risk</span>

            <strong>
              {summary?.at_risk ?? "—"}
            </strong>

            <em>Predictive signals</em>
          </div>

          <div className="card stat">
            <span>Monitored Services</span>

            <strong>
              {summary?.servers ?? "—"}
            </strong>

            <em>Across production</em>
          </div>
        </section>

        {/* INFRASTRUCTURE + CRITICAL SIGNALS */}
        <section className="grid">
          <div className="card large">
            <div className="section-title">
              <div>
                <h2>Infrastructure Health</h2>

                <p className="muted">
                  Current service risk distribution
                </p>
              </div>

              <button>
                Last 24h ▾
              </button>
            </div>

            <div className="bars">
              {servers.map((server) => (
                <div
                  className="bar-row"
                  key={server.id}
                >
                  <span>{server.name}</span>

                  <div className="bar">
                    <i
                      style={{
                        width: `${100 - server.risk}%`,
                      }}
                    ></i>
                  </div>

                  <b>
                    {100 - server.risk}%
                  </b>
                </div>
              ))}
            </div>
          </div>

          {/* CRITICAL SIGNALS */}
          <div className="card">
            <div className="section-title">
              <div>
                <h2>Critical Signals</h2>

                <p className="muted">
                  Highest predicted risks
                </p>
              </div>
            </div>

            {servers
              .filter((server) => server.risk >= 55)
              .sort((a, b) => b.risk - a.risk)
              .map((server) => (
                <button
                  className="risk-row"
                  key={server.id}
                  onClick={() => openServer(server.id)}
                >
                  <div>
                    <b>{server.name}</b>

                    <small>
                      Latency {server.latency}ms · Errors{" "}
                      {server.error_rate}%
                    </small>
                  </div>

                  <RiskBadge
                    status={server.status}
                    risk={server.risk}
                  />
                </button>
              ))}
          </div>
        </section>

        {/* RECENT INCIDENTS */}
        <section className="card">
          <div className="section-title">
            <div>
              <h2>Recent Incidents</h2>

              <p className="muted">
                Predictive and detected events
              </p>
            </div>

            <a href="/incidents">
              <button>View all →</button>
            </a>
          </div>

          <div className="incident-list">
            {incidents.map((incident) => (
              <div
                className="incident"
                key={incident.id}
              >
                <span
                  className={`dot ${incident.severity.toLowerCase()}`}
                ></span>

                <div>
                  <b>
                    {incident.id} · {incident.service}
                  </b>

                  <small>
                    {incident.cause} · {incident.status}
                  </small>
                </div>

                <strong>
                  {incident.risk}% risk
                </strong>
              </div>
            ))}
          </div>
        </section>
      </section>

      {/* SERVER DETAILS MODAL */}
      {selected && (
        <div
          className="modal-backdrop"
          onClick={() => setSelected(null)}
        >
          <div
            className="modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="close"
              onClick={() => setSelected(null)}
            >
              ×
            </button>

            <p className="eyebrow">
              AI RISK ANALYSIS
            </p>

            <h2>{selected.name}</h2>

            <div className="risk-big">
              {selected.risk}%
            </div>

            <p className="muted">
              Failure risk score
            </p>

            <hr />

            <h3>
              Probable root cause
            </h3>

            <p>
              {selected.analysis?.probable_cause ||
                "No analysis available."}
            </p>

            <h3>
              Recommended action
            </h3>

            <p>
              {selected.analysis?.recommendation ||
                "No recommendation available."}
            </p>

            <div className="confidence">
              Model confidence:{" "}
              <b>
                {selected.analysis?.confidence ?? "—"}%
              </b>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}