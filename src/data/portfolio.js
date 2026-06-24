export const personal = {
  name: 'Eshan Kumar Jain',
  role: 'Business Data Analyst',
  subtitle: 'MSc Data Science & Analytics',
  bio: 'Business Data Analyst with 2+ years at HDFC Bank leveraging SQL, Power BI, and PostgreSQL to deliver KPI dashboards, data pipelines, and actionable insights. Reduced operational turnaround by 25%, cut manual reporting effort by 40%, and improved data accuracy by 30%. Currently deepening ML and statistical modelling expertise at Maynooth University.',
  location: 'Maynooth, Ireland',
  email: 'eshanjain552@gmail.com',
  phone: '+353 899816869',
  uniEmail: 'ESHANJAIN.2026@mumail.ie',
  linkedin: 'https://www.linkedin.com/in/eshan-kumar-jain-a140921b6/',
  github: 'https://github.com/Eshan-kumar-jain',
  cvUrl: 'Eshan_Jain_Kumar_data_resume.pdf',
  photo: 'Photo_univ.jpg',
  stats: [
    { value: '2+', label: 'Years Experience' },
    { value: '1.5Mâ‚¬', label: 'Daily Volume Managed' },
    { value: '40%', label: 'Reporting Effort Cut' },
    { value: '30%', label: 'Data Accuracy Gain' },
  ],
}

export const projects = [
  {
    num: '01',
    title: 'Skin Disease Classification â€” Deep Learning',
    desc: '3-stage ML pipeline: semantic segmentation â†’ MobileNetV2 CNN feature extraction â†’ ensemble evaluation across 23 skin conditions. Achieved 93.2% classification accuracy using transfer learning, stratified k-fold CV, and hyperparameter tuning â€” outperforming a vanilla CNN baseline by 7.4 percentage points.',
    highlight: '93.2% accuracy Â· 23 disease classes Â· 7.4pp over baseline',
    tags: ['Python', 'TensorFlow', 'MobileNetV2', 'Scikit-learn', 'Transfer Learning', 'CNN'],
    img: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=70',
    demo: 'https://github.com/Eshan-kumar-jain/University-Final-year-project.git',
    code: 'https://github.com/Eshan-kumar-jain/University-Final-year-project.git',
  },
  {
    num: '02',
    title: 'Customer Shopping Trends â€” Full-Stack Analytics',
    desc: 'End-to-end BI pipeline: normalised retail data in PostgreSQL, authored advanced SQL (CTEs, window functions) to compute customer lifetime value, category revenue share, and seasonal demand. Built a Power BI dashboard with RFM segmentation, cohort analysis, and time-series trendlines for stakeholder reporting.',
    highlight: 'PostgreSQL Â· Power BI Â· RFM Segmentation Â· CLV',
    tags: ['Python', 'PostgreSQL', 'Power BI', 'DAX', 'Pandas', 'RFM Analysis'],
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=70',
    demo: 'https://github.com/Eshan-kumar-jain',
    code: 'https://github.com/Eshan-kumar-jain',
  },
  {
    num: '03',
    title: 'Diwali Sales & Music Store â€” SQL Analytics',
    desc: 'Exploratory data analysis and statistical segmentation on 10,000+ transaction records to identify top-revenue customer demographics, peak purchase periods, and highest-selling product categories. Applied advanced SQL (CTEs, subqueries, window functions) to extract genre revenue, artist performance, and purchase frequency insights from a relational music store schema.',
    highlight: '10K+ records Â· EDA Â· Advanced SQL Â· Statistical Segmentation',
    tags: ['Python', 'Pandas', 'Seaborn', 'PostgreSQL', 'SQL', 'EDA', 'Plotly'],
    img: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=800&q=70',
    demo: 'https://github.com/Eshan-kumar-jain',
    code: 'https://github.com/Eshan-kumar-jain',
  },
]

export const experience = [
  {
    role: 'Business Data Analyst',
    org: 'HDFC Bank Ltd',
    location: 'Mumbai, India',
    period: 'Jul 2023 â€” Jul 2025',
    type: 'work',
    points: [
      'Developed Power BI dashboards tracking throughput, SLA adherence, and error rates for API Integration & Customised Statements initiatives processing EUR 1.5M+ daily â€” enabling senior management to cut decision turnaround by 20%',
      'Wrote complex SQL queries (CTEs, window functions, subqueries) and designed PostgreSQL data pipelines for UAT across 5+ major product releases, reducing data reconciliation errors by 30%',
      'Applied SQL-based cohort analysis and trend modelling to identify process bottlenecks, achieving a 25% reduction in average turnaround time across 50+ stakeholders',
      'Partnered with 5+ developers and architects to translate business requirements into data specs within Agile, JIRA, and ServiceNow workflows, improving sprint delivery accuracy',
      'Led all EPFO development projects end-to-end, achieving 100% regulatory compliance across data handling, audit trails, and reporting pipelines',
    ],
    chips: ['SQL', 'PostgreSQL', 'Power BI', 'DAX', 'Python', 'JIRA', 'Agile', 'ETL'],
  },
]

export const education = [
  {
    degree: 'MSc Data Science and Analytics',
    org: 'Maynooth University, Ireland',
    period: '2025 â€” 2026 (Expected)',
    type: 'edu',
    points: [
      'Machine Learning, Statistical Methods, Data Mining, Data Analytics',
    ],
    chips: ['ML', 'Statistical Analysis', 'Python', 'R'],
  },
  {
    degree: 'BTech Computer Science & Engineering',
    org: 'VNIT Nagpur, India',
    period: '2019 â€” 2023 | CGPA: 7.54/10',
    type: 'edu',
    points: [
      'VP of Ashlesha Astronomy Club',
      'Gold Medalist â€” International Mathematics & Science Olympiads (IMO & ISO)',
      'AIR 6253 JEE Advanced 2019 | 99.57 percentile JEE Main 2019',
    ],
    chips: ['C++', 'OOP', 'Algorithms', 'Data Structures'],
  },
]

export const skillGroups = [
  {
    label: 'Analysis & BI',
    skills: [
      { name: 'SQL / PostgreSQL', pct: 92 },
      { name: 'Power BI & DAX', pct: 88 },
      { name: 'Python (Pandas, NumPy)', pct: 90 },
      { name: 'Excel & R', pct: 78 },
    ],
  },
  {
    label: 'Machine Learning',
    skills: [
      { name: 'Classification & Regression', pct: 85 },
      { name: 'CNNs & Deep Learning', pct: 82 },
      { name: 'Feature Engineering', pct: 84 },
      { name: 'A/B Testing & Statistics', pct: 80 },
    ],
  },
  {
    label: 'Data Engineering',
    skills: [
      { name: 'ETL Pipelines', pct: 85 },
      { name: 'Data Cleaning & Wrangling', pct: 90 },
      { name: 'Reporting Automation', pct: 86 },
      { name: 'UAT Execution', pct: 88 },
    ],
  },
  {
    label: 'Libraries & Tools',
    skills: [
      { name: 'Scikit-learn / TensorFlow / PyTorch', pct: 82 },
      { name: 'Matplotlib / Seaborn / Plotly', pct: 85 },
      { name: 'Git, JIRA, ServiceNow', pct: 90 },
      { name: 'Agile / SDLC', pct: 92 },
    ],
  },
]
