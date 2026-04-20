import { useState } from "react";
import ChatInput from "./components/ChatInput";
import ResultsPanel from "./components/ResultsPanel";
import "./App.css";

export default function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <span className="logo-icon">◆</span>
          <span className="logo-text">ResumeScreener <span className="powered">powered by Claude</span></span>
        </div>
      </header>

      <main className="main">
        {!submitted ? (
          <div className="hero">
            <div className="hero-badge">AI-Powered Screening</div>
            <h1 className="hero-title">
              Is your resume <br />
              <span className="gradient-text">built to pass?</span>
            </h1>
            <p className="hero-sub">
              Upload your resume and job description. Get your ATS score,
              match analysis, and actionable feedback — instantly.
            </p>
          </div>
        ) : null}

        <ChatInput
          setResult={setResult}
          setLoading={setLoading}
          setSubmitted={setSubmitted}
          loading={loading}
          submitted={submitted}
        />

        {loading && (
          <div className="loading-box">
            <div className="spinner" />
            <p>Analyzing your resume with Claude...</p>
          </div>
        )}

        {result && <ResultsPanel result={result} />}
      </main>
    </div>
  );
}
