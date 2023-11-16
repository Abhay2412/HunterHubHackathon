import time
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
# from pdfminer.high_level import extract_text
import openai
from bs4 import BeautifulSoup

# !Initial Setup
app = Flask(__name__)
CORS(app)
openai.api_key = "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"


# Hit ChatGPT endpoint with query prompt and files saved locally


@app.route('/api/GPTprompt', methods=['GET'])
def prompt():
    return {'data': 'GPTprompt'}

# Recommend scholarships based on user profile and files saved locally


@app.route('/api/recommend', methods=['GET'])
def recommend():
    return {'data': 'recommend'}

# Parse resume file


@app.route('/api/parse', methods=['GET'])
def parse():
    return {'data': 'parse'}

# Jobs PDF documents


@app.route('/api/summarizer', methods=['GET'])
def jobs():
    return {'data': 'summarizer'}


# # Parse resume file saved locally
# @app.route('/api/parse', methods=['GET'])
# def parse():
#         text = extract_text(file)

# Hit ChatGPT endpoint with query prompt and files saved locally

def CustomChatGPT(candidate_resume, scholarship_info):
    messages = [
        {"role": "system", "content": "Based on the Candidate's resume and scholarship information, you are going to write a scholarship application for this candidate."},
        {"role": "user", "content": f"Candidate Resume: {candidate_resume}\nScholarship Information: {scholarship_info}"}
    ]

    response = openai.ChatCompletion.create(
        model="gpt-4-1106-preview",
        messages=messages
    )

    ChatGPT_reply = response.choices[0].message.content
    messages.append({"role": "assistant", "content": ChatGPT_reply})

    return ChatGPT_reply


def scrape_entire_page(url):
    response = requests.get(url)
    if response.status_code != 200:
        return "Failed to retrieve the webpage"
    soup = BeautifulSoup(response.content, 'html.parser')
    return soup.get_text(separator='\n', strip=True)

def query_gpt4_for_scholarship_description(content):
    openai.api_key = "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"
    completion = openai.ChatCompletion.create(
        model="gpt-4-1106-preview",
        messages=[{"role": "user", "content": "These are information from a scholarship posting. Extract anyinformation related to scholarship description from the following text:\n" + content}]
    )
    return completion.choices[0].message['content']


@app.route('/api/prompt/scholarships', methods=['POST'])
def prompt_scholarship():
    data = request.json
    candidate_resume = data.get('candidate_resume')
    # scholarship_info = data.get('scholarship_info')
    scholarship_url = data.get('scholarship_url')
    page_content = scrape_entire_page(scholarship_url)
    scholarship_description = query_gpt4_for_scholarship_description(page_content)

    if not candidate_resume or not scholarship_url:
        return jsonify({"error": "Missing candidate_resume or scholarship_url"}), 400

    result = CustomChatGPT(candidate_resume, scholarship_description)
    return jsonify({"response": result})
