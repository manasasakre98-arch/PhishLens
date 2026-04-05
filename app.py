from flask_cors import CORS
from flask import Flask, request, jsonify
import pickle

app = Flask(__name__)
CORS(app)

model = pickle.load(open("model.pkl", "rb"))

def extract_features(url):
    return [
        len(url),
        url.count('.'),
        int('@' in url),
        int('https' in url)
    ]

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    url = data["input"]

    features = extract_features(url)
    prediction = model.predict([features])[0]

    # ✅ Hybrid rule boost (INSIDE function)
    if '@' in url or len(url) > 100:
        prediction = 1

    if prediction == 1:
        result = "Phishing"
    else:
        result = "Safe"

    return jsonify({"result": result})


if __name__ == "__main__":
    app.run(debug=True)