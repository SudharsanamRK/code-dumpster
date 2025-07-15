from flask import Flask, render_template, request, send_file
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import os, PyPDF2, re, tempfile

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def extract_text_from_pdf(pdf_path):
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ''
        for page in reader.pages:
            text += page.extract_text() or ''
        return text

def clean_text(text):
    return re.sub(r'[^a-zA-Z0-9\s]', '', text.lower())

def get_keywords_match(resume_text, job_text):
    resume_words = set(clean_text(resume_text).split())
    job_words = set(clean_text(job_text).split())
    matched = list(job_words & resume_words)
    missing = list(job_words - resume_words)
    return matched, missing

def get_similarity(resume, job):
    vect = TfidfVectorizer()
    vectors = vect.fit_transform([resume, job])
    return round(cosine_similarity(vectors[0:1], vectors[1:2])[0][0] * 100, 2)

@app.route('/', methods=['GET', 'POST'])
def index():
    score = None
    verdict = ''
    matched = []
    missing = []
    export_ready = False

    if request.method == 'POST':
        job_desc = request.form['jobdesc']
        file = request.files['resume']
        if file and file.filename.endswith('.pdf'):
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
            file.save(filepath)

            resume_text = extract_text_from_pdf(filepath)
            resume_clean = clean_text(resume_text)
            job_clean = clean_text(job_desc)

            score = get_similarity(resume_clean, job_clean)
            matched, missing = get_keywords_match(resume_text, job_desc)
            export_ready = True

            if score > 75:
                verdict = "✅ Strong Match! Apply now."
            elif score > 45:
                verdict = "🟡 Decent. Add more relevant skills."
            else:
                verdict = "❌ Low match. Customize your resume more."

            # Save export file
            with open("result.txt", "w", encoding="utf-8") as f:
                f.write(f"Resume Match Score: {score}%\n")
                f.write(f"{verdict}\n\n")
                f.write("Top Matched Keywords:\n")
                f.write(", ".join(sorted(matched)) + "\n\n")
                f.write("Missing Keywords:\n")
                f.write(", ".join(sorted(missing)) + "\n")

    return render_template('index.html', score=score, verdict=verdict,
                           matched=matched, missing=missing,
                           export_ready=export_ready)

@app.route('/download')
def download_result():
    return send_file("result.txt", as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
