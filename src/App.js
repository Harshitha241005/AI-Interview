import React, { useState, useEffect } from "react";
import { useInterviewSession } from "./hooks/useInterviewSession";
import SetupPage from "./pages/SetupPage";
import InterviewPage from "./pages/InterviewPage";
import LoginPage from "./pages/LoginPage";
import "./styles/global.css";

export default function App() {
  const [view, setView] = useState("login"); // login | setup | interview
  const [user, setUser] = useState(null);

  const {
    messages,
    isLoading,
    isStreaming,
    error,
    sessionConfig,
    startSession,
    sendMessage,
    endSession,
    resetSession
  } = useInterviewSession();

  // ✅ Check login on load
  useEffect(() => {
    const localUser = localStorage.getItem("user");
    const sessionUser = sessionStorage.getItem("user");

    if (localUser) {
      setUser(JSON.parse(localUser));
      setView("setup");
    } else if (sessionUser) {
      setUser(JSON.parse(sessionUser));
      setView("setup");
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setView("setup");
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setUser(null);
    setView("login");
  };

  const handleStartInterview = async (config) => {
    setView("interview");
    await startSession(config);
  };

  const handleReset = () => {
    resetSession();
    setView("setup");
  };

  const handleEndSession = () => {
    endSession();
  };

  // 🔐 LOGIN
  if (view === "login") {
    return <LoginPage onLogin={handleLogin} />;
  }

  // 🎯 INTERVIEW
  if (view === "interview") {
    return (
      <InterviewPage
        messages={messages}
        isLoading={isLoading}
        isStreaming={isStreaming}
        sessionConfig={sessionConfig}
        onSendMessage={sendMessage}
        onEndSession={handleEndSession}
        onReset={handleReset}
        error={error}
      />
    );
  }

  // ⚙️ SETUP
  return (
    <SetupPage
      onStartInterview={handleStartInterview}
      isLoading={isLoading}
      error={error}
      onLogout={handleLogout}
      user={user}
    />
  );
}