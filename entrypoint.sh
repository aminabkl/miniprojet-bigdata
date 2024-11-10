#!/bin/bash

# Vérifier si la base de données est initialisée
if [ "$1" = "webserver" ] || [ "$1" = "scheduler" ]; then
    echo "Attente de l'initialisation de la base de données..."
    while ! [ -f "/opt/airflow/airflow.db" ]; do
        sleep 1
    done
    echo "Base de données détectée, démarrage de $1..."
fi

# Exécuter la commande originale
exec airflow "$@"