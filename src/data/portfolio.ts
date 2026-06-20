import type { Lang } from '../i18n/translations';

interface SkillGroup {
  category: string;
  items: string[];
}

interface ExperienceEntry {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
}

interface EducationEntry {
  degree: string;
  institution: string;
  period: string;
}

interface ProjectEntry {
  name: string;
  description: string;
  url: string;
  badge: string;
}

interface PortfolioData {
  profile: string;
  skills: SkillGroup[];
  experience: ExperienceEntry[];
  education: EducationEntry[];
  certifications: string[];
  techStack: string;
  projects: ProjectEntry[];
}

export const portfolioData: Record<Lang, PortfolioData> = {
  en: {
    profile:
      'Software Engineer and Cloud Architect specializing in data-intensive web systems, geospatial data processing, and AI-enabled platforms. Proven experience designing scalable backend architectures — including geospatial data pipelines and standards-aligned APIs — across international development projects (GIZ, EU, CRS). Strong background in Linux-based deployments, DevOps, and AI integration with a focus on interoperability, modular systems, and data-driven decision-making.',
    skills: [
      { category: 'Web Development', items: ['Spring Boot', 'Django', 'Ruby on Rails', 'REST APIs', 'Modular architectures'] },
      { category: 'Geospatial', items: ['PostGIS', 'Spatial data processing', 'Shapefiles', 'OGC / WMS / WFS / WMTS'] },
      { category: 'Data & APIs', items: ['Interoperable API design', 'JSON / XML', 'Structured data systems'] },
      { category: 'AI Integration', items: ['LLM APIs', 'Azure OpenAI', 'OpenWebUI', 'Automated text generation'] },
      { category: 'Web GIS', items: ['Leaflet', 'Map-based visualization'] },
      { category: 'Infrastructure', items: ['Linux', 'Docker', 'AWS', 'Terraform', 'CI/CD', 'CloudFormation', 'ECS'] },
    ],
    experience: [
      {
        role: 'Software Developer / Cloud Architect',
        company: 'FAKT GmbH / GOPA / GIZ / Bread for the World',
        location: 'Germany (remote)',
        period: 'May 2020 – present',
        bullets: [
          'Designed and implemented data-driven web platforms and monitoring systems (PostgreSQL) across multiple international development projects in Africa, Eastern Europe, and ASEAN',
          'Developed geospatial data processing capabilities, including ingestion and processing of spatial datasets (e.g. shapefiles)',
          'Built data collection pipelines and mobile applications enabling field data acquisition and synchronization',
          'Designed interactive dashboards and analytics tools supporting program monitoring and decision-making',
          'Implemented modular backend architectures and APIs for extensibility and interoperability',
          'Led requirements engineering and product ownership, coordinating distributed development teams',
          'Deployed and maintained applications in Linux-based cloud environments',
          'Developed and integrated an AI-powered platform (OpenWebUI + Azure OpenAI) for compliance workflows, enabling automated text generation and intelligent assistance',
        ],
      },
      {
        role: 'Software Developer / Cloud Architect',
        company: 'eeMobility GmbH',
        location: 'Munich, Germany',
        period: 'July 2018 – May 2020',
        bullets: [
          'Designed and implemented a scalable microservices architecture with multiple PostgreSQL databases',
          'Developed API-driven backend systems emphasizing modularity and interoperability',
          'Migrated infrastructure to AWS (CloudFormation, ECS), improving scalability and reliability',
          'Contributed to building a high-performance platform in the electric mobility sector',
        ],
      },
      {
        role: 'IT Consultant / Software Developer',
        company: 'Netlight Consulting',
        location: 'Munich, Germany',
        period: 'Feb 2015 – May 2018',
        bullets: [
          'Developed backend systems and platforms for enterprise clients in distributed architectures',
          'Built and maintained microservices-based systems for mobility and digital platforms',
          'Led technical design and product ownership activities in agile teams',
          'Integrated external systems and services into high-volume production environments',
        ],
      },
      {
        role: 'Earlier Experience',
        company: 'Payback GmbH · IBM (USA)',
        location: '',
        period: '',
        bullets: [
          'Software Developer (Working Student) at Payback GmbH',
          'Software Developer Intern at IBM (USA)',
        ],
      },
    ],
    education: [
      {
        degree: 'Master of Science, Information Systems',
        institution: 'Technical University of Munich',
        period: '2012 – 2014',
      },
      {
        degree: 'Bachelor of Science, Information Systems',
        institution: 'Technical University of Munich',
        period: '2008 – 2012',
      },
    ],
    certifications: ['IBM Certified Database Administrator', 'IBM Certified Database Associate'],
    techStack:
      'Java · Spring Boot · Python · Django · Ruby on Rails · PostgreSQL · SQL · AWS · Terraform · Docker · REST · Git · Linux · ElasticSearch · Node.js · React · Android (Kotlin)',
    projects: [
      {
        name: 'xingen.de',
        description: 'Proprietary e-invoicing platform for standards-compliant electronic invoice generation and processing (XRechnung / ZUGFeRD), built for the German market.',
        url: 'https://xingen.de',
        badge: 'Proprietary',
      },
      {
        name: 'nko-nto',
        description: 'Open-source multi-currency accounting tool designed for NGOs and international organizations operating across multiple currencies and fiscal contexts.',
        url: 'https://github.com/manuelgerstner/nko-nto',
        badge: 'Open Source',
      },
    ],
  },

  de: {
    profile:
      'Software-Entwickler und Cloud-Architekt, spezialisiert auf datenintensive Websysteme, geospatiale Datenverarbeitung und KI-gestützte Plattformen. Nachgewiesene Erfahrung im Entwurf skalierbarer Backend-Architekturen — einschließlich geospatialer Datenpipelines und standardkonformer APIs — für internationale Entwicklungsprojekte (GIZ, EU, CRS). Starker Hintergrund in Linux-basierten Deployments, DevOps und KI-Integration, mit Fokus auf Interoperabilität, modulare Systeme und datengesteuerte Entscheidungsfindung.',
    skills: [
      { category: 'Web-Entwicklung', items: ['Spring Boot', 'Django', 'Ruby on Rails', 'REST APIs', 'Modulare Architekturen'] },
      { category: 'Geospatial', items: ['PostGIS', 'Räumliche Datenverarbeitung', 'Shapefiles', 'OGC / WMS / WFS / WMTS'] },
      { category: 'Daten & APIs', items: ['Interoperables API-Design', 'JSON / XML', 'Strukturierte Datensysteme'] },
      { category: 'KI-Integration', items: ['LLM APIs', 'Azure OpenAI', 'OpenWebUI', 'Automatisierte Textgenerierung'] },
      { category: 'Web GIS', items: ['Leaflet', 'Kartenbasierte Visualisierung'] },
      { category: 'Infrastruktur', items: ['Linux', 'Docker', 'AWS', 'Terraform', 'CI/CD', 'CloudFormation', 'ECS'] },
    ],
    experience: [
      {
        role: 'Software-Entwickler / Cloud-Architekt',
        company: 'FAKT GmbH / GOPA / GIZ / Bread for the World',
        location: 'Deutschland (remote)',
        period: 'Mai 2020 – heute',
        bullets: [
          'Entwurf und Implementierung datengesteuerter Webplattformen und Monitoring-Systeme (PostgreSQL) für internationale Entwicklungsprojekte in Afrika, Osteuropa und ASEAN',
          'Entwicklung geospatialer Datenverarbeitungsfähigkeiten, inkl. Ingestion und Verarbeitung von Geodatensätzen (z.B. Shapefiles)',
          'Aufbau von Datenerfassungs-Pipelines und mobilen Anwendungen für die Felddatenerfassung und -synchronisation',
          'Entwurf interaktiver Dashboards und Analysetools für Programm-Monitoring und Entscheidungsfindung',
          'Implementierung modularer Backend-Architekturen und APIs für Erweiterbarkeit und Interoperabilität',
          'Leitung von Requirements Engineering und Product Ownership in verteilten Entwicklungsteams',
          'Deployment und Betrieb von Anwendungen in Linux-basierten Cloud-Umgebungen',
          'Entwicklung einer KI-gestützten Plattform (OpenWebUI + Azure OpenAI) für Compliance-Workflows',
        ],
      },
      {
        role: 'Software-Entwickler / Cloud-Architekt',
        company: 'eeMobility GmbH',
        location: 'München, Deutschland',
        period: 'Juli 2018 – Mai 2020',
        bullets: [
          'Entwurf und Implementierung einer skalierbaren Microservices-Architektur mit mehreren PostgreSQL-Datenbanken',
          'Entwicklung API-gesteuerter Backend-Systeme mit Fokus auf Modularität und Interoperabilität',
          'Migration der Infrastruktur zu AWS (CloudFormation, ECS)',
          'Beitrag zum Aufbau einer hochleistungsfähigen Plattform im Bereich Elektromobilität',
        ],
      },
      {
        role: 'IT-Berater / Software-Entwickler',
        company: 'Netlight Consulting',
        location: 'München, Deutschland',
        period: 'Feb 2015 – Mai 2018',
        bullets: [
          'Entwicklung von Backend-Systemen und Plattformen für Unternehmenskunden in verteilten Architekturen',
          'Aufbau und Betrieb von Microservices-basierten Systemen für Mobilitäts- und Digitalplattformen',
          'Leitung von technischem Design und Product-Ownership-Aktivitäten in agilen Teams',
          'Integration externer Systeme und Dienste in hochvolumige Produktionsumgebungen',
        ],
      },
      {
        role: 'Frühere Erfahrungen',
        company: 'Payback GmbH · IBM (USA)',
        location: '',
        period: '',
        bullets: ['Software-Entwickler (Werkstudent) bei Payback GmbH', 'Software-Entwickler Praktikant bei IBM (USA)'],
      },
    ],
    education: [
      {
        degree: 'Master of Science, Informationssysteme',
        institution: 'Technische Universität München',
        period: '2012 – 2014',
      },
      {
        degree: 'Bachelor of Science, Informationssysteme',
        institution: 'Technische Universität München',
        period: '2008 – 2012',
      },
    ],
    certifications: ['IBM Certified Database Administrator', 'IBM Certified Database Associate'],
    techStack:
      'Java · Spring Boot · Python · Django · Ruby on Rails · PostgreSQL · SQL · AWS · Terraform · Docker · REST · Git · Linux · ElasticSearch · Node.js · React · Android (Kotlin)',
    projects: [
      {
        name: 'xingen.de',
        description: 'Proprietäre E-Invoicing-Plattform zur standardkonformen elektronischen Rechnungserstellung und -verarbeitung (XRechnung / ZUGFeRD), entwickelt für den deutschen Markt.',
        url: 'https://xingen.de',
        badge: 'Proprietär',
      },
      {
        name: 'nko-nto',
        description: 'Open-Source-Buchhaltungstool für mehrere Währungen, entwickelt für NGOs und internationale Organisationen, die in verschiedenen Währungen und Finanzkontexten operieren.',
        url: 'https://github.com/manuelgerstner/nko-nto',
        badge: 'Open Source',
      },
    ],
  },

  pt: {
    profile:
      'Engenheiro de Software e Arquiteto Cloud especializado em sistemas web intensivos em dados, processamento de dados geoespaciais e plataformas habilitadas por IA. Experiência comprovada no design de arquiteturas de backend escaláveis — incluindo pipelines de dados geoespaciais e APIs alinhadas a padrões — em projetos de desenvolvimento internacional (GIZ, EU, CRS). Sólida formação em deployments baseados em Linux, DevOps e integração de IA, com foco em interoperabilidade, sistemas modulares e tomada de decisão orientada a dados.',
    skills: [
      { category: 'Desenvolvimento Web', items: ['Spring Boot', 'Django', 'Ruby on Rails', 'REST APIs', 'Arquiteturas modulares'] },
      { category: 'Geoespacial', items: ['PostGIS', 'Processamento de dados espaciais', 'Shapefiles', 'OGC / WMS / WFS / WMTS'] },
      { category: 'Dados & APIs', items: ['Design de APIs interoperáveis', 'JSON / XML', 'Sistemas de dados estruturados'] },
      { category: 'Integração de IA', items: ['LLM APIs', 'Azure OpenAI', 'OpenWebUI', 'Geração de texto automatizada'] },
      { category: 'Web GIS', items: ['Leaflet', 'Visualização baseada em mapas'] },
      { category: 'Infraestrutura', items: ['Linux', 'Docker', 'AWS', 'Terraform', 'CI/CD', 'CloudFormation', 'ECS'] },
    ],
    experience: [
      {
        role: 'Desenvolvedor de Software / Arquiteto Cloud',
        company: 'FAKT GmbH / GOPA / GIZ / Bread for the World',
        location: 'Alemanha (remoto)',
        period: 'Maio 2020 – presente',
        bullets: [
          'Design e implementação de plataformas web orientadas a dados e sistemas de monitoramento (PostgreSQL) para projetos de desenvolvimento internacional na África, Europa Oriental e ASEAN',
          'Desenvolvimento de capacidades de processamento de dados geoespaciais, incluindo ingestão e processamento de datasets espaciais (ex: shapefiles)',
          'Construção de pipelines de coleta de dados e aplicações móveis para aquisição e sincronização de dados de campo',
          'Design de dashboards interativos e ferramentas de análise para monitoramento de programas e tomada de decisão',
          'Implementação de arquiteturas de backend modulares e APIs para extensibilidade e interoperabilidade',
          'Liderança de engenharia de requisitos e gestão de produto em equipes distribuídas',
          'Implantação e manutenção de aplicações em ambientes cloud baseados em Linux',
          'Desenvolvimento de plataforma com IA (OpenWebUI + Azure OpenAI) para fluxos de conformidade',
        ],
      },
      {
        role: 'Desenvolvedor de Software / Arquiteto Cloud',
        company: 'eeMobility GmbH',
        location: 'Munique, Alemanha',
        period: 'Julho 2018 – Maio 2020',
        bullets: [
          'Design e implementação de arquitetura de microsserviços escalável com múltiplos bancos de dados PostgreSQL',
          'Desenvolvimento de sistemas de backend orientados a API com foco em modularidade e interoperabilidade',
          'Migração de infraestrutura para AWS (CloudFormation, ECS)',
          'Contribuição para plataforma de alto desempenho no setor de mobilidade elétrica',
        ],
      },
      {
        role: 'Consultor de TI / Desenvolvedor de Software',
        company: 'Netlight Consulting',
        location: 'Munique, Alemanha',
        period: 'Fev 2015 – Maio 2018',
        bullets: [
          'Desenvolvimento de sistemas de backend e plataformas para clientes empresariais em arquiteturas distribuídas',
          'Construção e manutenção de sistemas baseados em microsserviços para plataformas de mobilidade e digital',
          'Liderança de design técnico e atividades de gestão de produto em equipes ágeis',
          'Integração de sistemas e serviços externos em ambientes de produção de alto volume',
        ],
      },
      {
        role: 'Experiências Anteriores',
        company: 'Payback GmbH · IBM (EUA)',
        location: '',
        period: '',
        bullets: [
          'Desenvolvedor de Software (Estudante Trabalhador) na Payback GmbH',
          'Estagiário de Desenvolvimento de Software na IBM (EUA)',
        ],
      },
    ],
    education: [
      {
        degree: 'Mestrado em Ciência, Sistemas de Informação',
        institution: 'Universidade Técnica de Munique',
        period: '2012 – 2014',
      },
      {
        degree: 'Bacharelado em Ciência, Sistemas de Informação',
        institution: 'Universidade Técnica de Munique',
        period: '2008 – 2012',
      },
    ],
    certifications: ['IBM Certified Database Administrator', 'IBM Certified Database Associate'],
    techStack:
      'Java · Spring Boot · Python · Django · Ruby on Rails · PostgreSQL · SQL · AWS · Terraform · Docker · REST · Git · Linux · ElasticSearch · Node.js · React · Android (Kotlin)',
    projects: [
      {
        name: 'xingen.de',
        description: 'Plataforma proprietária de faturação eletrónica para geração e processamento de faturas eletrônicas em conformidade com padrões (XRechnung / ZUGFeRD), construída para o mercado alemão.',
        url: 'https://xingen.de',
        badge: 'Proprietário',
      },
      {
        name: 'nko-nto',
        description: 'Ferramenta open-source de contabilidade multi-moeda projetada para ONGs e organizações internacionais que operam em múltiplas moedas e contextos fiscais.',
        url: 'https://github.com/manuelgerstner/nko-nto',
        badge: 'Open Source',
      },
    ],
  },

  fr: {
    profile:
      "Ingénieur Logiciel et Architecte Cloud spécialisé dans les systèmes web à forte intensité de données, le traitement de données géospatiales et les plateformes pilotées par l'IA. Expérience avérée dans la conception d'architectures backend évolutives — incluant des pipelines de données géospatiales et des API conformes aux standards — pour des projets de développement international (GIZ, UE, CRS). Solide background dans les déploiements Linux, le DevOps et l'intégration de l'IA, avec un focus sur l'interopérabilité, les systèmes modulaires et la prise de décision basée sur les données.",
    skills: [
      { category: 'Développement Web', items: ['Spring Boot', 'Django', 'Ruby on Rails', 'REST APIs', 'Architectures modulaires'] },
      { category: 'Géospatial', items: ['PostGIS', 'Traitement de données spatiales', 'Shapefiles', 'OGC / WMS / WFS / WMTS'] },
      { category: 'Données & APIs', items: ["Conception d'APIs interopérables", 'JSON / XML', 'Systèmes de données structurées'] },
      { category: 'Intégration IA', items: ['LLM APIs', 'Azure OpenAI', 'OpenWebUI', 'Génération de texte automatisée'] },
      { category: 'Web SIG', items: ['Leaflet', 'Visualisation cartographique'] },
      { category: 'Infrastructure', items: ['Linux', 'Docker', 'AWS', 'Terraform', 'CI/CD', 'CloudFormation', 'ECS'] },
    ],
    experience: [
      {
        role: 'Développeur Logiciel / Architecte Cloud',
        company: 'FAKT GmbH / GOPA / GIZ / Bread for the World',
        location: 'Allemagne (remote)',
        period: 'Mai 2020 – présent',
        bullets: [
          "Conception et implémentation de plateformes web orientées données et de systèmes de suivi (PostgreSQL) pour des projets de développement international en Afrique, Europe de l'Est et ASEAN",
          "Développement de capacités de traitement de données géospatiales, incluant l'ingestion et le traitement de jeux de données spatiaux (ex : shapefiles)",
          "Construction de pipelines de collecte de données et d'applications mobiles pour l'acquisition et la synchronisation de données terrain",
          "Conception de tableaux de bord interactifs et d'outils d'analyse pour le suivi de programmes et l'aide à la décision",
          "Implémentation d'architectures backend modulaires et d'APIs pour l'extensibilité et l'interopérabilité",
          "Direction de l'ingénierie des exigences et de la gestion de produit dans des équipes distribuées",
          "Déploiement et maintenance d'applications dans des environnements cloud Linux",
          "Développement d'une plateforme IA (OpenWebUI + Azure OpenAI) pour des flux de conformité, permettant la génération automatisée de textes",
        ],
      },
      {
        role: 'Développeur Logiciel / Architecte Cloud',
        company: 'eeMobility GmbH',
        location: 'Munich, Allemagne',
        period: 'Juillet 2018 – Mai 2020',
        bullets: [
          "Conception et implémentation d'une architecture microservices évolutive avec plusieurs bases de données PostgreSQL",
          "Développement de systèmes backend pilotés par API, avec accent sur la modularité et l'interopérabilité",
          "Migration de l'infrastructure vers AWS (CloudFormation, ECS), améliorant la scalabilité et la fiabilité",
          "Contribution à la construction d'une plateforme haute performance dans le secteur de la mobilité électrique",
        ],
      },
      {
        role: 'Consultant IT / Développeur Logiciel',
        company: 'Netlight Consulting',
        location: 'Munich, Allemagne',
        period: 'Fév 2015 – Mai 2018',
        bullets: [
          'Développement de systèmes backend et de plateformes pour des clients entreprises dans des architectures distribuées',
          'Construction et maintenance de systèmes basés sur des microservices pour des plateformes de mobilité et numériques',
          'Direction de la conception technique et des activités de gestion de produit dans des équipes agiles',
          'Intégration de systèmes et services externes dans des environnements de production à fort volume',
        ],
      },
      {
        role: 'Expériences Antérieures',
        company: 'Payback GmbH · IBM (USA)',
        location: '',
        period: '',
        bullets: [
          'Développeur Logiciel (Étudiant salarié) chez Payback GmbH',
          'Stagiaire Développeur Logiciel chez IBM (USA)',
        ],
      },
    ],
    education: [
      {
        degree: "Master of Science, Systèmes d'Information",
        institution: 'Université Technique de Munich',
        period: '2012 – 2014',
      },
      {
        degree: "Bachelor of Science, Systèmes d'Information",
        institution: 'Université Technique de Munich',
        period: '2008 – 2012',
      },
    ],
    certifications: ['IBM Certified Database Administrator', 'IBM Certified Database Associate'],
    techStack:
      'Java · Spring Boot · Python · Django · Ruby on Rails · PostgreSQL · SQL · AWS · Terraform · Docker · REST · Git · Linux · ElasticSearch · Node.js · React · Android (Kotlin)',
    projects: [
      {
        name: 'xingen.de',
        description: "Plateforme propriétaire de facturation électronique pour la génération et le traitement de factures électroniques conformes aux standards (XRechnung / ZUGFeRD), conçue pour le marché allemand.",
        url: 'https://xingen.de',
        badge: 'Propriétaire',
      },
      {
        name: 'nko-nto',
        description: "Outil open-source de comptabilité multi-devises conçu pour les ONG et les organisations internationales opérant dans plusieurs devises et contextes fiscaux.",
        url: 'https://github.com/manuelgerstner/nko-nto',
        badge: 'Open Source',
      },
    ],
  },
};
