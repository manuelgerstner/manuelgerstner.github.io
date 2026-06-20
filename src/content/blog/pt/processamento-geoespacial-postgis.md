---
title: "Processamento Geoespacial Prático com PostGIS"
description: "Um guia prático para ingerir, transformar e consultar datasets espaciais — de shapefiles a GeoJSON pronto para web — usando PostGIS e Python."
pubDate: 2024-08-20
lang: pt
---

Dados geoespaciais estão em toda parte em sistemas de dados de desenvolvimento: limites administrativos, pontos GPS de pesquisas domiciliares, localizações de infraestrutura, mapas de uso do solo. Colocá-los em uma forma consultável e confiável é uma disciplina de engenharia específica que se situa na interseção de GIS, bancos de dados e desenvolvimento backend.

Este post cobre os padrões práticos que consolidei após trabalhar com shapefiles, serviços WMS e PostGIS em múltiplos projetos.

## Ingerindo Shapefiles

Shapefiles permanecem o formato de intercâmbio mais comum apesar de sua idade. O caminho mais rápido para o PostGIS é o `shp2pgsql`, a ferramenta de linha de comando incluída no PostGIS:

```bash
shp2pgsql -s 4326 -I limites.shp public.limites | psql -U postgres -d meubanco
```

Flags importantes:
- `-s 4326` declara o SRID de origem (WGS84 lat/lng é quase sempre o padrão correto)
- `-I` cria um índice espacial automaticamente

Para ingestão programática a partir de Python, `geopandas` + `sqlalchemy` é o caminho mais limpo:

```python
import geopandas as gpd
from sqlalchemy import create_engine

gdf = gpd.read_file("limites.shp")
engine = create_engine("postgresql://postgres:senha@localhost/meubanco")
gdf.to_postgis("limites", engine, if_exists="replace", index=False)
```

## Operações Chave do PostGIS

Uma vez que os dados estão no PostGIS, as funções SQL espaciais desbloqueiam grande capacidade.

**Interseção e contenção** — encontrando em qual distrito um ponto GPS se encontra:

```sql
SELECT d.nome
FROM distritos d, pontos_pesquisa p
WHERE ST_Contains(d.geom, p.geom)
  AND p.id = 42;
```

**Buffer** — identificando todas as instalações a 5 km de um local:

```sql
SELECT f.nome
FROM instalacoes f
WHERE ST_DWithin(
  f.geom::geography,
  ST_SetSRID(ST_Point(18.42, -33.92), 4326)::geography,
  5000
);
```

Usar `::geography` em vez de `::geometry` fornece cálculos de distância precisos em metros globalmente.

## Servindo Dados Espaciais para o Frontend

O Leaflet espera GeoJSON. O PostGIS pode gerá-lo diretamente:

```sql
SELECT json_build_object(
  'type', 'FeatureCollection',
  'features', json_agg(ST_AsGeoJSON(t.*)::json)
) FROM (
  SELECT nome, geom FROM distritos WHERE pais = 'ZA'
) t;
```

Exponha isso via um endpoint REST simples e você terá uma API pronta para mapas sem nenhuma conversão de formato intermediário.

## Interoperabilidade com Padrões

Para projetos que precisam cumprir padrões OGC (comum em trabalhos financiados pela UE), os mesmos dados PostGIS podem ser servidos através do GeoServer como WMS/WFS sem nenhuma alteração de esquema. A combinação de PostGIS para armazenamento e GeoServer para servir conforme padrões cobre a maioria dos requisitos institucionais.
