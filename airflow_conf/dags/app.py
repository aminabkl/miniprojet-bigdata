from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime
import pandas as pd
import pymongo
import os

# Fonction pour lire le fichier CSV
def extract_csv():
    df = pd.read_csv('/opt/airflow/dags/data/world_population.csv')

def transform_data():
    df = pd.read_csv('/opt/airflow/dags/data/world_population.csv')
    
    # Rename columns for ease of use
    rename_columns = {
        "_id": "id",
        "Rank": "rank",
        "CCA3": "country_code",
        "Country/Territory": "country_name",
        "Capital": "capital",
        "Continent": "continent",
        "2022 Population": "population_2022",
        "2020 Population": "population_2020",
        "2015 Population": "population_2015",
        "2010 Population": "population_2010",
        "2000 Population": "population_2000",
        "1990 Population": "population_1990",
        "1980 Population": "population_1980",
        "1970 Population": "population_1970",
        "Area (km²)": "area_km2",
        "Density (per km²)": "density_per_km2",
        "Growth Rate": "growth_rate",
        "World Population Percentage": "world_population_percentage"
    }

    # Apply renaming
    df.rename(columns=rename_columns, inplace=True)

    # Save transformed data to a new CSV or overwrite the old one for loading
    transformed_path = '/opt/airflow/dags/data/world_population_transformed.csv'
    df.to_csv(transformed_path, index=False)


# Fonction de chargement dans MongoDB
def load_data():
    mongo_uri = "mongodb+srv://airflow:airflow@airflow.6pc0m.mongodb.net/"
    # mongo_uri = "mongodb+srv://airflow:airflow@airflow.6pc0m.mongodb.net/miniprojet"
    if mongo_uri is None:
        raise ValueError("MONGO_URI n'est pas défini dans les variables d'environnement")
    
    # Connexion à MongoDB
    client = pymongo.MongoClient(mongo_uri)
    db = client["miniprojet"]
    collection = db["data_transformed"]

    # Charger les données transformées
    # df = pd.read_csv('/opt/airflow/dags/data/world_population.csv')
    # data_dict = df.to_dict("records")
    transformed_path = '/opt/airflow/dags/data/world_population_transformed.csv'
    df = pd.read_csv(transformed_path)
    data_dict = df.to_dict("records")

    # Insérer les données dans MongoDB
    collection.delete_many({})  # Supprime les anciennes données (optionnel)
    collection.insert_many(data_dict)

# Définition du DAG
default_args = {
    'start_date': datetime(2024, 11, 8),
}

with DAG('csv_etl_dag', default_args=default_args, schedule_interval='@daily', catchup=False) as dag:

    # Tâche d'extraction
    extract_task = PythonOperator(
        task_id='extract_csv',
        python_callable=extract_csv
    )

    # Tâche de transformation
    transform_task = PythonOperator(
        task_id='transform_data',
        python_callable=transform_data
    )

    # Tâche de chargement
    load_task = PythonOperator(
        task_id='load_data',
        python_callable=load_data
    )

    # Définition de l'ordre d'exécution des tâches
    extract_task >> transform_task >> load_task
