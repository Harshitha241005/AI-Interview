import React, { useState } from "react";
import { COMPANIES, INTERVIEW_TYPES, DIFFICULTY_LEVELS } from "../utils/interviewData";
import "./SetupPage.css";

export default function SetupPage({ onStartInterview, isLoading, onLogout, user }) {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(DIFFICULTY_LEVELS[1]);
  const [candidateName, setCandidateName] = useState("");
  const [ollamaHost, setOllamaHost] = useState(
    localStorage.getItem("ollama_host") || "http://localhost:11434"
  );
  const [showHost, setShowHost] = useState(false);

  const handleHostChange = (val) => {
    setOllamaHost(val);
    if (val.trim()) localStorage.setItem("ollama_host", val.trim());
  };

  const canProceed = selectedCompany && selectedType && ollamaHost.trim();

  const handleStart = () => {
    if (!canProceed) return;
    onStartInterview({
      company: selectedCompany,
      interviewType: selectedType,
      difficulty: selectedDifficulty,
      candidateName: candidateName.trim(),
      ollamaHost: ollamaHost.trim()
    });
  };

  return (
    <div className="setup-page">
      {/* HEADER */}
      <div className="setup-header" style={{ position: "relative" }}>
        <div className="setup-logo">
          <span className="logo-mark">◈</span>
          <span className="logo-text">InterviewAI</span>
        </div>

        {/* 👤 User Profile */}
        {user && (
          <div
            style={{
              position: "absolute",
              right: "100px",
              top: "20px",
              fontWeight: "bold"
            }}
          >
            👤 {user.username}
          </div>
        )}

        {/* 🚪 Logout */}
        {onLogout && (
          <button
            onClick={onLogout}
            style={{
              position: "absolute",
              right: "20px",
              top: "20px",
              padding: "6px 12px",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        )}

        <p className="setup-tagline">
          Real interviews. Real pressure. Real preparation.
        </p>
      </div>

      <div className="setup-content">
        {/* Step 1 */}
        <section className="setup-section">
          <div className="section-label">
            <span className="section-num">01</span>
            <span>Choose Your Target Company</span>
          </div>

          <div className="company-grid">
            {COMPANIES.map((company) => (
              <button
                key={company.id}
                className={`company-card ${
                  selectedCompany?.id === company.id ? "selected" : ""
                }`}
                onClick={() => setSelectedCompany(company)}
                style={{ "--company-color": company.color }}
              >
                <div className="company-logo" style={{ color: company.color }}>
                  {company.logo}
                </div>

                <div className="company-info">
                  <div className="company-name">{company.name}</div>
                  <div className="company-desc">{company.description}</div>
                </div>

                <div
                  className="company-difficulty"
                  style={{
                    color:
                      company.difficulty === "Very Hard"
                        ? "#f87171"
                        : company.difficulty === "Hard"
                        ? "#fbbf24"
                        : "#4ade80"
                  }}
                >
                  {company.difficulty}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Step 2 */}
        <section className="setup-section">
          <div className="section-label">
            <span className="section-num">02</span>
            <span>Select Interview Type</span>
          </div>

          <div className="type-grid">
            {INTERVIEW_TYPES.map((type) => (
              <button
                key={type.id}
                className={`type-card ${
                  selectedType?.id === type.id ? "selected" : ""
                }`}
                onClick={() => setSelectedType(type)}
              >
                <span className="type-icon">{type.icon}</span>

                <div className="type-info">
                  <div className="type-name">{type.name}</div>
                  <div className="type-desc">{type.description}</div>

                  <div className="type-tags">
                    {type.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="type-duration">{type.duration}</div>
              </button>
            ))}
          </div>
        </section>

        {/* Step 3 */}
        <section className="setup-section">
          <div className="section-label">
            <span className="section-num">03</span>
            <span>Configure Your Session</span>
          </div>

          <div className="config-grid">
            {/* Difficulty */}
            <div className="config-block">
              <label className="config-label">Difficulty Level</label>

              <div className="difficulty-row">
                {DIFFICULTY_LEVELS.map((diff) => (
                  <button
                    key={diff.id}
                    className={`diff-btn ${
                      selectedDifficulty?.id === diff.id ? "selected" : ""
                    }`}
                    onClick={() => setSelectedDifficulty(diff)}
                    style={{ "--diff-color": diff.color }}
                  >
                    <span
                      className="diff-name"
                      style={{
                        color:
                          selectedDifficulty?.id === diff.id
                            ? diff.color
                            : "inherit"
                      }}
                    >
                      {diff.name}
                    </span>

                    <span className="diff-desc">{diff.description}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div className="config-block">
              <label className="config-label">
                Your Name <span className="optional">(optional)</span>
              </label>

              <input
                type="text"
                className="config-input"
                placeholder="So the interviewer can address you..."
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
              />
            </div>

            {/* Ollama Host */}
            <div className="config-block">
              <label className="config-label">
                Ollama Local Host <span className="required">*required</span>
              </label>

              <div className="api-key-row">
                <input
                  type={showHost ? "text" : "password"}
                  className="config-input"
                  placeholder="http://localhost:11434"
                  value={ollamaHost}
                  onChange={(e) => handleHostChange(e.target.value)}
                />

                <button
                  className="toggle-btn"
                  onClick={() => setShowHost(!showHost)}
                >
                  {showHost ? "Hide" : "Show"}
                </button>
              </div>

              <p className="api-note">
                Your local Ollama host connection. Make sure the Ollama server is running.
              </p>
            </div>
          </div>
        </section>

        {/* Summary */}
        {selectedCompany && selectedType && (
          <div className="setup-summary">
            <div className="summary-pills">
              <span
                className="pill"
                style={{
                  borderColor: selectedCompany.color,
                  color: selectedCompany.color
                }}
              >
                {selectedCompany.name}
              </span>

              <span className="pill-divider">×</span>
              <span className="pill">{selectedType.name}</span>

              <span className="pill-divider">×</span>
              <span
                className="pill"
                style={{
                  borderColor: selectedDifficulty.color,
                  color: selectedDifficulty.color
                }}
              >
                {selectedDifficulty.name}
              </span>
            </div>

            {selectedCompany.traits && (
              <div className="company-traits">
                {selectedCompany.traits.map((t) => (
                  <span key={t} className="trait-chip">
                    ✦ {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Start Button */}
        <button
          className={`start-btn ${
            canProceed && !isLoading ? "ready" : "disabled"
          }`}
          onClick={handleStart}
          disabled={!canProceed || isLoading}
        >
          {isLoading
            ? "Connecting to your interviewer..."
            : !ollamaHost.trim()
            ? "Enter Ollama Host to Begin"
            : !selectedCompany
            ? "Select a Company"
            : !selectedType
            ? "Select Interview Type"
            : "Begin Interview →"}
        </button>
      </div>
    </div>
  );
}