import ReactMarkdown from "react-markdown";

function ScoreRing({ score, label, color }) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <div className="score-ring-wrap">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={r} fill="none" stroke="#2a2a3a" strokeWidth="12" />
        <circle
          cx="70" cy="70" r={r} fill="none"
          stroke={color} strokeWidth="12"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 70 70)"
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)" }}
        />
        <text x="70" y="65" textAnchor="middle" fill="white" fontSize="26" fontWeight="700">{score}%</text>
        <text x="70" y="85" textAnchor="middle" fill="#8888aa" fontSize="11">{label}</text>
      </svg>
    </div>
  );
}

function ATSBreakdown({ breakdown }) {
  const items = [
    { label: "Keyword Match", value: breakdown.keyword_match },
    { label: "Format Score", value: breakdown.format_score },
    { label: "Section Completeness", value: breakdown.section_completeness },
  ];
  return (
    <div className="ats-breakdown">
      {items.map(item => (
        <div key={item.label} className="breakdown-row">
          <span className="breakdown-label">{item.label}</span>
          <div className="breakdown-bar-bg">
            <div className="breakdown-bar-fill" style={{ width: `${item.value}%` }} />
          </div>
          <span className="breakdown-value">{item.value}%</span>
        </div>
      ))}
    </div>
  );
}

const recColor = { Hire: "#00e5a0", Maybe: "#f5a623", Pass: "#ff5c5c" };

export default function ResultsPanel({ result }) {
  return (
    <div className="results">

      {/* Score Cards */}
      <div className="score-cards">
        <div className="score-card score-card--ats">
          <div className="score-card-label">ATS Score</div>
          <ScoreRing score={result.ats_score} label="ATS" color="#cc85ff" />
          <p className="score-card-desc">How well your resume passes automated screening systems</p>
          <ATSBreakdown breakdown={result.ats_breakdown} />
        </div>

        <div className="score-card score-card--match">
          <div className="score-card-label">Job Match Score</div>
          <ScoreRing score={result.match_score} label="Match" color="#d4a843" />
          <p className="score-card-desc">How closely your experience aligns with the job requirements</p>
          <div className={`rec-badge`} style={{ background: recColor[result.recommendation] + "22", color: recColor[result.recommendation], border: `1px solid ${recColor[result.recommendation]}44` }}>
            {result.recommendation} — {result.recommendation_reason}
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="details-grid">
        <div className="detail-card">
          <h3 className="detail-title">✅ Strengths</h3>
          <ul className="detail-list">
            {result.strengths.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>

        <div className="detail-card">
          <h3 className="detail-title">⚠️ Gaps</h3>
          <ul className="detail-list gap-list">
            {result.gaps.map((g, i) => <li key={i}>{g}</li>)}
          </ul>
        </div>

        <div className="detail-card detail-card--full">
          <h3 className="detail-title">📋 Summary</h3>
          <p className="detail-summary">{result.summary}</p>
        </div>
      </div>
    </div>
  );
}
