import time
from flask import Flask
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

# @app.route('/', methods=['GET'])
# def health():
#     return '<h1>Hello, World!</h1>'

# Hit ChatGPT endpoint with query prompt and files saved locally
@app.route('/api/GPTprompt', methods=['GET'])
def prompt():
    return '<h1>Hello, GPT Prompt!</h1>'

# Recommend scholarships based on user profile and files saved locally
@app.route('/api/recommend', methods=['GET'])
def recommend():
    return '<h1>Hello, Recommend!</h1>'

# Parse resume file
@app.route('/api/parse', methods=['GET'])
def parse():
    return '<h1>Hello, Parse!</h1>'

# Summarize PDF documents
@app.route('/api/summarize', methods=['GET'])
def summarize():
    return '<h1>Hello, Summarize!</h1>'

@app.route('/api/time')
def get_current_time():
    return {'time': 1234}