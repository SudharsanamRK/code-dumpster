# AI Resume Ranker (Web App)

Upload your PDF resume, paste a job description, and get an instant match score — all inside a clean and minimal web app.

### Features
- Upload PDF resume
- Paste job description
- Get match percentage (TF-IDF + cosine similarity)
- View top matched keywords
- See missing skills
- Download result as `.txt` report

### Tech Stack
- Python 3
- Flask
- scikit-learn
- PyPDF2

### Setup
```bash
pip install flask scikit-learn PyPDF2
python app.py
```

> Visit http://127.0.0.1:5000 to use..

## Hosted Demo

**Live Web App**:  
[https://code-dumpster.onrender.com](https://code-dumpster.onrender.com)

> Upload your resume PDF and compare it against any job description.  
> Shows top matched keywords, missing skills, and a final match verdict!
