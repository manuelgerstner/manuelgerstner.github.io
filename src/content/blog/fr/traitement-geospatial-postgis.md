---
title: "Traitement Géospatial Pratique avec PostGIS"
description: "Un guide pratique pour ingérer, transformer et interroger des jeux de données spatiaux — des shapefiles au GeoJSON prêt pour le web — avec PostGIS et Python."
pubDate: 2024-08-20
lang: fr
---

Les données géospatiales sont omniprésentes dans les systèmes de données de développement : limites administratives, points GPS d'enquêtes ménages, localisations d'infrastructures, cartes d'occupation des sols. Les mettre sous une forme interrogeable et fiable est une discipline d'ingénierie à part entière, à l'intersection du SIG, des bases de données et du développement backend.

Cet article couvre les patterns pratiques que j'ai consolidés après avoir travaillé avec des shapefiles, des services WMS et PostGIS sur plusieurs projets.

## Ingérer des Shapefiles

Les shapefiles restent le format d'échange le plus courant malgré leur âge. Le chemin le plus rapide vers PostGIS est `shp2pgsql`, l'outil en ligne de commande fourni avec PostGIS :

```bash
shp2pgsql -s 4326 -I limites.shp public.limites | psql -U postgres -d mabase
```

Options importantes :
- `-s 4326` déclare le SRID source (WGS84 lat/lng est presque toujours le bon choix)
- `-I` crée automatiquement un index spatial

Pour l'ingestion programmatique depuis Python, `geopandas` + `sqlalchemy` est l'approche la plus propre :

```python
import geopandas as gpd
from sqlalchemy import create_engine

gdf = gpd.read_file("limites.shp")
engine = create_engine("postgresql://postgres:motdepasse@localhost/mabase")
gdf.to_postgis("limites", engine, if_exists="replace", index=False)
```

## Opérations Clés de PostGIS

Une fois les données dans PostGIS, les fonctions SQL spatiales ouvrent de nombreuses possibilités.

**Intersection et containment** — trouver dans quel district se trouve un point GPS :

```sql
SELECT d.nom
FROM districts d, points_enquete p
WHERE ST_Contains(d.geom, p.geom)
  AND p.id = 42;
```

**Buffer** — identifier toutes les installations dans un rayon de 5 km d'un lieu :

```sql
SELECT f.nom
FROM installations f
WHERE ST_DWithin(
  f.geom::geography,
  ST_SetSRID(ST_Point(18.42, -33.92), 4326)::geography,
  5000
);
```

Utiliser `::geography` plutôt que `::geometry` donne des calculs de distance précis en mètres partout dans le monde, pas seulement près de l'équateur.

**Calcul de superficie** :

```sql
SELECT nom, ST_Area(geom::geography) / 1e6 AS superficie_km2
FROM districts;
```

## Servir des Données Spatiales au Frontend

Leaflet attend du GeoJSON. PostGIS peut le générer directement :

```sql
SELECT json_build_object(
  'type', 'FeatureCollection',
  'features', json_agg(ST_AsGeoJSON(t.*)::json)
) FROM (
  SELECT nom, geom FROM districts WHERE pays = 'ZA'
) t;
```

Exposez cela via un simple endpoint REST et vous disposez d'une API prête pour les cartes, sans conversion de format intermédiaire.

## Interopérabilité avec les Standards

Pour les projets devant se conformer aux standards OGC (courant dans les travaux financés par l'UE), les mêmes données PostGIS peuvent être servies via GeoServer en WMS/WFS sans aucune modification de schéma. La combinaison PostGIS pour le stockage et GeoServer pour la diffusion conforme aux standards couvre la plupart des exigences institutionnelles.

---

L'ingénierie géospatiale ne nécessite pas de logiciel SIG spécialisé pour la plupart des cas d'usage de plateformes web. PostGIS, un peu de Python et un frontend Leaflet permettent d'aller remarquablement loin.
