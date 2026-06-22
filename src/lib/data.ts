export const MARQUEE_ITEMS = [
  'PYTHON', 'SQL', 'POWER BI', 'TABLEAU',
  'A/B TESTING', 'COHORT ANALYSIS', 'ETL',
  'EDA', 'DATA MODELING',
];

export const FOOTER_ITEMS = [
  'AMAAN KHAN', 'DATA ANALYST', 'BENGALURU, INDIA',
  'OPEN TO WORK', 'PYTHON', 'SQL', 'POWER BI',
  '$697K MRR IDENTIFIED',
];

export const ROLES = [
  { key: 'tunez',   col: '#f59e0b', date: 'Apr 2026 — Present',    company: 'Tunez',       title: 'CEO Intern' },
  { key: 'aligner', col: '#10b981', date: 'Sep 2025 — Nov 2025',   company: 'Alignerr',    title: 'Data Analyst — Model Evaluation & Benchmarking' },
  { key: 'outlier', col: '#06b6d4', date: 'Oct 2024 — Mar 2025',   company: 'Outlier AI',  title: 'Data Analyst — Quality Auditing & Validation' },
  { key: 'vit',     col: '#8b5cf6', date: 'Jul 2021 — Jul 2025',   company: 'VIT Vellore', title: 'B.Tech Computer Science' },
];

export type ExpCard = {
  tags: string[];
  title: string;
  bullet: string;
  techCount: number;
  details: string[];
  stack: string[];
};

export const EXP_CARDS: Record<string, ExpCard[]> = {
  tunez: [
    {
      tags: ['Tunez', 'Analytics'],
      title: 'Competitor Intelligence System',
      bullet: 'Mapped pricing, listings & review velocity for 6+ brands across Amazon, Flipkart & D2C',
      techCount: 3,
      details: [
        'Weekly market-state digest landing in the founder inbox every Monday morning',
        'Pricing telemetry, listing audits, review velocity rolled up by SKU and brand',
        'Powers the Monday product review — first input to the weekly roadmap',
      ],
      stack: ['Python', 'Pandas', 'Power BI'],
    },
    {
      tags: ['Tunez', 'Research'],
      title: 'Pricing Benchmark Model',
      bullet: 'Tracked real-time price gaps vs boAt, Noise, Boult, pTron, Mivi',
      techCount: 2,
      details: [
        'Daily SKU-level price deltas with MAP-violation and stock-out flags',
        'Side-by-side benchmarks across 6+ competing audio & lifestyle brands',
      ],
      stack: ['Excel', 'SQL'],
    },
    {
      tags: ['Tunez', 'Analysis'],
      title: 'Review Velocity Audit',
      bullet: 'Sentiment & rating patterns across competitor product catalogues',
      techCount: 2,
      details: [
        'Lightweight NLP pass categorising emerging complaints by theme',
        'Weekly sentiment trend lines per brand, surfaced in the Power BI dashboard',
      ],
      stack: ['Pandas', 'NLP'],
    },
  ],
  outlier: [
    {
      tags: ['Outlier AI', 'QA'],
      title: 'AI Output Auditing',
      bullet: 'Increased data reliability by 30% auditing thousands of AI-generated outputs',
      techCount: 2,
      details: [
        'End-to-end review across math, code, reasoning and writing prompts at scale',
        'Improved overall dataset reliability by 30% via structured re-annotation passes',
      ],
      stack: ['Annotation', 'Python'],
    },
    {
      tags: ['Outlier AI', 'Testing'],
      title: 'Adversarial Test Case Design',
      bullet: 'Designed 100+ adversarial test cases to stress-test model behavior',
      techCount: 1,
      details: [
        'Authored 100+ adversarial prompts probing edge cases and prompt-injection paths',
        'Test set carried over into recurring regression evaluations for new model versions',
      ],
      stack: ['QA'],
    },
    {
      tags: ['Outlier AI', 'Validation'],
      title: 'Failure Pattern Analysis',
      bullet: 'Isolated recurring anomalies via root cause analysis, informing model readiness decisions',
      techCount: 1,
      details: [
        'Clustered failure modes by category and traced them back to upstream data issues',
        'Findings fed straight into the go / no-go call on model release windows',
      ],
      stack: ['Analysis'],
    },
  ],
  aligner: [
    {
      tags: ['Alignerr', 'Benchmarking'],
      title: 'ML Algorithm Benchmarking',
      bullet: 'Comparative reports across 100+ ML algorithms, improved evaluation consistency by 25%',
      techCount: 2,
      details: [
        'Built head-to-head benchmarks across 100+ ML algorithms on shared eval sets',
        'Raised evaluation consistency by 25% by standardising the scoring criteria',
      ],
      stack: ['Python', 'scikit-learn'],
    },
    {
      tags: ['Alignerr', 'Documentation'],
      title: 'Decision-Support Reports',
      bullet: 'Reduced ambiguity in algorithm selection via structured evaluation frameworks',
      techCount: 1,
      details: [
        'Authored decision-support docs that ranked candidates against business constraints',
        'Frameworks adopted by the modelling team as a default selection checklist',
      ],
      stack: ['Documentation'],
    },
    {
      tags: ['Alignerr', 'Analysis'],
      title: 'Performance Trade-off Mapping',
      bullet: 'Mapped engineering complexity vs business applicability across model candidates',
      techCount: 1,
      details: [
        'Quantified the trade-off between accuracy, latency and engineering cost per model',
        'Surfaced 2-3 dark-horse candidates that scored better on business fit than headline metric',
      ],
      stack: ['Analysis'],
    },
  ],
  vit: [
    {
      tags: ['VIT', 'Academic'],
      title: 'Core CS Curriculum',
      bullet: 'DBMS, Statistics, ML Foundations, DSA, Probability Theory',
      techCount: 0,
      details: [
        'Computer Science undergrad with a heavy lean into databases & statistics',
        'Strong DSA fundamentals carried throughout the four-year programme',
      ],
      stack: [],
    },
    {
      tags: ['VIT', 'Project'],
      title: 'Data Pipeline Project',
      bullet: 'End-to-end pipeline built with Python + PostgreSQL',
      techCount: 2,
      details: [
        'Shipped cleaned analytical tables out of a transactional Postgres store',
        'Scheduled ETL with validation checks, documentation and rollback steps',
      ],
      stack: ['Python', 'PostgreSQL'],
    },
    {
      tags: ['VIT', 'Featured ⭐'],
      title: 'Job Market Analysis',
      bullet: 'Scraped 1,000+ postings, published as interactive Tableau view',
      techCount: 3,
      details: [
        'Crawled 1,000+ data-analyst job posts across Indian metros',
        'Mapped skill demand, salary bands & hiring trends by region',
        'Published as an interactive Tableau workbook with filters by city & level',
      ],
      stack: ['Python', 'BeautifulSoup', 'Tableau'],
    },
  ],
};

