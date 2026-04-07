import React, { useState, useRef, useEffect } from "react";
import Message from "../components/Message";
import FeedbackModal from "../components/FeedbackModal";
import "./InterviewPage.css";

export default function InterviewPage({
  messages,
  isLoading,
  isStreaming,
  sessionConfig,
  onSendMessage,
  onEndSession,
  onReset,
  error
}) {
  const [input, setInput] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  const { company, interviewType, difficulty } = sessionConfig || {};
  const visibleMessages = messages.filter(m => !m.hidden);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading || isStreaming) return;
    setInput("");
    onSendMessage(trimmed);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEndInterview = () => {
    onEndSession();
    setShowFeedback(true);
  };

  return (
    <div className="interview-page">
      {/* Header */}
      <header className="interview-header">
        <div className="header-left">
          <button className="back-btn" onClick={onReset}>← New Session</button>
          <div className="session-info">
            <span className="session-company" style={{ color: company?.color }}>
              {company?.logo} {company?.name}
            </span>
            <span className="session-divider">·</span>
            <span className="session-type">{interviewType?.name}</span>
            <span className="session-divider">·</span>
            <span className="session-difficulty" style={{
              color: difficulty?.id === "hard" ? "var(--accent-red)" : difficulty?.id === "easy" ? "var(--accent-green)" : "var(--accent-amber)"
            }}>
              {difficulty?.name}
            </span>
          </div>
        </div>
        <div className="header-right">
          <div className="timer">
            <span className="timer-dot"></span>
            {formatTime(elapsedSeconds)}
          </div>
          <button className="end-btn" onClick={handleEndInterview}>
            End & Get Feedback
          </button>
        </div>
      </header>

      {/* Error */}
      {error && (
        <div className="error-banner">
          ⚠ {error}
        </div>
      )}

      {/* Messages */}
      <div className="messages-container">
        <div className="messages-inner">
          {visibleMessages.length === 0 && isLoading && (
            <div className="loading-state">
              <div className="loading-dots">
                <span></span><span></span><span></span>
              </div>
              <p>Your interviewer is preparing...</p>
            </div>
          )}
          {visibleMessages.map((msg, idx) => (
            <Message key={idx} message={msg} companyColor={company?.color} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="input-area">
        <div className="input-container">
          <textarea
            ref={inputRef}
            className="message-input"
            placeholder="Type your response... (Enter to send, Shift+Enter for new line)"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={3}
            disabled={isLoading && !isStreaming}
          />
          <div className="input-actions">
            <span className="input-hint">Press Enter to send</span>
            <button
              className={`send-btn ${input.trim() && !isLoading ? "active" : "inactive"}`}
              onClick={handleSend}
              disabled={!input.trim() || (isLoading && !isStreaming)}
            >
              Send →
            </button>
          </div>
        </div>
        <div className="quick-actions">
          <button className="quick-btn" onClick={() => onSendMessage("Could you please repeat or rephrase the question?")}>
            🔁 Repeat question
          </button>
          <button className="quick-btn" onClick={() => onSendMessage("I need a moment to think through this.")}>
            🤔 Give me a moment
          </button>
          <button className="quick-btn" onClick={() => onSendMessage("Can I get a small hint?")}>
            💡 Hint please
          </button>
          <button className="quick-btn" onClick={() => onSendMessage("I think I'm done with this question. What's next?")}>
            ✅ Next question
          </button>
        </div>
      </div>

      {/* Feedback Modal */}
      {showFeedback && (
        <FeedbackModal
          messages={visibleMessages}
          sessionConfig={sessionConfig}
          onClose={() => setShowFeedback(false)}
          onStartNew={onReset}
        />
      )}
    </div>
  );
}
