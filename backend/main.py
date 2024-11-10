from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import os

app = Flask(__name__)
CORS(app)

# Connexion à MongoDB
mongo_uri ="mongodb+srv://airflow:airflow@airflow.6pc0m.mongodb.net/"
client = MongoClient(mongo_uri)
db = client["miniprojet"]  # Remplace par le nom de ta base de données
collection = db["data"]  # Remplace par le nom de ta collection

@app.route('/api/data', methods=['GET'])
def get_data():
    data = list(collection.find({}, {"_id": 0}))  # Exclure le champ "_id" de MongoDB
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')