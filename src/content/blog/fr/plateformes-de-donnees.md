---
title: "Construire des Plateformes de Données pour le Développement International"
description: "Retours d'expérience sur la conception de systèmes de suivi évolutifs et de pipelines de données en Afrique, en Europe de l'Est et en ASEAN avec la GIZ et des organisations partenaires."
pubDate: 2024-11-10
lang: fr
---

Travailler sur des plateformes de données pour des organisations de développement international est très différent de la plupart des projets logiciels en entreprise. Les défis techniques sont bien réels — scalabilité, complexité géospatiale, connectivité sur le terrain — mais les contraintes non techniques sont tout aussi exigeantes : gouvernance multi-parties prenantes, capacités limitées sur le terrain, et standards de données définis par des organismes tels que l'OGC ou l'UE.

## Le Défi Central : Des Données Diverses, Des Contextes Divers

Sur des projets en Afrique subsaharienne, en Europe de l'Est et en ASEAN, j'ai observé un schéma récurrent : chaque partenaire de mise en œuvre collecte les données différemment, dans des formats différents, à des granularités différentes. La plateforme doit réconcilier tout cela tout en restant utilisable par du personnel non technique sur le terrain.

L'approche qui fonctionne systématiquement est une **couche d'ingestion modulaire**. Plutôt qu'un schéma rigide unique, on construit de petits adaptateurs composables — un par source de données ou partenaire — qui normalisent les données avant qu'elles n'entrent dans un cœur PostgreSQL partagé. Les extensions PostGIS gèrent les dimensions spatiales : limites de districts, traces GPS issues d'applications mobiles de collecte, shapefiles d'instituts nationaux de statistique.

## Leçons d'Architecture

**Commencer par les besoins de reporting.** Les cadres de suivi-évaluation pour les projets de développement sont définis en amont par les bailleurs (GIZ, UE, Pain pour le Monde). Si votre modèle de données ne correspond pas naturellement à leurs définitions d'indicateurs, vous passerez votre temps à construire de la logique de transformation complexe. Intégrez l'équipe S&E dès le premier jour.

**Utiliser des API REST avec négociation de contenu.** Quand le même endpoint sert à la fois une carte Leaflet dans un navigateur et un job ETL automatisé, les en-têtes accept/content-type permettent de servir GeoJSON et JSON depuis la même route. Cela maintient la surface d'API réduite et le code client propre.

**PostgreSQL avec PostGIS est le bon choix par défaut.** Les extensions spatiales, les colonnes JSONB pour les données semi-structurées et la réplication robuste en font la base la plus polyvalente que j'aie utilisée. La tentation de recourir à un stockage géospatial spécialisé est généralement prématurée.

## Collecte de Données Mobiles

De nombreux programmes de suivi font intervenir des agents de terrain qui collectent des données dans des zones à faible connectivité. Le pipeline doit gérer :

- **Des applications mobiles offline-first** qui mettent en file d'attente les soumissions localement et synchronisent quand une connexion est disponible
- **La résolution de conflits** quand le même indicateur est mis à jour depuis deux appareils de terrain avant la synchronisation
- **Les pièces jointes photos et documents** — des payloads binaires nécessitant un stockage séparé avec des références de métadonnées dans la base de données

L'approche que j'ai retenue : un protocole de synchronisation simple basé sur des timestamps logiques, un stockage d'objets compatible S3 pour les pièces jointes, et une sémantique de fusion explicite définie dans le modèle de données.

## Rapports Assistés par l'IA

Sur un projet récent, nous avons intégré Azure OpenAI dans un flux de conformité. Les agents de terrain soumettent des données structurées ; la plateforme génère des ébauches de rapports narratifs alignés sur les modèles des bailleurs. Le LLM produit la prose ; les humains relisent et valident.

L'enseignement clé : maintenir le LLM en périphérie du flux de travail. Il excelle à résumer des données structurées en langage naturel. Ce n'est pas un processeur de données fiable. Toute l'agrégation et la validation s'effectuent dans PostgreSQL avant que quoi que ce soit ne touche le LLM.

---

Ce sont des patterns auxquels je reviens régulièrement. Si vous travaillez dans cet espace et souhaitez échanger, n'hésitez pas à me contacter.
