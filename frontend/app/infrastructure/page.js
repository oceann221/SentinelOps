"use client";

import { useEffect, useState } from "react";

const API = "https://sentinelops-qql6.onrender.com";

function StatusBadge({ status, risk }) {
  let label = "HEALTHY";

  if (status === "critical") {
    label = "CRITICAL";
  } else if (status === "warning") {
    label = "AT RISK";
  }

  return (
    <span className={"infra-badge " + status}>
      {label} · {risk}%
    </span>
  );
}

export default function Infrastructure() {
  const [servers, setServers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API + "/api/servers")
      .then((response) => response.json())
      .then((data) => {
        setServers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Infrastructure API Error:", error);
        setLoading(false);
      });
  }, []);

  async function openServer(id) {
    try {
      const response = await fetch(API + "/api/servers/" + id);
      const data = await response.json();
      setSelected(data);
    } catch (error) {
      console.error("Server detail error:", error);
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

        <div className="infra-live">
          <span></span>
          LIVE TELEMETRY
        </div>
      </header>

      <div className="infra-nav">
        <a href="/">← Overview</a>
        <a href="/ai-analysis">AI Analysis</a>
        <a href="/incidents">Incidents</a>
      </div>

      {loading && (
        <div className="card">
          <p className="muted">Loading infrastructure data...</p>
        </div>
      )}

      {!loading && (
        <>
          <section className="infra-summary">

            <div className="card">
              <span className="infra-label">TOTAL SERVICES</span>
              <strong>{servers.length}</strong>
            </div>

            <div className="card">
              <span className="infra-label">HEALTHY</span>
              <strong>
                {servers.filter((s) => s.status === "healthy").length}
              </strong>
            </div>

            <div className="card">
              <span className="infra-label">AT RISK</span>
              <strong>
                {servers.filter((s) => s.status === "warning").length}
              </strong>
            </div>

            <div className="card">
              <span className="infra-label">CRITICAL</span>
              <strong>
                {servers.filter((s) => s.status === "critical").length}
              </strong>
            </div>

          </section>

          <section className="card infra-table-card">

            <div className="section-title">
              <div>
                <h2>Production Services</h2>
                <p>Click a service to inspect its telemetry and AI risk.</p>
              </div>
            </div>

            <div className="infra-table">

              <div className="infra-table-head">
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
                  className="infra-row"
                  key={server.id}
                  onClick={() => openServer(server.id)}
                >
                  <span>
                    <b>{server.name}</b>
                    <small>{server.id}</small>
                  </span>

                  <span>
                    <StatusBadge
                      status={server.status}
                      risk={server.risk}
                    />
                  </span>

                  <strong>{server.risk}%</strong>

                  <span>{server.cpu}%</span>

                  <span>{server.memory}%</span>

                  <span>{server.latency} ms</span>

                  <span>{server.error_rate}%</span>
                </button>
              ))}

            </div>

          </section>
        </>
      )}

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

            <p className="eyebrow">SERVICE ANALYSIS</p>

            <h2>{selected.name}</h2>

            <div className="risk-big">
              {selected.risk}%
            </div>

            <p className="muted">
              Predicted failure risk
            </p>

            <hr />

            <h3>Current Telemetry</h3>

            <p>
              CPU utilization: <b>{selected.cpu}%</b>
            </p>

            <p>
              Memory utilization: <b>{selected.memory}%</b>
            </p>

            <p>
              Network latency: <b>{selected.latency} ms</b>
            </p>

            <p>
              Error rate: <b>{selected.error_rate}%</b>
            </p>

            <h3>AI Recommendation</h3>

            <p>
              {selected.analysis?.recommendation ||
                "Investigate the highest contributing telemetry metrics and monitor this service closely."}
            </p>

            <div className="confidence">
              Model confidence:{" "}
              <b>{selected.analysis?.confidence ?? 90}%</b>
            </div>

          </div>
        </div>
      )}

    </main>
  );
}
