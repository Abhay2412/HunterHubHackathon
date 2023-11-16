import spacy
import re
import json
from pdfminer.high_level import extract_text
from spacy.matcher import Matcher
from spacy import displacy
from spacy.pipeline.entityruler import EntityRuler

# Load the pre-trained spaCy English NLP model
nlp = spacy.load("en_core_web_lg")
matcher = Matcher(nlp.vocab)

def extract_text_pdf_whitespaced(path):
    with open(path, 'rb') as file:
        text = extract_text(file)
    return text

def extract_text_pdf_nonwhitespaced(path):
    with open(path, 'rb') as file:
        text = extract_text(file)
    text_nonwhitespaced = ' '.join(text.split())
    return text_nonwhitespaced

def extract_name(text):
    doc = nlp(text)
    names = [ent.text for ent in doc.ents if ent.label_ == "PERSON"]
    print("Extracted Names: ", names)

def extract_phone(text):
    phone_regex = re.compile(r'(\+\d{1,2}\s?)?(\(\d{2,4}\))?\s?(\d{3}[\s\-]?\d{3}[\s\-]?\d{4})')
    phone_matches = phone_regex.findall(text)

    phone_number_matches = [''.join(match) for match in phone_matches]
    print("Extracted Numbers: ", phone_number_matches)

def extract_email(text):
    email_regex = re.compile(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b')
    email_matches = email_regex.findall(text)

    emails = [''.join(match) for match in email_matches]
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
    #displacy.serve(doc, style="ent", host="localhost", port=5000)

def add_skills(skill_patterns, matcher):
    for pattern in skill_patterns:
        matcher.add(pattern['label'], [pattern['pattern']])

def load_skills(path):
    skill_patterns = []
    with open(path, 'r') as file:
        for line in file:
            skill_data = json.loads(line)
            skill_patterns.append(skill_data)
    return skill_patterns

def extract_education_section(text):
    doc = nlp(text)

    education_section = ""
    found_education = False

    education_headers = ["Education", "EDUCATION"]
    stop_keywords = ["Experience", "Technical", "Skills", "Interests", "Honors", "Awards", "Employment", "History", "Project", "Projects", "Extracurricular", "Activities", "Volunteer"]

    for token in doc:
        if token.text in education_headers:
            found_education = True
            continue

        if found_education and token.text.lower() in {keyword.lower() for keyword in stop_keywords}:
            break

        if found_education:
            education_section += token.text_with_ws

    return education_section.strip()

def extract_faculty(text):
    doc = nlp(text)
    faculty = []

    faculties = ["Arts", "Business", "Education", "Engineering", "Kinesiology", "Law", "Medicine", "Nursing", "Science", "Social Work", "Veterinary Medicine"]
    degree_signatures_science = ["BSc", "B.Sc.", "BS"]
    degree_signatures_business = ["BCom", "BComm", "B.Comm.", "B.Com."]

    for token in doc:
        if token.text.lower() in {keyword.lower() for keyword in faculties}:
            faculty.append(token.text)
        elif token.text.lower() in {keyword.lower() for keyword in degree_signatures_science}:
            faculty.append("Science")
        elif token.text.lower() in {keyword.lower() for keyword in degree_signatures_business}:
            faculty.append("Business")
        elif token.text.lower() == "ba":
            faculty.append("Arts")

    unique_faculties = list(set(item.lower() for item in faculty))
    return unique_faculties

def extract_year_entering(text):
    pattern = r'\b\d{4}\b'
    
    match = re.search(pattern, text)
    year = int(match.group())
    year_entering = (2023 - year) + 1
    
    return year_entering if match else None

def extract_GPA(text):
    pattern = r'(?:GPA|cGPA|gpa):\s*([0-9]\.[0-9]{1,2})/\d\.\d{1,2}'
    pattern2 = r'\b(?:GPA|cGPA|gpa):\s*([0-9]+(?:\.[0-9]+)?)\b'
    
    match = re.search(pattern, text)
    match2 = re.search(pattern2, text)

    if match:
        return float(match.group(1))
    elif match2:
        return float(match2.group(1))
    else:
        return None


resume_text = extract_text_pdf_whitespaced("ComputerScienceResumedocx.pdf")

soft_skill_patterns = load_skills("soft_skill_patterns.jsonl")
add_skills(soft_skill_patterns, matcher)
soft_skills = extract_skills(resume_text, matcher)
print("Extracted Soft Skills: ", soft_skills)


# major = extract_majors(resume_text, major_list)
# print(major)
# skill_patterns = load_skills("jz_skill_patterns.jsonl")
# add_skills(skill_patterns, matcher)
# skills = extract_skills(resume_text, matcher)
# print("Extracted Skills: ", skills)
