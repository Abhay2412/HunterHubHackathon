import pandas as pd
import numpy as np
import json
import parse as parse

def calculate_cosine_similarity(vector1, vector2):
    """Calculates the cosine similarity between two vectors

    Args:
        vector1 (list): first vector
        vector2 (list): second vector

    Returns:
        float: similarity score between the two vectors
    """
    dot_product = np.dot(vector1, vector2)
    norm_vector1 = np.linalg.norm(vector1)
    norm_vector2 = np.linalg.norm(vector2)
    
    similarity = dot_product / (norm_vector1 * norm_vector2) if norm_vector1 * norm_vector2 != 0 else 0
    return similarity

def scholarship_recommendation(scholarship, student):
    # Define weights for different criteria
    weights = {
        "skills": 1,
        "soft_skills": 1,
    }

    # Check if the scholarship title contains any included word
    if not any(word.lower() in scholarship["title"].lower() for word in student["faculty"]):
        return 0
         
    # Check for GPA and year entering criteria
    if (
        (student["gpa"] is not None and student["gpa"] < 3.30 and
         any("Academic merit" in desc.lower() for desc in scholarship["award_description"])) or
        student.get("year_entering") not in scholarship.get("year_entering", [])
    ):
        return 0

    # Check for faculty match
    scholarship_faculty = scholarship['required_criteria'].get("Faculty", "").lower()
    student_faculty = [faculty.lower() for faculty in student.get("faculty", [])]

    if scholarship_faculty != "any" and scholarship_faculty not in student_faculty:
        return 0
    
    # Extract relevant information from the scholarship and student dictionaries
    hard_skills_criteria = set([
        *scholarship.get("award_description", []),
        *student.get("skills", []),
    ])

    soft_skills_criteria = set(student.get("soft skills", []))

    # Construct binary vectors for scholarship and student criteria
    all_criteria = list(hard_skills_criteria.union(soft_skills_criteria))
    scholarship_vector = [weights.get("skills", 1) if crit in hard_skills_criteria else 0 for crit in all_criteria]
    student_vector = [weights.get("soft_skills", 1) if crit in soft_skills_criteria else 0 for crit in all_criteria]

    # Calculate cosine similarity
    similarity = calculate_cosine_similarity(scholarship_vector, student_vector)
    return similarity


# resume_text = parse.extract_text_pdf_nonwhitespaced("scripts/JacobLansang_Resume (8).pdf")

# tech_skill_patterns = parse.load_skills("scripts/jz_skill_patterns.jsonl")
# parse.add_skills(tech_skill_patterns, parse.matcher)
# skills = parse.extract_skills(resume_text, parse.matcher)

# soft_skill_patterns = parse.load_skills("scripts/soft_skill_patterns.jsonl")
# parse.add_skills(soft_skill_patterns, parse.matcher)
# soft_skills = parse.extract_skills(resume_text, parse.matcher)

# education_section = parse.extract_education_section(resume_text)
# year = parse.extract_year_entering(education_section)
# faculty = parse.extract_faculty(education_section)
# gpa = parse.extract_GPA(education_section)

# print(year)
# print(faculty)
# print(skills)
# print(soft_skills)
# print(gpa)

# student_dict = {
#     "year_entering": year,
#     "faculty": faculty,
#     "skills": skills,
#     "soft skills": soft_skills,
#     "gpa": gpa
# }

# with open('scripts/scholarships_data_sorted.json', 'r') as f:
#     # Load the JSON content from the file
#     scholarships_dict = json.load(f)

# scholarship_scores = []

# for scholarship in scholarships_dict:
#     recommendation_score = scholarship_recommendation(scholarship, student_dict)

#     scholarship_scores.append({scholarship["title"]: recommendation_score})

# # Sort the list of dictionaries by recommendation_score
# sorted_scholarships = sorted(scholarship_scores, key=lambda x: list(x.values())[0], reverse=True)

# # Keep only the top 5 scholarships
# top_5_scholarships = sorted_scholarships[:100]

# # Print the resulting list of dictionaries
# print("Top 5 Highest recommended scholarships: ", top_5_scholarships)