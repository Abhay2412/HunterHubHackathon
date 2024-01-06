import spacy
import re
import json
from spacy.matcher import Matcher

# Load the pre-trained spaCy English NLP model
nlp = spacy.load("en_core_web_md")
matcher = Matcher(nlp.vocab)


def extract_name(text):
    doc = nlp(text)
    names = [ent.text for ent in doc.ents if ent.label_ == "PERSON"]
    print("Extracted Names: ", names)


def extract_phone(text):
    phone_regex = re.compile(
        r"(\+\d{1,2}\s?)?(\(\d{2,4}\))?\s?(\d{3}[\s\-]?\d{3}[\s\-]?\d{4})"
    )
    phone_matches = phone_regex.findall(text)

    phone_number_matches = ["".join(match) for match in phone_matches]
    print("Extracted Numbers: ", phone_number_matches)


def extract_email(text):
    email_regex = re.compile(r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b")
    email_matches = email_regex.findall(text)

    emails = ["".join(match) for match in email_matches]
    print("Extracted Emails: ", emails)


def extract_skills(text, matcher):
    doc = nlp(text)
    matches = matcher(doc)
    skills = []

    for match_id, start, end in matches:
        skill_text = doc[start:end].text
        skills.append(skill_text)

    unique_skills = list(set(item.lower() for item in skills))
    return unique_skills


def add_skills(skill_patterns, matcher):
    for pattern in skill_patterns:
        matcher.add(pattern["label"], [pattern["pattern"]])


def load_skills(path):
    skill_patterns = []
    with open(path, "r") as file:
        for line in file:
            skill_data = json.loads(line)
            skill_patterns.append(skill_data)
    return skill_patterns


def extract_education_section(text):
    doc = nlp(text)

    education_section = ""
    found_education = False

    education_headers = ["Education", "EDUCATION"]
    stop_keywords = [
        "Experience",
        "Technical",
        "Skills",
        "Interests",
        "Honors",
        "Awards",
        "Employment",
        "History",
        "Project",
        "Projects",
        "Extracurricular",
        "Activities",
        "Volunteer",
    ]

    for token in doc:
        if token.text in education_headers:
            found_education = True
            continue

        if found_education and token.text.lower() in {
            keyword.lower() for keyword in stop_keywords
        }:
            break

        if found_education:
            education_section += token.text_with_ws

    return education_section.strip()


def extract_faculty(text):
    doc = nlp(text)
    faculty = []

    faculties = [
        "Arts",
        "Business",
        "Education",
        "Engineering",
        "Kinesiology",
        "Law",
        "Medicine",
        "Nursing",
        "Science",
        "Social Work",
        "Veterinary Medicine",
    ]
    degree_signatures_science = ["BSc", "B.Sc.", "BS"]
    degree_signatures_business = ["BCom", "BComm", "B.Comm.", "B.Com."]

    for token in doc:
        if token.text.lower() in {keyword.lower() for keyword in faculties}:
            faculty.append(token.text)
        elif token.text.lower() in {
            keyword.lower() for keyword in degree_signatures_science
        }:
            faculty.append("Science")
        elif token.text.lower() in {
            keyword.lower() for keyword in degree_signatures_business
        }:
            faculty.append("Business")
        elif token.text.lower() == "ba":
            faculty.append("Arts")

    unique_faculties = list(set(item.lower() for item in faculty))
    return unique_faculties


def extract_year_entering(text):
    pattern = r"\b\d{4}\b"

    match = re.search(pattern, text)
    if match:
        year = int(match.group())
        year_entering = (2023 - year) + 1

    return year_entering if match else None


def extract_GPA(text):
    pattern = r"(?:GPA|cGPA|gpa):\s*([0-9]\.[0-9]{1,2})/\d\.\d{1,2}"
    pattern2 = r"\b(?:GPA|cGPA|gpa):\s*([0-9]+(?:\.[0-9]+)?)\b"

    match = re.search(pattern, text)
    match2 = re.search(pattern2, text)

    if match:
        return float(match.group(1))
    elif match2:
        return float(match2.group(1))
    else:
        return None


def extract_jobs(text, matcher):
    doc = nlp(text)
    matches = matcher(doc)
    jobs = []

    for match_id, start, end in matches:
        job_text = doc[start:end].text
        jobs.append(job_text)

    return jobs


def load_jobs(path):
    jobs = []
    with open(path, "r") as file:
        data = json.load(file)
        jobs = data.get("occupations", [])

    # Convert job titles to lowercase
    jobs_lower = [job.lower() for job in jobs]

    return jobs_lower


def add_jobs(job_patterns, matcher):
    for occupation in job_patterns:
        occupation_tokens = [
            {"LOWER": {"in": word.lower().split()}} for word in occupation.split()
        ]
        matcher.add("JOB_TITLE", [occupation_tokens])


def extract_company_names(
    resume_text,
    stop_sections=(
        "interests",
        "awards",
        "education",
        "projects",
        "personal projects",
        "skills",
    ),
):
    doc = nlp(resume_text)
    company_names = []

    # Initialize a flag to check if the current section is within stop_sections
    stop_processing = False

    # Iterate through sentences and identify relevant section
    for sent in doc.sents:
        # Check if the current section is within stop_sections
        if any(stop_section in sent.text.lower() for stop_section in stop_sections):
            stop_processing = True

        # If a relevant section is identified, extract organizations labeled as ORG entities
        if not stop_processing:
            for ent in sent.ents:
                if ent.label_ == "ORG":
                    company_names.append(ent.text)

    return company_names
