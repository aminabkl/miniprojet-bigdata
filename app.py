from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime
import pandas as pd
import sqlalchemy

# Fonction pour lire le fichier CSV
def extract_csv():
    df = pd.read_csv('/opt/airflow/dags/data/world_population.csv')
    # df.to_csv('/opt/airflow/dags/data/extracted_data.csv', index=False)

# Fonction de transformation
def transform_data():
    df = pd.read_csv('/opt/airflow/dags/data/world_population.csv')
    # df['new_column'] = df['existing_column'] * 2  # Exemple de transformation
    # df.to_csv('/opt/airflow/dags/data/transformed_data.csv', index=False)

# Fonction de chargement
def load_data():
    engine = sqlalchemy.create_engine('postgresql+psycopg2://airflow:airflow@postgres/airflow')
    df = pd.read_csv('/opt/airflow/dags/data/world_population.csv')
    df.to_sql('final_table', engine, if_exists='replace', index=False)

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
