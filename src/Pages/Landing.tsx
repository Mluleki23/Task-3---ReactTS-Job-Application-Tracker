import { Link } from "react-router-dom";
import { CheckCircle2, LineChart, Shield } from "lucide-react";
import reactLogo from "../assets/react.svg";

export default function Landing() {
  return (
    <main className="neon-hero-wrap">
      <section className="neon-hero">
        <div>
          {/* Title */}
          <h1 className="neon-title">
            Welcome to <span className="neon-title-accent">JobTracker</span>
          </h1>

          {/* Description */}
          <p className="neon-sub">
            Simplify your job search journey. Track your applications, manage interviews,
            and stay on top of every opportunity — all in one place.
          </p>

          {/* Buttons */}
          <div className="neon-cta-row" style={{ marginBottom: 16 }}>
            <Link to="/register">
              <button className="neon-cta">Get Started</button>
            </Link>
            <Link to="/login">
              <button className="neon-cta-secondary">Login</button>
            </Link>
          </div>

          <div className="stats">
            <div className="stat-card">
              <div className="stat-number">1k+</div>
              <div className="stat-label">Applications Tracked</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">4.8★</div>
              <div className="stat-label">User Satisfaction</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Access Anywhere</div>
            </div>
          </div>
        </div>

        <div className="showcase-card neon-glow">
          <div className="showcase-inner">
            <img src={reactLogo} alt="App Illustration" style={{ width: "100%" }} />
          </div>
        </div>
      </section>

      <section style={{ width: "100%", marginTop: 24 }}>
        <div className="flex flex-row gap-4" style={{ flexWrap: "wrap", justifyContent: "center" }}>
          <div className="card" style={{ flex: "1 1 260px", maxWidth: 360, textAlign: "left" }}>
            <div className="flex gap-2" style={{ alignItems: "center", marginBottom: 8 }}>
              <CheckCircle2 color="#22c55e" />
              <h3 className="font-bold" style={{ margin: 0 }}>Track Applications</h3>
            </div>
            <p className="text-gray-500" style={{ margin: 0 }}>
              Keep all roles, companies, and statuses neatly organized.
            </p>
          </div>
          <div className="card" style={{ flex: "1 1 260px", maxWidth: 360, textAlign: "left" }}>
            <div className="flex gap-2" style={{ alignItems: "center", marginBottom: 8 }}>
              <LineChart color="#2563eb" />
              <h3 className="font-bold" style={{ margin: 0 }}>Insights</h3>
            </div>
            <p className="text-gray-500" style={{ margin: 0 }}>
              Filter, sort, and analyze your progress over time.
            </p>
          </div>
          <div className="card" style={{ flex: "1 1 260px", maxWidth: 360, textAlign: "left" }}>
            <div className="flex gap-2" style={{ alignItems: "center", marginBottom: 8 }}>
              <Shield color="#1e40af" />
              <h3 className="font-bold" style={{ margin: 0 }}>Secure</h3>
            </div>
            <p className="text-gray-500" style={{ margin: 0 }}>
              Your data stays private with protected routes and auth.
            </p>
          </div>
        </div>
      </section>

      {/* Decorative footer text */}
    </main>
  );
}
