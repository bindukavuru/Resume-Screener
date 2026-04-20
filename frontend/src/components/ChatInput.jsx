import { useState } from "react";
import axios from "axios";

export default function ChatInput({ setResult, setLoading, setSubmitted, loading, submitted }) {
  const [jobDesc, setJobDesc] = useState("");
  const [resume, setResume] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const handleSubmit = async () => {
    if (!jobDesc.trim() || !resume) return;
    setLoading(true);
    setSubmitted(true);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append("job_description", jobDesc);
      formData.append("resume", resume);
      const res = await axios.post("http://127.0.0.1:8000/screen", formData);
      setResult(res.data);
    } catch (e) {
      alert("Error: " + (e.response?.data?.detail || e.message));
      setSubmitted(false);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setSubmitted(false);
    setJobDesc("");
    setResume(null);
  };

  return (
    <div className={`chat-box ${submitted ? "chat-box--compact" : ""}`}>
      {submitted ? (
        <div className="chat-submitted-row">
          <span className="chat-submitted-label">
            📄 {resume?.name} &nbsp;·&nbsp; {jobDesc.slice(0, 60)}...
          </span>
          <button className="btn-ghost" onClick={handleReset}>New Screen</button>
        </div>
      ) : (
        <>
          <textarea
            className="chat-textarea"
            placeholder="Paste the job description here..."
            value={jobDesc}
            onChange={e => setJobDesc(e.target.value)}
            rows={5}
          />

          <div
            className={`drop-zone ${dragOver ? "drag-over" : ""} ${resume ? "has-file" : ""}`}
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={e => {
              e.preventDefault();
              setDragOver(false);
              const f = e.dataTransfer.files[0];
              if (f) setResume(f);
            }}
            onClick={() => document.getElementById("resume-upload").click()}
          >
            {resume ? (
              <span className="file-name">✅ {resume.name}</span>
            ) : (
              <>
                <span className="drop-icon">⬆</span>
                <span>Drop your resume here or <u>browse</u></span>
                <span className="drop-hint">PDF or TXT</span>
              </>
            )}
            <input
              id="resume-upload"
              type="file"
              accept=".pdf,.txt"
              style={{ display: "none" }}
              onChange={e => setResume(e.target.files[0])}
            />
          </div>

          <button
            className="btn-primary"
            onClick={handleSubmit}
            disabled={!jobDesc.trim() || !resume || loading}
          >
            {loading ? "Analyzing..." : "Screen Resume →"}
          </button>
        </>
      )}
    </div>
  );
}
