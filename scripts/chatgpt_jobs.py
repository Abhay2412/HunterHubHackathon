import requests
from bs4 import BeautifulSoup
import openai

def scrape_entire_page(url):
    response = requests.get(url)
    if response.status_code != 200:
        return "Failed to retrieve the webpage"
    soup = BeautifulSoup(response.content, 'html.parser')
    return soup.get_text(separator='\n', strip=True)

def query_gpt4_for_job_description(content):
    openai.api_key = "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"
    completion = openai.ChatCompletion.create(
        model="gpt-4-1106-preview",
        messages=[{"role": "user", "content": "These are information from a Job posting. Extract anyinformation related to job description from the following text that can be useful for writing a cover letter or resume:\n" + content}]
    )
    return completion.choices[0].message['content']

def tailor_resume_for_job(job_description, resume):
    openai.api_key = "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"
    completion = openai.ChatCompletion.create(
        model="gpt-4-1106-preview",
        messages=[
            {"role": "user", "content": f"This Candidate is going to apply for this postition. Tailor the following resume for the job description provided. Try to maintaine the current format and just update or change the information. Keep that in mind you cannot make imaginary work experience and position, you can just update accomplishment statements based on the job descritpion or remove any unnesecarry information and substitute with something that makes more sense for this job position:\n\nJob Description:\n{job_description}\n\nResume:\n{resume}"}
        ]
    )
    return completion.choices[0].message['content']

# Example usage
url = 'https://careers.interpipeline.com/job/Calgary-Student%2C-Heartland-Finance-AB/575199617/'
page_content = scrape_entire_page(url)
job_description = query_gpt4_for_job_description(page_content)

candidate_resume = """

"""
tailored_resume = tailor_resume_for_job(job_description, candidate_resume)

print(tailored_resume)