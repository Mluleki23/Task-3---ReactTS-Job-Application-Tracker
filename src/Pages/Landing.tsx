import { Link } from "react-router-dom";
import { CheckCircle2, LineChart, Shield } from "lucide-react";

export default function Landing() {
  return (
    <main
      className="text-center"
      style={{
        minHeight: "calc(100vh - 96px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem 1rem",
      }}
    >
      <section style={{ maxWidth: 980, width: "100%" }}>
        {/* Title */}
        <h1
          className="font-bold mb-4"
          style={{
            fontSize: "3rem",
            lineHeight: 1.1,
            color: "#1a365d",
            marginBottom: "0.75rem",
          }}
        >
          Welcome to <span style={{ color: "#22c55e" }}>JobTracker</span>
        </h1>

        {/* Description */}
        <p
          className="text-gray-500"
          style={{ fontSize: "1.125rem", margin: "0 auto 1.5rem", maxWidth: 720 }}
        >
          Simplify your job search journey. Track your applications, manage interviews,
          and stay on top of every opportunity — all in one place.
          <br />
          <span className="font-bold">Built with React & TypeScript.</span>
        </p>

        {/* Buttons */}
        <div className="flex gap-4" style={{ justifyContent: "center", marginBottom: 28 }}>
          <Link to="/register">
            <button className="btn-green" style={{ fontWeight: 600, fontSize: "1.05rem" }}>
              Get Started
            </button>
          </Link>
          <Link to="/login">
            <button className="btn" style={{ fontWeight: 600, fontSize: "1.05rem" }}>
              Login
            </button>
          </Link>
        </div>

        <div className="flex flex-row gap-4" style={{ flexWrap: "wrap", justifyContent: "center" }}>
          <div className="card" style={{ flex: "1 1 240px", maxWidth: 300, textAlign: "left" }}>
            <div className="flex gap-2" style={{ alignItems: "center", marginBottom: 8 }}>
              <CheckCircle2 color="#22c55e" />
              <h3 className="font-bold" style={{ margin: 0 }}>Track Applications</h3>
            </div>
            <p className="text-gray-500" style={{ margin: 0 }}>
              Keep all roles, companies, and statuses neatly organized.
            </p>
          </div>
          <div className="card" style={{ flex: "1 1 240px", maxWidth: 300, textAlign: "left" }}>
            <div className="flex gap-2" style={{ alignItems: "center", marginBottom: 8 }}>
              <LineChart color="#2563eb" />
              <h3 className="font-bold" style={{ margin: 0 }}>Insights</h3>
            </div>
            <p className="text-gray-500" style={{ margin: 0 }}>
              Filter, sort, and analyze your progress over time.
            </p>
          </div>
          <div className="card" style={{ flex: "1 1 240px", maxWidth: 300, textAlign: "left" }}>
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
