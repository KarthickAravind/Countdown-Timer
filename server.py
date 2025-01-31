from flask import Flask, jsonify, request
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/set-timer', methods=['POST'])
def set_timer():
    data = request.json
    minutes = data.get('minutes')
    if minutes is None or not isinstance(minutes, int) or minutes <= 0:
        return jsonify({'error': 'Invalid input. Please provide a positive integer for minutes.'}), 400
    return jsonify({'message': 'Timer set successfully', 'seconds': minutes * 60}), 200

if __name__ == '__main__':
    app.run(debug=True)