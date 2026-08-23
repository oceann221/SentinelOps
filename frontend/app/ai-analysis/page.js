"use client";

import { useEffect, useState } from "react";

const API = "http://127.0.0.1:8000";

export default function AIAnalysis() {
  const [servers, setServers] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch(`${API}/api/servers`)
      .then((res) => res.json())
      .then((data) => setServers(data))
      .catch((err) => console.error(err));
  }, []);

  const highRisk = servers
    .filter((server) => server.risk >= 55)
    .sort((a, b) => b.risk - a.risk);

  return (
    <main className="ai-page">
      <header className="ai-header">
        <div>
          <p className="eyebrow">SENTINELOPS AI</p>
          <h1>AI Risk Analysis</h1>
          <p className="muted">
            Predictive analysis of your infrastructure and potential failures.
          </p>
        </div>

        <div className="ai-status">
          <span></span> AI MODEL ONLINE
        </div>
      </header>

      <section className="ai-grid">
        <div className="card ai-summary">
          <p className="eyebrow">PREDICTIVE INTELLIGENCE</p>
          <h2>Infrastructure Risk</h2>

          <div className="risk-score">
            {highRisk.length > 0 ? highRisk[0].risk : 0}%
          </div>

          <p className="muted">
            Highest predicted failure risk across monitored services.
          </p>

          <div className="ai-stat">
            <span>Services requiring attention</span>
            <b>{highRisk.length}</b>
          </div>
        </div>

        <div className="card">
          <div className="section-title">
            <div>
              <h2>AI Predictions</h2>
              <p>Services with elevated failure probability</p>
            </div>
          </div>

          <div className="prediction-list">
            {highRisk.map((server) => (
              <button
                className="prediction"
                key={server.id}
                onClick={() => setSelected(server)}
              >
                <div>
                  <b>{server.name}</b>
                  <small>
                    CPU {server.cpu}% · Memory {server.memory}% · Latency{" "}
                    {server.latency}ms
                  </small>
                </div>

                <strong>{server.risk}%</strong>
              </button>
            ))}

            {highRisk.length === 0 && (
              <p className="muted">No elevated risks detected.</p>
            )}
          </div>
        </div>
      </section>

      <section className="card">
        <div className="section-title">
          <div>
            <h2>AI Recommendations</h2>
            <p>Recommended actions based on current telemetry</p>
          </div>
        </div>

        {highRisk.slice(0, 3).map((server) => (
          <div className="recommendation" key={server.id}>
            <div className="recommendation-icon">AI</div>

            <div>
              <b>{server.name}</b>
              <p>
                Investigate elevated latency and resource utilization.
                Monitor this service closely before the risk increases.
              </p>
            </div>
          </div>
        ))}
      </section>

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setSelected(null)}>
              ×
            </button>

            <p className="eyebrow">AI RISK ANALYSIS</p>
            <h2>{selected.name}</h2>

            <div className="risk-big">{selected.risk}%</div>
            <p className="muted">Predicted failure risk</p>

            <hr />

            <h3>Telemetry Analysis</h3>

            <p>
              CPU utilization: <b>{selected.cpu}%</b>
            </p>

            <p>
              Memory utilization: <b>{selected.memory}%</b>
            </p>

            <p>
              Network latency: <b>{selected.latency}ms</b>
            </p>

            <p>
              Error rate: <b>{selected.error_rate}%</b>
            </p>

            <h3>Recommended Action</h3>

            <p>
              Investigate the service telemetry and address the highest
              contributing metric before the predicted risk increases.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}