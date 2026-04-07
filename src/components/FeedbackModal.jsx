import React, { useState, useEffect } from "react";
import { buildFeedbackPrompt } from "../utils/promptBuilder";
import "./FeedbackModal.css";

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";

export default function FeedbackModal({ messages, sessionConfig, onClose, onStartNew }) {
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    generateFeedback();
  }, []);

  const generateFeedback = async () => {
    const { company, interviewType, difficulty, apiKey } = sessionConfig;
    const systemPrompt = `You are ${company.name}'s interviewer who just completed a ${interviewType.name} interview. 
Provide honest, specific, actionable feedback based on the conversation. 
Be direct and structured. Use markdown formatting with headers and bullet points.`;

    const feedbackPrompt = buildFeedbackPrompt(messages);
    const conversationText = messages
      .map(m => `${m.role === "assistant" ? "Interviewer" : "Candidate"}: ${m.content}`)
      .join("\n\n");

    try {
      const response = await fetch(ANTHROPIC_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true"
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1500,
          system: systemPrompt,
          messages: [
            {
              role: "user",
              content: `Here is the full interview transcript:\n\n${conversationText}\n\n---\n\n${feedbackPrompt}`
            }
          ]
        })
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error?.message || "API error");
      }

      const data = await response.json();
      setFeedback(data.content[0]?.text || "No feedback generated.");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formatFeedback = (text) => {
    return text
      .replace(/^#{1,2}\s+(.+)$/gm, '<h3 class="fb-heading">$1</h3>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/^\* (.+)$/gm, '<li>$1</li>')
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-panel">
        <div className="modal-header">
          <div className="modal-title-block">
            <h2 className="modal-title">Interview Debrief</h2>
            <p className="modal-subtitle">
              {sessionConfig.company.name} · {sessionConfig.interviewType.name}
            </p>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {isLoading && (
            <div className="feedback-loading">
              <div className="fb-spinner"></div>
              <p>Analyzing your performance...</p>
              <span>Your interviewer is writing up honest feedback</span>
            </div>
          )}

          {error && (
            <div className="feedback-error">
              <p>⚠ Could not generate feedback: {error}</p>
              <button onClick={generateFeedback} className="retry-btn">Retry</button>
            </div>
          )}

          {!isLoading && !error && feedback && (
            <div
              className="feedback-content"
              dangerouslySetInnerHTML={{ __html: formatFeedback(feedback) }}
            />
          )}
        </div>

        <div className="modal-footer">
          <button className="footer-btn secondary" onClick={onClose}>
            Back to Session
          </button>
          <button className="footer-btn primary" onClick={onStartNew}>
            Start New Interview →
          </button>
        </div>
      </div>
    </div>
  );
}
