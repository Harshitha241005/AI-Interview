import { useState } from "react";
import { buildInterviewerSystemPrompt, buildFeedbackPrompt } from "../utils/promptBuilder";

export function useInterviewSession() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState(null);
  const [sessionConfig, setSessionConfig] = useState(null);

  // ✅ Start Interview Session
  const startSession = async (config) => {
    try {
      setIsLoading(true);
      setError(null);
      setSessionConfig(config);

      const systemPrompt = buildInterviewerSystemPrompt(config);

      // Inject first assistant message so AI doesn't echo full instructions
      const firstAssistantMessage = {
        role: "assistant",
        content: `Hello ${config.candidateName || "Candidate"}, welcome! I'm ${config.interviewerName || "the interviewer"} at ${config.company.name}. Let's start the interview. Can you tell me a bit about your background and experience?`
      };

      setMessages([firstAssistantMessage]);

      // You can optionally send system prompt to log/context
      await fetch("http://localhost:11434/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "tinyllama",
          messages: [
            { role: "system", content: systemPrompt },
            firstAssistantMessage
          ],
          stream: false
        })
      });

    } catch (err) {
      console.error(err);
      setError("Failed to start session");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Send Message
  const sendMessage = async (userInput) => {
    try {
      setIsStreaming(true);
      setError(null);

      const newUserMessage = { role: "user", content: userInput };

      setMessages(prev => [...prev, newUserMessage]);

      const response = await fetch("http://localhost:11434/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "tinyllama",
          messages: [...messages, newUserMessage].map(m => ({
            role: m.role,
            content: m.content
          })),
          stream: false
        })
      });

      const data = await response.json();
      const aiMessage = data.message?.content || "";

      setMessages(prev => [...prev, { role: "assistant", content: aiMessage.trim() }]);

    } catch (err) {
      console.error(err);
      setError("Message failed");
    } finally {
      setIsStreaming(false);
    }
  };

  // ✅ End Session
  const endSession = async () => {
    try {
      const feedbackPrompt = buildFeedbackPrompt(messages);

      const response = await fetch("http://localhost:11434/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "tinyllama",
          messages: [{ role: "user", content: feedbackPrompt }],
          stream: false
        })
      });

      const data = await response.json();
      const feedback = data.message?.content || "";

      setMessages(prev => [...prev, { role: "assistant", content: feedback.trim() }]);

    } catch (err) {
      console.error(err);
    }
  };

  const resetSession = () => {
    setMessages([]);
    setSessionConfig(null);
    setError(null);
  };

  return {
    messages,
    isLoading,
    isStreaming,
    error,
    sessionConfig,
    startSession,
    sendMessage,
    endSession,
    resetSession
  };
}