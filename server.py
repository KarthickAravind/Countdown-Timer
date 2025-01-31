from flask import Flask, send_from_directory
from flask_cors import CORS

app = Flask(__name__, static_folder='../countdown-timer/build')
CORS(app)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route('/set-timer', methods=['POST'])
def set_timer():
    data = request.json
    minutes = data.get('minutes')
    if minutes is None or not isinstance(minutes, int) or minutes <= 0:
        return jsonify({'error': 'Invalid input. Please provide a positive integer for minutes.'}), 400
    return jsonify({'message': 'Timer set successfully', 'seconds': minutes * 60}), 200

if __name__ == '__main__':
    app.run(debug=True) 