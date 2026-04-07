import React, { useState } from "react";
import "./SetupPage.css";

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password");
      return;
    }

    // ✅ Hardcoded credentials (for demo)
    const users = [
      { username: "indhu", password: "1234" },
      { username: "admin", password: "admin123" }
    ];

    const validUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!validUser) {
      setError("Invalid username or password");
      return;
    }

    const userData = { username: validUser.username };

    if (remember) {
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      sessionStorage.setItem("user", JSON.stringify(userData));
    }

    setError("");
    onLogin(userData);
  };

  return (
    <div className="setup-page">
      <div className="setup-header">
        <div className="setup-logo">
          <span className="logo-mark">◈</span>
          <span className="logo-text">InterviewAI</span>
        </div>
        <p className="setup-tagline">Login to continue your interview prep</p>
      </div>

      <div className="setup-content" style={{ maxWidth: "400px", margin: "auto" }}>
        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          className="config-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="config-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Remember Me */}
        <label style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
          <input
            type="checkbox"
            checked={remember}
            onChange={() => setRemember(!remember)}
          />
          Remember Me
        </label>

        {/* Error */}
        {error && (
          <div style={{ color: "red", marginTop: "10px" }}>
            {error}
          </div>
        )}

        {/* Login Button */}
        <button
          className="start-btn ready"
          style={{ marginTop: "15px" }}
          onClick={handleLogin}
        >
          Login →
        </button>
      </div>
    </div>
  );
}