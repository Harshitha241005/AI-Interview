import React from "react";
import "./Message.css";

export default function Message({ message, companyColor }) {
  const isInterviewer = message.role === "assistant";

  return (
    <div className={`message-wrapper ${isInterviewer ? "interviewer" : "candidate"}`}>
      {isInterviewer && (
        <div className="avatar interviewer-avatar" style={{ borderColor: companyColor || "var(--accent)" }}>
          <span style={{ color: companyColor || "var(--accent)" }}>I</span>
        </div>
      )}
      <div className={`message-bubble ${isInterviewer ? "interviewer-bubble" : "candidate-bubble"}`}>
        {isInterviewer && (
          <div className="message-label" style={{ color: companyColor || "var(--accent)" }}>
            Interviewer
          </div>
        )}
        {message.streaming && !message.content ? (
          <div className="typing-indicator">
            <span></span><span></span><span></span>
          </div>
        ) : (
          <div className="message-text" dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }} />
        )}
        {message.streaming && message.content && (
          <span className="streaming-cursor">▌</span>
        )}
      </div>
      {!isInterviewer && (
        <div className="avatar candidate-avatar">
          <span>U</span>
        </div>
      )}
    </div>
  );
}

function formatMessage(text) {
  if (!text) return "";
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br/>")
    .replace(/^/, "<p>")
    .replace(/$/, "</p>")
    .replace(/<p><\/p>/g, "");
}
