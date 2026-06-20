---
title: "Geospatiale Datenverarbeitung mit PostGIS in der Praxis"
description: "Ein praxisorientierter Leitfaden zum Ingestieren, Transformieren und Abfragen räumlicher Datensätze – von Shapefiles bis webfertigem GeoJSON – mit PostGIS und Python."
pubDate: 2024-08-20
lang: de
---

Geodaten sind in Entwicklungs-Datensystemen allgegenwärtig: Verwaltungsgrenzen, GPS-Punkte aus Haushaltserhebungen, Infrastrukturstandorte, Landnutzungskarten. Sie in eine abfragbare, verlässliche Form zu bringen ist eine eigenständige Ingenieursdisziplin, die an der Schnittstelle von GIS, Datenbanken und Backend-Entwicklung liegt.

Dieser Beitrag beschreibt die praktischen Muster, auf die ich mich nach der Arbeit mit Shapefiles, WMS-Diensten und PostGIS in mehreren Projekten eingependelt habe.

## Shapefiles ingestieren

Shapefiles sind trotz ihres Alters das verbreitetste Austauschformat. Der schnellste Weg in PostGIS ist `shp2pgsql`, das mit PostGIS mitgelieferte Kommandozeilenwerkzeug:

```bash
shp2pgsql -s 4326 -I grenzen.shp public.grenzen | psql -U postgres -d meinedb
```

Wichtige Flags:
- `-s 4326` deklariert das Quell-SRID (WGS84 Lat/Lng ist fast immer der richtige Standard)
- `-I` erstellt automatisch einen räumlichen Index

Für die programmatische Ingestion aus Python ist `geopandas` + `sqlalchemy` der sauberste Weg:

```python
import geopandas as gpd
from sqlalchemy import create_engine

gdf = gpd.read_file("grenzen.shp")
engine = create_engine("postgresql://postgres:pass@localhost/meinedb")
gdf.to_postgis("grenzen", engine, if_exists="replace", index=False)
```

## Wichtige PostGIS-Operationen

Sobald Daten in PostGIS vorliegen, eröffnen die räumlichen SQL-Funktionen mächtige Möglichkeiten.

**Schnittmenge und Enthaltensein** – in welchem Distrikt liegt ein GPS-Punkt:

```sql
SELECT d.name
FROM distrikte d, erhebungspunkte p
WHERE ST_Contains(d.geom, p.geom)
  AND p.id = 42;
```

**Puffer** – alle Einrichtungen innerhalb von 5 km eines Standorts:

```sql
SELECT f.name
FROM einrichtungen f
WHERE ST_DWithin(
  f.geom::geography,
  ST_SetSRID(ST_Point(18.42, -33.92), 4326)::geography,
  5000
);
```

`::geography` statt `::geometry` liefert metergenaue Entfernungsberechnungen weltweit.

## Geodaten für das Frontend aufbereiten

Leaflet erwartet GeoJSON. PostGIS kann es direkt erzeugen:

```sql
SELECT json_build_object(
  'type', 'FeatureCollection',
  'features', json_agg(ST_AsGeoJSON(t.*)::json)
) FROM (
  SELECT name, geom FROM distrikte WHERE land = 'ZA'
) t;
```

Das als REST-Endpunkt exponiert ergibt eine kartenfertige API ohne Zwischenformat-Konvertierung.

## Standardkonformität

Für Projekte, die OGC-Standards einhalten müssen (üblich bei EU-finanzierten Vorhaben), können dieselben PostGIS-Daten über GeoServer als WMS/WFS bereitgestellt werden – ohne Schema-Änderungen. Die Kombination aus PostGIS für die Speicherung und GeoServer für standardkonforme Bereitstellung deckt die meisten institutionellen Anforderungen ab.
