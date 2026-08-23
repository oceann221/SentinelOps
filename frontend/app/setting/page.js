```jsx
"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [telemetry, setTelemetry] = useState(true);
  const [alerts, setAlerts] = useState(true);
  const [aiPredictions, setAiPredictions] = useState(true);
  const [saved, setSaved] = useState(false);

  function saveSettings() {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  }

  return (
    <main className="settings-page">
      <header className="settings-header">
        <div>
          <p className="eyebrow">SENTINELOPS CONFIGURATION</p>
          <h1>Settings</h1>
          <p className="muted">
            Manage monitoring, alerts and predictive intelligence settings.
          </p>
        </div>

        <div className="live">
          <span></span> SYSTEM ONLINE
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
              <p>Configure infrastructure telemetry.</p>
            </div>
          </div>

          <div className="setting-row">
            <div>
              <b>Live Telemetry</b>
              <small>
                Continuously monitor production services and infrastructure.
              </small>
            </div>

            <button
              className={`toggle ${telemetry ? "on" : ""}`}
              onClick={() => setTelemetry(!telemetry)}
            >
              <span></span>
            </button>
          </div>

          <div className="setting-row">
            <div>
              <b>AI Predictions</b>
              <small>
                Use telemetry data to calculate predictive service risk.
              </small>
            </div>

            <button
              className={`toggle ${aiPredictions ? "on" : ""}`}
              onClick={() => setAiPredictions(!aiPredictions)}
            >
              <span></span>
            </button>
          </div>
        </div>

        <div className="card settings-card">
          <div className="section-title">
            <div>
              <h2>Notifications</h2>
              <p>Control operational alerts.</p>
            </div>
          </div>

          <div className="setting-row">
            <div>
              <b>Incident Alerts</b>
              <small>
                Receive alerts when critical infrastructure incidents occur.
              </small>
            </div>

            <button
              className={`toggle ${alerts ? "on" : ""}`}
              onClick={() => setAlerts(!alerts)}
            >
              <span></span>
            </button>
          </div>

          <div className="setting-row">
            <div>
              <b>Critical Risk Threshold</b>
              <small>
                Services above this risk level are marked as critical.
              </small>
            </div>

            <select defaultValue="80">
              <option value="70">70%</option>
              <option value="80">80%</option>
              <option value="90">90%</option>
            </select>
          </div>
        </div>
      </section>

      <section className="card settings-card profile-card">
        <div className="section-title">
          <div>
            <h2>Operations Profile</h2>
            <p>Current SentinelOps administrator configuration.</p>
          </div>
        </div>

        <div className="profile-grid">
          <div className="profile-item">
            <span>Account</span>
            <b>Admin</b>
          </div>

          <div className="profile-item">
            <span>Role</span>
            <b>Operations</b>
          </div>

          <div className="profile-item">
            <span>Monitoring</span>
            <b>{telemetry ? "Enabled" : "Disabled"}</b>
          </div>

          <div className="profile-item">
            <span>AI Engine</span>
            <b>{aiPredictions ? "Online" : "Disabled"}</b>
          </div>
        </div>

        <div className="settings-actions">
          <button className="save-button" onClick={saveSettings}>
            Save Settings
          </button>

          {saved && <span className="saved-message">✓ Settings saved</span>}
        </div>
      </section>
    </main>
  );
}
```

**Isi file ke neeche `globals.css` mein ye CSS bhi add karna hai:**

```css
.settings-page {
  min-height: 100vh;
  padding: 38px 42px;
  max-width: 1500px;
  margin: 0 auto;
}

.settings-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 25px;
}

.settings-header h1 {
  font-size: 30px;
  margin: 0 0 7px;
}

.settings-nav {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
}

.settings-nav a {
  color: #8191a8;
  font-size: 12px;
  text-decoration: none;
}

.settings-nav a:hover {
  color: #ffffff;
}

.settings-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-bottom: 14px;
}

.settings-card {
  min-height: 200px;
}

.setting-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 17px 0;
  border-top: 1px solid #172131;
}

.setting-row b {
  display: block;
  font-size: 12px;
}

.setting-row small {
  display: block;
  color: #718096;
  font-size: 10px;
  line-height: 1.5;
  margin-top: 5px;
  max-width: 420px;
}

.toggle {
  width: 42px;
  height: 23px;
  flex-shrink: 0;
  border: 1px solid #2a374b;
  border-radius: 20px;
  background: #141d2a;
  padding: 2px;
  cursor: pointer;
  transition: 0.2s;
}

.toggle span {
  display: block;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  background: #718096;
  transition: 0.2s;
}

.toggle.on {
  background: #183a2a;
  border-color: #326b4b;
}

.toggle.on span {
  background: #4ade80;
  transform: translateX(17px);
}

.setting-row select {
  background: #101824;
  border: 1px solid #263548;
  color: #dce5f1;
  border-radius: 7px;
  padding: 8px 12px;
  outline: none;
}

.profile-card {
  min-height: auto;
}

.profile-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-top: 10px;
}

.profile-item {
  background: #101824;
  border: 1px solid #1d2939;
  border-radius: 9px;
  padding: 15px;
}

.profile-item span {
  display: block;
  color: #718096;
  font-size: 10px;
  margin-bottom: 7px;
}

.profile-item b {
  font-size: 12px;
}

.settings-actions {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 22px;
  padding-top: 18px;
  border-top: 1px solid #172131;
}

.save-button {
  background: #e9eef7;
  color: #0a0f18;
  border: 0;
  border-radius: 7px;
  padding: 10px 17px;
  font-size: 11px;
  font-weight: 800;
  cursor: pointer;
}

.save-button:hover {
  background: #ffffff;
}

.saved-message {
  color: #4ade80;
  font-size: 11px;
}

@media (max-width: 900px) {
  .settings-page {
    padding: 25px;
  }

  .settings-grid {
    grid-template-columns: 1fr;
  }

  .profile-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .settings-page {
    padding: 20px 15px;
  }

  .settings-header {
    display: block;
  }

  .settings-header .live {
    display: inline-block;
    margin-top: 15px;
  }

  .settings-nav {
    flex-wrap: wrap;
  }

  .profile-grid {
    grid-template-columns: 1fr;
  }
}
```
