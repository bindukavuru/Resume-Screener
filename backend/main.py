from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
import PyPDF2
import io
import os
import json
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY"),
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def extract_text_from_pdf(file_bytes: bytes) -> str:
    pdf_reader = PyPDF2.PdfReader(io.BytesIO(file_bytes))
    text = ""
    for page in pdf_reader.pages:
        text += page.extract_text()
    return text

@app.post("/screen")
async def screen_resume(
    job_description: str = Form(...),
    resume: UploadFile = File(...)
):
    resume_bytes = await resume.read()

    if resume.filename.endswith(".pdf"):
        resume_text = extract_text_from_pdf(resume_bytes)
    else:
        resume_text = resume_bytes.decode("utf-8")

    prompt = f"""You are an expert ATS (Applicant Tracking System) and recruiter analyzing a resume.

Job Description:
{job_description}

Resume:
{resume_text}

Analyze this resume and return ONLY a valid JSON object with exactly this structure, no extra text, no markdown fences:

{{
  "ats_score": <number 0-100>,
  "match_score": <number 0-100>,
  "ats_breakdown": {{
    "keyword_match": <number 0-100>,
    "format_score": <number 0-100>,
    "section_completeness": <number 0-100>
  }},
  "strengths": [
    "<specific strength 1>",
    "<specific strength 2>",
    "<specific strength 3>"
  ],
  "gaps": [
    "<missing skill or experience 1>",
    "<missing skill or experience 2>",
    "<missing skill or experience 3>"
  ],
  "recommendation": "<Hire | Maybe | Pass>",
  "recommendation_reason": "<one line reason>",
  "summary": "<2-3 sentence overall assessment referencing actual resume content>"
}}

ATS Score = how well the resume is optimized for automated tracking systems (keywords, formatting, sections).
Match Score = how well the candidate's actual experience matches the job requirements.
Be specific and reference actual content from the resume."""

    response = client.chat.completions.create(
        model="google/gemma-3-4b-it:free",
        messages=[{"role": "user", "content": prompt}],
    )

    raw = response.choices[0].message.content.strip()
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
    result = json.loads(raw.strip())
    return result

@app.get("/")
def root():
    return {"status": "Resume Screener API is running"}
