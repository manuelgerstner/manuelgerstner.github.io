---
title: "Construindo Plataformas de Dados para o Desenvolvimento Internacional"
description: "Experiências no design de sistemas de monitoramento escaláveis e pipelines de dados na África, Europa Oriental e ASEAN com a GIZ e organizações parceiras."
pubDate: 2024-11-10
lang: pt
---

Trabalhar em plataformas de dados para organizações de desenvolvimento internacional é diferente da maioria dos projetos de software empresarial. Os desafios técnicos são reais — escalabilidade, complexidade geoespacial, conectividade de campo — mas as restrições não técnicas são igualmente exigentes: governança com múltiplos stakeholders, limitações de capacidade no campo e padrões de dados definidos por organismos como OGC ou a UE.

## O Desafio Central: Dados Diversos, Contextos Diversos

Em projetos na África Subsaariana, Europa Oriental e ASEAN, observei um padrão comum: cada parceiro implementador coleta dados de forma diferente, em formatos diferentes, com granularidades diferentes. A plataforma precisa reconciliar tudo isso enquanto permanece utilizável por equipe não técnica no campo.

A abordagem que funciona consistentemente é uma **camada de ingestão modular**. Em vez de um esquema rígido, você constrói pequenos adaptadores compostos — um por fonte de dados ou parceiro — que normalizam os dados antes de entrarem em um núcleo PostgreSQL compartilhado. Extensões PostGIS lidam com as dimensões espaciais: limites distritais, trilhas GPS de aplicações móveis de coleta de dados, shapefiles de institutos nacionais de estatística.

## Lições sobre Arquitetura

**Comece pelos requisitos de relatório.** Os frameworks de monitoramento para projetos de desenvolvimento são definidos antecipadamente pelos doadores (GIZ, UE, Pão para o Mundo). Se o seu modelo de dados não mapeia naturalmente para suas definições de indicadores, você estará construindo lógica de transformação complexa para sempre. Inclua a equipe de M&A desde o primeiro dia.

**Use APIs REST com negociação de conteúdo.** Quando o mesmo endpoint serve tanto um mapa Leaflet no navegador quanto um job ETL automatizado, os cabeçalhos accept/content-type permitem servir GeoJSON e JSON pela mesma rota. Isso mantém a superfície da API pequena e o código do cliente limpo.

**PostgreSQL com PostGIS é o padrão correto.** Extensões espaciais, colunas JSONB para dados semi-estruturados e replicação robusta fazem dele a fundação mais versátil que já usei. A tentação de recorrer a um armazenamento geoespacial especializado geralmente é prematura.

## Coleta de Dados Móvel

Muitos programas de monitoramento envolvem agentes de campo que coletam dados em áreas com conectividade precária. O pipeline precisa lidar com:

- **Aplicativos offline-first** que enfileiram envios localmente e sincronizam quando online
- **Resolução de conflitos** quando o mesmo indicador é atualizado por dois dispositivos de campo antes da sincronização
- **Fotos e documentos anexos** — payloads binários que precisam de armazenamento separado com referências de metadados no banco de dados

A abordagem que adotei: um protocolo de sincronização simples baseado em timestamps lógicos, um armazenamento de objetos compatível com S3 para anexos e semântica de merge explícita definida no modelo de dados.

## Relatórios Assistidos por IA

Em um projeto mais recente, integramos Azure OpenAI em um fluxo de conformidade. A equipe de campo envia dados estruturados; a plataforma gera rascunhos de relatórios narrativos alinhados aos modelos dos doadores. O LLM faz a prosa; humanos revisam e aprovam.

A percepção principal: manter o LLM nas bordas do fluxo de trabalho. Ele é bom em resumir dados estruturados em linguagem natural. Não é um processador de dados confiável. Toda a agregação e validação acontece no PostgreSQL antes de qualquer coisa tocar o LLM.
