from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import os

# Initialisation de l'application Flask
app = Flask(__name__)
CORS(app)

# Connexion à MongoDB
mongo_uri = "mongodb+srv://airflow:airflow@airflow.6pc0m.mongodb.net/"
client = MongoClient(mongo_uri)
db = client["miniprojet"]

# Route pour récupérer les données de la dimension Pays
@app.route('/api/pays', methods=['GET'])
def get_pays():
    data = list(db['pays_dim'].find({}, {"_id": 0}))  # Exclure le champ "_id"
    return jsonify(data)

# Route pour récupérer les données de la dimension Continent
@app.route('/api/continents', methods=['GET'])
def get_continents():
    data = list(db['continent_dim'].find({}, {"_id": 0}))  # Exclure le champ "_id"
    return jsonify(data)

# Route pour récupérer les données de la dimension Aire
@app.route('/api/areas', methods=['GET'])
def get_areas():
    data = list(db['area_dim'].find({}, {"_id": 0}))  # Exclure le champ "_id"
    return jsonify(data)

# Route pour récupérer les données de la dimension Capital
@app.route('/api/capitals', methods=['GET'])
def get_capitals():
    data = list(db['capital_dim'].find({}, {"_id": 0}))  # Exclure le champ "_id"
    return jsonify(data)

# Route pour récupérer les données de la dimension Indicateurs Démographiques
@app.route('/api/indicators', methods=['GET'])
def get_indicators():
    data = list(db['demographic_indicator_dim'].find({}, {"_id": 0}))  # Exclure le champ "_id"
    return jsonify(data)

# Route pour récupérer les données de la table de faits Population
@app.route('/api/population', methods=['GET'])
def get_population_fact():
    data = list(db['population_fact'].find({}, {"_id": 0}))  # Exclure le champ "_id"
    return jsonify(data)

# Route principale pour vérifier l'état du backend
@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Bienvenue sur l'API du backend pour le tableau de bord démographique!"})

# Lancer l'application Flask
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')