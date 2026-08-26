"use client";

import { useEffect, useState } from "react";

const API = "https://sentinelops-qql6.onrender.com";

function StatusBadge({ status, risk }) {
  const label =
    status === "critical"
      ? "CRITICAL"
      : status === "warning"
      ? "AT RISK"
      : "HEALTHY";

  return (
    <span className={`badge ${status}`}>
      {label} · {risk}%
    </span>
  );
}

export default function Infrastructure() {
  const [servers, setServers] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch(`${API}/api/servers`)
      .then((res) => res.json())
      .then((data) => setServers(data))
      .catch((err) => console.error(err));
  }, []);

  const healthy = servers.filter((s) => s.risk < 55).length;

  const atRisk = servers.filter(
    (s) => s.risk >= 55 && s.risk < 80
  ).length;

  const critical = servers.filter(
    (s) => s.risk >= 80
  ).length;

  async function openServer(id) {
    try {
      const res = await fetch(`${API}/api/servers/${id}`);
      const data = await res.json();
      setSelected(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="infra-page">

      <header className="infra-header">
        <div>
          <p className="eyebrow">SENTINELOPS INFRASTRUCTURE</p>

          <h1>Infrastructure</h1>

          <p className="muted">
            Real-time health and predictive risk across production services.
          </p>
        </div>

        <div className="live">
          <span></span> LIVE TELEMETRY
        </div>
      </header>

      {/* Navigation */}
      <nav className="infra-nav">
        <a href="/">← Overview</a>
        <a href="/ai-analysis">AI Analysis</a>
        <a href="/incidents">Incidents</a>
        <a href="/settings">Settings</a>
      </nav>

      {/* Summary */}
      <section className="infra-summary">

        <div className="card">
          <span className="stat-label">TOTAL SERVICES</span>
          <strong>{servers.length}</strong>
          <small>Production services</small>
        </div>

        <div className="card">
          <span className="stat-label">HEALTHY</span>
          <strong>{healthy}</strong>
          <small>Operating normally</small>
        </div>

        <div className="card">
          <span className="stat-label">AT RISK</span>
          <strong>{atRisk}</strong>
          <small>Requires attention</small>
        </div>

        <div className="card">
          <span className="stat-label">CRITICAL</span>
          <strong>{critical}</strong>
          <small>Immediate attention</small>
        </div>

      </section>

      {/* Services */}
      <section className="card infrastructure-card">

        <div className="section-title">
          <div>
            <h2>Production Services</h2>
            <p>
              Click a service to inspect its telemetry and AI risk.
            </p>
          </div>
        </div>

        <div className="service-table">

          <div className="service-head">
            <span>SERVICE</span>
            <span>STATUS</span>
            <span>RISK</span>
            <span>CPU</span>
            <span>MEMORY</span>
            <span>LATENCY</span>
            <span>ERROR RATE</span>
          </div>

          {servers.map((server) => (

            <button
              className="service-row"
              key={server.id}
              onClick={() => openServer(server.id)}
            >

              <div>
                <b>{server.name}</b>
                <small>{server.id}</small>
              </div>

              <div>
                <StatusBadge
                  status={server.status}
                  risk={server.risk}
                />
              </div>

              <strong className="service-risk">
                {server.risk}%
              </strong>

              <span>{server.cpu}%</span>

              <span>{server.memory}%</span>

              <span>{server.latency} ms</span>

              <span>{server.error_rate}%</span>

            </button>

          ))}

          {servers.length === 0 && (
            <div className="empty-services">
              Loading infrastructure services...
            </div>
          )}

        </div>

      </section>

      {/* Service Modal */}
      {selected && (

        <div
          className="modal-backdrop"
          onClick={() => setSelected(null)}
        >

          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="close"
              onClick={() => setSelected(null)}
            >
              ×
            </button>

            <p className="eyebrow">
              SERVICE TELEMETRY
            </p>

            <h2>{selected.name}</h2>

            <div className="risk-big">
              {selected.risk}%
            </div>

            <p className="muted">
              Predicted failure risk
            </p>

            <hr />

            <div className="detail-row">
              <span>Status</span>
              <strong>{selected.status}</strong>
            </div>

            <div className="detail-row">
              <span>CPU Utilization</span>
              <strong>{selected.cpu}%</strong>
            </div>

            <div className="detail-row">
              <span>Memory Utilization</span>
              <strong>{selected.memory}%</strong>
            </div>

            <div className="detail-row">
              <span>Network Latency</span>
              <strong>{selected.latency} ms</strong>
            </div>

            <div className="detail-row">
              <span>Error Rate</span>
              <strong>{selected.error_rate}%</strong>
            </div>

            {selected.analysis && (
              <>
                <h3>AI Analysis</h3>

                <p>
                  {selected.analysis.probable_cause}
                </p>

                <h3>Recommended Action</h3>

                <p>
                  {selected.analysis.recommendation}
                </p>

                <div className="confidence">
                  Model confidence:{" "}
                  <b>
                    {selected.analysis.confidence}%
                  </b>
                </div>
              </>
            )}

          </div>

        </div>

      )}

    </main>
  );
}