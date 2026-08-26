"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [telemetry, setTelemetry] = useState(true);
  const [alerts, setAlerts] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  return (
    <main className="settings-page">
      <header className="settings-header">
        <div>
          <p className="eyebrow">SENTINELOPS OPERATIONS</p>

          <h1>Settings</h1>

          <p className="muted">
            Configure monitoring, telemetry and alert preferences.
          </p>
        </div>

        <div className="live">
          <span></span>
          LIVE TELEMETRY
        </div>
      </header>

      <nav className="settings-nav">
        <a href="/">← Overview</a>
        <a href="/infrastructure">Infrastructure</a>
        <a href="/incidents">Incidents</a>
        <a href="/ai-analysis">AI Analysis</a>
      </nav>

      <section className="settings-grid">
        <div className="card settings-card">
          <div className="section-title">
            <div>
              <h2>Monitoring</h2>
              <p>Control infrastructure monitoring behaviour.</p>
            </div>
          </div>

          <div className="setting-row">
            <div>
              <b>Live Telemetry</b>
              <small>
                Continuously monitor production service health and metrics.
              </small>
            </div>

            <button
              type="button"
              className={`toggle ${telemetry ? "on" : ""}`}
              onClick={() => setTelemetry(!telemetry)}
              aria-label="Toggle live telemetry"
            >
              <span></span>
            </button>
          </div>

          <div className="setting-row">
            <div>
              <b>Automatic Refresh</b>
              <small>
                Automatically refresh dashboard information.
              </small>
            </div>

            <button
              type="button"
              className={`toggle ${autoRefresh ? "on" : ""}`}
              onClick={() => setAutoRefresh(!autoRefresh)}
              aria-label="Toggle automatic refresh"
            >
              <span></span>
            </button>
          </div>
        </div>

        <div className="card settings-card">
          <div className="section-title">
            <div>
              <h2>Alerts</h2>
              <p>Manage predictive risk notifications.</p>
            </div>
          </div>

          <div className="setting-row">
            <div>
              <b>Risk Alerts</b>
              <small>
                Receive alerts when a service reaches elevated risk.
              </small>
            </div>

            <button
              type="button"
              className={`toggle ${alerts ? "on" : ""}`}
              onClick={() => setAlerts(!alerts)}
              aria-label="Toggle risk alerts"
            >
              <span></span>
            </button>
          </div>
        </div>
      </section>

      <section className="card system-card">
        <p className="eyebrow">SYSTEM STATUS</p>

        <h2>SentinelOps Configuration</h2>

        <div className="system-info">
          <div>
            <span>Telemetry</span>
            <b>{telemetry ? "Enabled" : "Disabled"}</b>
          </div>

          <div>
            <span>Risk Alerts</span>
            <b>{alerts ? "Enabled" : "Disabled"}</b>
          </div>

          <div>
            <span>Auto Refresh</span>
            <b>{autoRefresh ? "Enabled" : "Disabled"}</b>
          </div>
        </div>
      </section>
    </main>
  );
}