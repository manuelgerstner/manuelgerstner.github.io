---
title: "Building Data-Intensive Platforms for International Development"
description: "Lessons from designing scalable monitoring systems and data pipelines across Africa, Eastern Europe, and ASEAN with GIZ and partner organisations."
pubDate: 2024-11-10
lang: en
---

Working on data platforms for international development organisations is unlike most enterprise software projects. The technical challenges are real — scalability, geospatial complexity, field connectivity — but the non-technical constraints are just as demanding: multi-stakeholder governance, capacity constraints in the field, and data standards set by bodies like the OGC or the EU.

## The Core Challenge: Diverse Data, Diverse Contexts

Across projects in Sub-Saharan Africa, Eastern Europe, and ASEAN, I have seen a common pattern: each implementing partner collects data differently, in different formats, at different granularities. The platform must reconcile all of this while remaining usable by non-technical staff in the field.

The approach that consistently works is a **modular ingestion layer**. Instead of one rigid schema, you build small, composable adapters — one per data source or partner — that normalise data before it enters a shared PostgreSQL core. PostGIS extensions handle the spatial dimensions: district boundaries, GPS tracks from mobile data collection apps, shapefiles from national statistics offices.

## Lessons on Architecture

**Start with the reporting requirements.** Monitoring frameworks for development projects are defined upfront by donors (GIZ, EU, Bread for the World). If your data model does not map naturally to their indicator definitions, you will be building complex transformation logic forever. Get the M&E team in the room on day one.

**Use content-negotiated REST APIs.** When the same endpoint serves both a Leaflet map in a browser and an automated ETL job, accept/content-type headers let you serve GeoJSON and JSON from the same route. This keeps the API surface small and the client code clean.

**PostgreSQL with PostGIS is the right default.** Spatial extensions, JSONB columns for semi-structured data, and robust replication make it the most versatile foundation I have used. The temptation to reach for a specialised geospatial store is usually premature.

## Mobile Data Collection

Many monitoring programs involve field officers who collect data in areas with poor connectivity. The pipeline needs to handle:

- **Offline-first mobile apps** that queue submissions locally and sync when online
- **Conflict resolution** when the same indicator is updated from two field devices before sync
- **Photo and document attachments** — binary payloads that need separate storage with metadata references in the DB

The approach I have settled on: a simple sync protocol based on logical timestamps, an S3-compatible object store for attachments, and explicit merge semantics defined in the data model (last-write-wins for most fields, append-only for audit logs).

## AI-Assisted Reporting

On a more recent project, we integrated Azure OpenAI into a compliance workflow. Field staff submit structured data; the platform generates draft narrative reports aligned to donor templates. The LLM does the prose; humans review and sign off.

The key insight: keep the LLM at the edges of the workflow. It is good at summarising structured data into natural language. It is not a reliable data processor. All aggregation and validation happens in PostgreSQL before anything touches the LLM.

---

These are patterns I return to repeatedly. If you are building in this space and want to compare notes, reach out.
