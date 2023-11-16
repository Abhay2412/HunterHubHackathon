import time
from flask import Flask
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

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