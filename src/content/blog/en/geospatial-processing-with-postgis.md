---
title: "Practical Geospatial Processing with PostGIS"
description: "A working guide to ingesting, transforming, and querying spatial datasets — from shapefiles to web-ready GeoJSON — using PostGIS and Python."
pubDate: 2024-08-20
lang: en
---

Geospatial data is everywhere in development data systems: administrative boundaries, household survey GPS points, infrastructure locations, land-use maps. Getting it into a queryable, reliable form is a distinct engineering discipline that sits at the overlap of GIS, databases, and backend development.

This post covers the practical patterns I have converged on after working with shapefiles, WMS services, and PostGIS across multiple projects.

## Ingesting Shapefiles

Shapefiles remain the most common exchange format despite their age. The fastest path into PostGIS is `shp2pgsql`, the command-line tool bundled with PostGIS:

```bash
shp2pgsql -s 4326 -I boundaries.shp public.boundaries | psql -U postgres -d mydb
```

Flags to know:
- `-s 4326` declares the source SRID (WGS84 lat/lng is almost always the right default)
- `-I` creates a spatial index automatically

For programmatic ingestion from Python, `geopandas` + `sqlalchemy` is the cleanest path:

```python
import geopandas as gpd
from sqlalchemy import create_engine

gdf = gpd.read_file("boundaries.shp")
engine = create_engine("postgresql://postgres:pass@localhost/mydb")
gdf.to_postgis("boundaries", engine, if_exists="replace", index=False)
```

## Key PostGIS Operations

Once data is in PostGIS, the spatial SQL functions unlock serious capability:

**Intersection and containment** — finding which district a GPS point falls in:

```sql
SELECT d.name
FROM districts d, survey_points p
WHERE ST_Contains(d.geom, p.geom)
  AND p.id = 42;
```

**Buffering** — identifying all facilities within 5 km of a location:

```sql
SELECT f.name
FROM facilities f
WHERE ST_DWithin(
  f.geom::geography,
  ST_SetSRID(ST_Point(18.42, -33.92), 4326)::geography,
  5000
);
```

Using `::geography` instead of `::geometry` gives you metre-accurate distance calculations globally, not just near the equator.

**Area calculation**:

```sql
SELECT name, ST_Area(geom::geography) / 1e6 AS area_km2
FROM districts;
```

## Serving Spatial Data to the Frontend

Leaflet expects GeoJSON. PostGIS can generate it directly:

```sql
SELECT json_build_object(
  'type', 'FeatureCollection',
  'features', json_agg(ST_AsGeoJSON(t.*)::json)
) FROM (
  SELECT name, geom FROM districts WHERE country = 'ZA'
) t;
```

Expose this via a simple REST endpoint and you have a map-ready API with no intermediate format conversion.

## Standards Interoperability

For projects that need to comply with OGC standards (common in EU-funded work), the same PostGIS data can be served through GeoServer as WMS/WFS without any schema changes. The combination of PostGIS for storage and GeoServer for standards-compliant serving covers most institutional requirements.

---

Geospatial engineering does not require specialised GIS software for most web platform use cases. PostGIS, a bit of Python, and a Leaflet frontend get you remarkably far.
