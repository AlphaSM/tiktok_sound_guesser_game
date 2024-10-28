from flask import Flask, render_template, jsonify
import json
import os


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
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)), debug=True)
    #app.run()
