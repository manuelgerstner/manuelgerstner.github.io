---
title: "Datenintensive Plattformen für internationale Entwicklungsprojekte"
description: "Erfahrungen aus dem Aufbau skalierbarer Monitoring-Systeme und Datenpipelines in Afrika, Osteuropa und ASEAN – gemeinsam mit GIZ und Partnerorganisationen."
pubDate: 2024-11-10
lang: de
---

Die Arbeit an Datenplattformen für internationale Entwicklungsorganisationen unterscheidet sich grundlegend von typischen Enterprise-Softwareprojekten. Die technischen Herausforderungen sind real – Skalierbarkeit, Geospatialität, Konnektivität im Feld – aber die nicht-technischen Rahmenbedingungen sind mindestens genauso anspruchsvoll: Mehrstakeholder-Governance, eingeschränkte Kapazitäten im Feld und Datenstandards von Organisationen wie OGC oder der EU.

## Die Kernherausforderung: Heterogene Daten, heterogene Kontexte

In Projekten in Subsahara-Afrika, Osteuropa und ASEAN habe ich immer wieder dasselbe Muster beobachtet: Jeder Implementierungspartner erfasst Daten auf seine eigene Weise – in unterschiedlichen Formaten, mit unterschiedlicher Granularität. Die Plattform muss all das zusammenführen und dabei für nicht-technisches Personal im Feld bedienbar bleiben.

Der Ansatz, der zuverlässig funktioniert, ist eine **modulare Ingestionsschicht**. Statt eines starren Schemas baut man kleine, kompositionierbare Adapter – einen pro Datenquelle oder Partner – die Daten normalisieren, bevor sie in einen gemeinsamen PostgreSQL-Kern einlaufen. PostGIS-Erweiterungen übernehmen die räumliche Dimension: Distriktgrenzen, GPS-Tracks aus mobilen Datenerfassungs-Apps, Shapefiles von nationalen Statistikbehörden.

## Architektonische Erkenntnisse

**Mit den Reporting-Anforderungen beginnen.** Monitoring-Frameworks werden von Gebern (GIZ, EU, Brot für die Welt) vorab definiert. Wenn das Datenmodell nicht natürlich auf deren Indikatorendefinitionen abbildet, entsteht dauerhaft aufwändige Transformationslogik. Das M&E-Team muss von Tag eins am Tisch sitzen.

**Content-negotiated REST APIs nutzen.** Wenn derselbe Endpunkt sowohl eine Leaflet-Karte im Browser als auch einen automatisierten ETL-Job bedient, erlauben Accept/Content-Type-Header die Auslieferung von GeoJSON und JSON über dieselbe Route. Das hält die API-Oberfläche klein und den Client-Code übersichtlich.

**PostgreSQL mit PostGIS als Standard.** Räumliche Erweiterungen, JSONB-Spalten für semi-strukturierte Daten und robuste Replikation machen es zum vielseitigsten Fundament, das ich kenne. Der Griff zu einem spezialisierten Geospatial-Store ist meist verfrüht.

## Mobile Datenerfassung

Viele Monitoring-Programme umfassen Feldbetreuer, die in Gebieten mit schlechter Konnektivität Daten erheben. Die Pipeline muss folgendes bewältigen:

- **Offline-first-Apps**, die Eingaben lokal puffern und bei Verbindung synchronisieren
- **Konfliktauflösung**, wenn dieselbe Kennzahl von zwei Feldgeräten vor der Synchronisation aktualisiert wird
- **Foto- und Dokumentanhänge** – Binärpayloads, die separaten Speicher mit Metadaten-Referenzen in der DB benötigen

Bewährter Ansatz: ein einfaches Sync-Protokoll auf Basis logischer Zeitstempel, ein S3-kompatibler Objektspeicher für Anhänge und explizite Merge-Semantik im Datenmodell.

## KI-gestützte Berichterstattung

In einem neueren Projekt haben wir Azure OpenAI in einen Compliance-Workflow integriert. Feldmitarbeiter übermitteln strukturierte Daten; die Plattform generiert Entwürfe für Narrativberichte nach Geber-Vorlagen. Das LLM übernimmt die Prosa; Menschen prüfen und zeichnen ab.

Entscheidende Erkenntnis: Das LLM an die Ränder des Workflows verbannen. Es ist gut darin, strukturierte Daten in natürliche Sprache zu übersetzen. Es ist kein zuverlässiger Datenprozessor. Alle Aggregationen und Validierungen finden in PostgreSQL statt, bevor irgendetwas das LLM berührt.