export const METRICS = [
  { company: 'Personal Project', target: 697, prefix: '$', suffix: 'K', label: 'Churned MRR identified' },
  { company: 'Tunez',           target: 70,  prefix: '',  suffix: '+', label: 'Competitor brands benchmarked' },
  { company: 'Outlier AI',      target: 30,  prefix: '',  suffix: '%', label: 'Data reliability increase' },
  { company: 'Alignerr',        target: 25,  prefix: '',  suffix: '%', label: 'Evaluation consistency improvement' },
];

export const PROJECTS = [
  {
    num: '01',
    name: 'SaaS Churn & Revenue Risk Analytics',
    desc: 'Identified $697K in churned MRR and 57% revenue churn rate across 2,800+ subscriptions. Premium users drove 68% of revenue loss.',
    tags: ['Python', 'SQL', 'PostgreSQL', 'Google Sheets'],
    href: 'https://github.com/ronin411/saas-churn-analysis',
  },
  {
    num: '02',
    name: 'Product Funnel & Conversion Pipeline',
    desc: 'Built 4-stage funnel tracking 1,000+ users. Facebook Mobile at 18% conversion (3x Twitter Desktop). Reduced time-to-conversion by 40%.',
    tags: ['Flask', 'PostgreSQL', 'Python', 'SQL'],
    href: 'https://github.com/ronin411/Funnel_analytics_project',
  },
  {
    num: '03',
    name: 'India DA Job Market Analysis',
    desc: 'Analyzed 1,000+ job postings. SQL linked to 22% higher salaries (₹6.8L vs ₹5.6L). Python + Tableau found in 45% of high-paying roles.',
    tags: ['Python', 'Web Scraping', 'Pandas', 'Tableau'],
    href: 'https://github.com/ronin411/Data-Analyst-Job-Market-Analysis-',
  },
];
