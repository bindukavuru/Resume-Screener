# 🔍 AI Resume Screener

An LLM-powered resume screening tool that analyzes resumes against job descriptions — giving you **ATS scores**, **job match scores**, and actionable feedback instantly.

Built as a portfolio project to help tailor resumes for specific job applications.

![Resume Screener Demo](https://img.shields.io/badge/Status-Live-brightgreen) ![Python](https://img.shields.io/badge/Python-3.10-blue) ![React](https://img.shields.io/badge/React-Vite-61DAFB) ![FastAPI](https://img.shields.io/badge/FastAPI-009688)

## 🌐 Live Demo
👉 [resume-screener-app.vercel.app](https://resume-screener-app.vercel.app)

## ✨ Features
- **ATS Score** — How well your resume passes automated tracking systems
- **Job Match Score** — How closely your experience matches the job
- **Keyword Breakdown** — Keyword match, format score, section completeness
- **Strengths & Gaps** — Specific feedback referencing your actual resume
- **Hire/Maybe/Pass Recommendation** — Instant recruiter-style verdict
- **Claude-themed dark UI** — Clean, modern, portfolio-ready design

## 🛠 Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite |
| Backend | Python + FastAPI |
| AI | LLM via API |
| Frontend Hosting | Vercel (free) |
| Backend Hosting | Render (free) |

## 🚀 Run Locally

### Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
echo 'OPENROUTER_API_KEY=your_key_here' > .env
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

## 📁 Project Structure
## 💡 How It Works
1. Paste a job description
2. Upload your resume (PDF or TXT)
3. The backend extracts resume text and sends both to the LLM
4. The LLM returns structured JSON with scores and feedback
5. The frontend renders the results as interactive score cards

## 🔒 Environment Variables
| Variable | Description |
|----------|-------------|
| `OPENROUTER_API_KEY` | Your OpenRouter API key |

---
Built by [Bindusree Kavuru](https://github.com/bindukavuru)
