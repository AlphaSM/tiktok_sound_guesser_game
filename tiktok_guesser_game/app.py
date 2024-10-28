from flask import Flask, render_template, jsonify
import json

app = Flask(__name__)

# Load questions from JSON file
with open('sounds.json', 'r') as file:
    sound_data = json.load(file)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_questions')
def get_questions():
    return jsonify(sound_data)

if __name__ == '__main__':
    app.run(debug=True)
