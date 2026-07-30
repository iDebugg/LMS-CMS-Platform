/* Generated from von-newman-atlas-course-catalogue.md. Do not edit by hand. */
export type CatalogueLesson = { code: string; title: string };
export type CatalogueCourse = { code: string; title: string; lessons: CatalogueLesson[] };
export type CataloguePath = {
  code: string;
  title: string;
  audience: string;
  courses: CatalogueCourse[];
};

export const atlasCatalogue: CataloguePath[] = [
  {
    "code": "PUB-01",
    "title": "Public Administration Foundations",
    "audience": "L1 · New entrants, junior officers, staff needing grounding in how government works",
    "courses": [
      {
        "code": "PUB-01.1",
        "title": "Understanding the Nigerian State",
        "lessons": [
          {
            "code": "01.1.1",
            "title": "The Constitution and the Three Arms of Government"
          },
          {
            "code": "01.1.2",
            "title": "Federal, State and Local Government Relations"
          },
          {
            "code": "01.1.3",
            "title": "MDAs Explained: Ministries, Departments and Agencies"
          },
          {
            "code": "01.1.4",
            "title": "The Federal Character Principle"
          }
        ]
      },
      {
        "code": "PUB-01.2",
        "title": "The Civil Service and Its Rules",
        "lessons": [
          {
            "code": "01.2.1",
            "title": "Evolution of the Nigerian Civil Service"
          },
          {
            "code": "01.2.2",
            "title": "Public Service Rules Every Officer Must Know"
          },
          {
            "code": "01.2.3",
            "title": "Grade Levels, Cadres and Career Progression"
          },
          {
            "code": "01.2.4",
            "title": "Conditions of Service, Leave and Entitlements"
          }
        ]
      },
      {
        "code": "PUB-01.3",
        "title": "Conduct in Public Office",
        "lessons": [
          {
            "code": "01.3.1",
            "title": "The Code of Conduct for Public Officers"
          },
          {
            "code": "01.3.2",
            "title": "Confidentiality, Official Secrets and Discretion"
          },
          {
            "code": "01.3.3",
            "title": "Conflict of Interest and Gifts"
          },
          {
            "code": "01.3.4",
            "title": "Political Neutrality and the Public Officer"
          }
        ]
      },
      {
        "code": "PUB-01.4",
        "title": "Working Inside Government",
        "lessons": [
          {
            "code": "01.4.1",
            "title": "Official Correspondence and Minuting"
          },
          {
            "code": "01.4.2",
            "title": "Reading Circulars, Memos and Directives"
          },
          {
            "code": "01.4.3",
            "title": "Meetings, Committees and Secretariat Duties"
          },
          {
            "code": "01.4.4",
            "title": "Interfacing With Other MDAs"
          }
        ]
      }
    ]
  },
  {
    "code": "PUB-02",
    "title": "Public Financial Management & Procurement",
    "audience": "L2 · Finance officers, accountants, procurement staff, budget desk officers",
    "courses": [
      {
        "code": "PUB-02.1",
        "title": "The Public Purse",
        "lessons": [
          {
            "code": "02.1.1",
            "title": "Government Revenue and the Federation Account"
          },
          {
            "code": "02.1.2",
            "title": "The Budget Cycle: Preparation to Appropriation"
          },
          {
            "code": "02.1.3",
            "title": "MTEF, MTSS and Medium-Term Planning"
          },
          {
            "code": "02.1.4",
            "title": "Capital vs Recurrent Expenditure"
          }
        ]
      },
      {
        "code": "PUB-02.2",
        "title": "Financial Control and Accounting",
        "lessons": [
          {
            "code": "02.2.1",
            "title": "Treasury Single Account and GIFMIS"
          },
          {
            "code": "02.2.2",
            "title": "Financial Regulations and the Accountant-General"
          },
          {
            "code": "02.2.3",
            "title": "Vote Book Management and Expenditure Control"
          },
          {
            "code": "02.2.4",
            "title": "IPSAS and Public Sector Accounting Basics"
          }
        ]
      },
      {
        "code": "PUB-02.3",
        "title": "Public Procurement",
        "lessons": [
          {
            "code": "02.3.1",
            "title": "The Public Procurement Act and the BPP"
          },
          {
            "code": "02.3.2",
            "title": "Procurement Planning and Thresholds"
          },
          {
            "code": "02.3.3",
            "title": "Tendering: Advertisement to Award"
          },
          {
            "code": "02.3.4",
            "title": "Bid Evaluation and Due Process"
          },
          {
            "code": "02.3.5",
            "title": "Contract Administration and Variations"
          }
        ]
      },
      {
        "code": "PUB-02.4",
        "title": "Audit and Accountability",
        "lessons": [
          {
            "code": "02.4.1",
            "title": "Internal Audit in MDAs"
          },
          {
            "code": "02.4.2",
            "title": "The Auditor-General and External Audit"
          },
          {
            "code": "02.4.3",
            "title": "Responding to Audit Queries"
          },
          {
            "code": "02.4.4",
            "title": "Public Accounts Committee and Legislative Oversight"
          }
        ]
      }
    ]
  },
  {
    "code": "PUB-03",
    "title": "Revenue & Tax Administration",
    "audience": "L2 · Revenue service staff, state IRS officers, tax practitioners",
    "courses": [
      {
        "code": "PUB-03.1",
        "title": "Nigeria's Tax System",
        "lessons": [
          {
            "code": "03.1.1",
            "title": "Overview of Nigerian Taxes and Taxing Rights"
          },
          {
            "code": "03.1.2",
            "title": "Federal, State and Local Tax Jurisdictions"
          },
          {
            "code": "03.1.3",
            "title": "The Tax Authority Landscape"
          },
          {
            "code": "03.1.4",
            "title": "Tax Reform: What Has Changed and Why"
          }
        ]
      },
      {
        "code": "PUB-03.2",
        "title": "Core Taxes in Practice",
        "lessons": [
          {
            "code": "03.2.1",
            "title": "Companies Income Tax"
          },
          {
            "code": "03.2.2",
            "title": "Value Added Tax"
          },
          {
            "code": "03.2.3",
            "title": "Personal Income Tax and PAYE"
          },
          {
            "code": "03.2.4",
            "title": "Withholding Tax"
          },
          {
            "code": "03.2.5",
            "title": "Capital Gains Tax and Stamp Duties"
          }
        ]
      },
      {
        "code": "PUB-03.3",
        "title": "Revenue Operations",
        "lessons": [
          {
            "code": "03.3.1",
            "title": "Taxpayer Registration and TIN"
          },
          {
            "code": "03.3.2",
            "title": "Filing, Assessment and Collection"
          },
          {
            "code": "03.3.3",
            "title": "Tax Audit and Investigation"
          },
          {
            "code": "03.3.4",
            "title": "Debt Management and Enforcement"
          },
          {
            "code": "03.3.5",
            "title": "Objections, Appeals and the Tax Appeal Tribunal"
          }
        ]
      },
      {
        "code": "PUB-03.4",
        "title": "Modern Revenue Administration",
        "lessons": [
          {
            "code": "03.4.1",
            "title": "Digital Tax Administration and E-Filing"
          },
          {
            "code": "03.4.2",
            "title": "Data Matching and Risk-Based Selection"
          },
          {
            "code": "03.4.3",
            "title": "Taxpayer Service and Voluntary Compliance"
          },
          {
            "code": "03.4.4",
            "title": "Ethics and Integrity in Revenue Collection"
          }
        ]
      }
    ]
  },
  {
    "code": "PUB-04",
    "title": "Governance, Ethics & Anti-Corruption",
    "audience": "L2 · All officers; mandatory-compliance candidate",
    "courses": [
      {
        "code": "PUB-04.1",
        "title": "Governance Foundations",
        "lessons": [
          {
            "code": "04.1.1",
            "title": "Principles of Good Governance"
          },
          {
            "code": "04.1.2",
            "title": "Transparency and Open Government"
          },
          {
            "code": "04.1.3",
            "title": "Rule of Law and Administrative Justice"
          },
          {
            "code": "04.1.4",
            "title": "Institutional Checks and Balances"
          }
        ]
      },
      {
        "code": "PUB-04.2",
        "title": "The Anti-Corruption Framework",
        "lessons": [
          {
            "code": "04.2.1",
            "title": "Corruption: Forms, Causes and Costs"
          },
          {
            "code": "04.2.2",
            "title": "EFCC, ICPC and the Code of Conduct Bureau"
          },
          {
            "code": "04.2.3",
            "title": "Money Laundering and Illicit Financial Flows"
          },
          {
            "code": "04.2.4",
            "title": "Asset Declaration Obligations"
          }
        ]
      },
      {
        "code": "PUB-04.3",
        "title": "Ethics in Practice",
        "lessons": [
          {
            "code": "04.3.1",
            "title": "Ethical Decision-Making Frameworks"
          },
          {
            "code": "04.3.2",
            "title": "Recognising and Managing Conflicts of Interest"
          },
          {
            "code": "04.3.3",
            "title": "Whistleblowing Policy and Protections"
          },
          {
            "code": "04.3.4",
            "title": "Building an Ethical Team Culture"
          }
        ]
      },
      {
        "code": "PUB-04.4",
        "title": "Integrity Systems",
        "lessons": [
          {
            "code": "04.4.1",
            "title": "Corruption Risk Assessment"
          },
          {
            "code": "04.4.2",
            "title": "Internal Controls and Segregation of Duties"
          },
          {
            "code": "04.4.3",
            "title": "Compliance Monitoring"
          },
          {
            "code": "04.4.4",
            "title": "Investigating and Reporting Misconduct"
          }
        ]
      }
    ]
  },
  {
    "code": "PUB-05",
    "title": "Citizen Service & Frontline Delivery",
    "audience": "L1 · Front desk, registry, service windows, call handlers",
    "courses": [
      {
        "code": "PUB-05.1",
        "title": "The Service Mandate",
        "lessons": [
          {
            "code": "05.1.1",
            "title": "SERVICOM: Origins, Mandate and Charters"
          },
          {
            "code": "05.1.2",
            "title": "Seeing Citizens as Customers"
          },
          {
            "code": "05.1.3",
            "title": "Developing a Service Charter for Your Unit"
          },
          {
            "code": "05.1.4",
            "title": "Service Standards and Turnaround Times"
          }
        ]
      },
      {
        "code": "PUB-05.2",
        "title": "Frontline Excellence",
        "lessons": [
          {
            "code": "05.2.1",
            "title": "Front Desk and Reception Standards"
          },
          {
            "code": "05.2.2",
            "title": "Telephone and Digital Channel Etiquette"
          },
          {
            "code": "05.2.3",
            "title": "Managing Queues, Waiting and Expectations"
          },
          {
            "code": "05.2.4",
            "title": "Serving Citizens With Disabilities and Special Needs"
          }
        ]
      },
      {
        "code": "PUB-05.3",
        "title": "Handling Difficulty",
        "lessons": [
          {
            "code": "05.3.1",
            "title": "De-escalating Angry and Distressed Citizens"
          },
          {
            "code": "05.3.2",
            "title": "Complaints Handling and Redress"
          },
          {
            "code": "05.3.3",
            "title": "Saying No Without Losing Trust"
          },
          {
            "code": "05.3.4",
            "title": "Personal Resilience for Frontline Staff"
          }
        ]
      },
      {
        "code": "PUB-05.4",
        "title": "Improving the Service",
        "lessons": [
          {
            "code": "05.4.1",
            "title": "Collecting and Acting on Citizen Feedback"
          },
          {
            "code": "05.4.2",
            "title": "Mystery Shopping and Service Audits"
          },
          {
            "code": "05.4.3",
            "title": "Mapping and Removing Service Bottlenecks"
          },
          {
            "code": "05.4.4",
            "title": "Measuring Satisfaction and Reporting Performance"
          }
        ]
      }
    ]
  },
  {
    "code": "PUB-06",
    "title": "Policy, Planning, Monitoring & Evaluation",
    "audience": "L2–L3 · Planning officers, research and statistics units, policy advisers",
    "courses": [
      {
        "code": "PUB-06.1",
        "title": "The Policy Process",
        "lessons": [
          {
            "code": "06.1.1",
            "title": "How Policy Is Made in Nigeria"
          },
          {
            "code": "06.1.2",
            "title": "Problem Definition and Agenda Setting"
          },
          {
            "code": "06.1.3",
            "title": "Option Appraisal and Cost-Benefit Analysis"
          },
          {
            "code": "06.1.4",
            "title": "Drafting Policy Papers and Council Memoranda"
          }
        ]
      },
      {
        "code": "PUB-06.2",
        "title": "Evidence and Analysis",
        "lessons": [
          {
            "code": "06.2.1",
            "title": "Using Data and Research in Policy"
          },
          {
            "code": "06.2.2",
            "title": "Nigerian Data Sources: NBS and Beyond"
          },
          {
            "code": "06.2.3",
            "title": "Stakeholder and Political Economy Analysis"
          },
          {
            "code": "06.2.4",
            "title": "Regulatory Impact Assessment"
          }
        ]
      },
      {
        "code": "PUB-06.3",
        "title": "Planning and Implementation",
        "lessons": [
          {
            "code": "06.3.1",
            "title": "Translating Policy Into Programmes"
          },
          {
            "code": "06.3.2",
            "title": "Logframes and Theories of Change"
          },
          {
            "code": "06.3.3",
            "title": "Implementation Planning and Delivery Chains"
          },
          {
            "code": "06.3.4",
            "title": "Managing Implementation Risk"
          }
        ]
      },
      {
        "code": "PUB-06.4",
        "title": "Monitoring and Evaluation",
        "lessons": [
          {
            "code": "06.4.1",
            "title": "M&E Fundamentals and Frameworks"
          },
          {
            "code": "06.4.2",
            "title": "Designing Indicators and Baselines"
          },
          {
            "code": "06.4.3",
            "title": "Data Collection and Quality Assurance"
          },
          {
            "code": "06.4.4",
            "title": "Evaluation Methods and Impact Assessment"
          },
          {
            "code": "06.4.5",
            "title": "Reporting Results and Learning Loops"
          }
        ]
      }
    ]
  },
  {
    "code": "PUB-07",
    "title": "Public Sector Leadership & Executive Development",
    "audience": "L3 · Directors, permanent secretaries, agency heads, LGA chairmen",
    "courses": [
      {
        "code": "PUB-07.1",
        "title": "Leading in Government",
        "lessons": [
          {
            "code": "07.1.1",
            "title": "The Distinct Challenge of Public Sector Leadership"
          },
          {
            "code": "07.1.2",
            "title": "The Political–Administrative Interface"
          },
          {
            "code": "07.1.3",
            "title": "Leading With Constrained Resources"
          },
          {
            "code": "07.1.4",
            "title": "Personal Leadership Philosophy and Presence"
          }
        ]
      },
      {
        "code": "PUB-07.2",
        "title": "Strategy and Direction",
        "lessons": [
          {
            "code": "07.2.1",
            "title": "Strategic Thinking for MDAs"
          },
          {
            "code": "07.2.2",
            "title": "Setting Institutional Vision and Priorities"
          },
          {
            "code": "07.2.3",
            "title": "Aligning Budget, People and Strategy"
          },
          {
            "code": "07.2.4",
            "title": "Scenario Planning and Long-Range Thinking"
          }
        ]
      },
      {
        "code": "PUB-07.3",
        "title": "Leading People and Change",
        "lessons": [
          {
            "code": "07.3.1",
            "title": "Building and Leading Senior Teams"
          },
          {
            "code": "07.3.2",
            "title": "Driving Reform and Overcoming Institutional Inertia"
          },
          {
            "code": "07.3.3",
            "title": "Coaching and Developing Successors"
          },
          {
            "code": "07.3.4",
            "title": "Managing Conflict at Executive Level"
          }
        ]
      },
      {
        "code": "PUB-07.4",
        "title": "Executive Communication and Influence",
        "lessons": [
          {
            "code": "07.4.1",
            "title": "Briefing Ministers and Political Principals"
          },
          {
            "code": "07.4.2",
            "title": "Public Speaking and Media Handling"
          },
          {
            "code": "07.4.3",
            "title": "Negotiation and Inter-Agency Influence"
          },
          {
            "code": "07.4.4",
            "title": "Crisis Leadership and Communication"
          }
        ]
      },
      {
        "code": "PUB-07.5",
        "title": "Accountability at the Top",
        "lessons": [
          {
            "code": "07.5.1",
            "title": "Corporate Governance for Agencies and Boards"
          },
          {
            "code": "07.5.2",
            "title": "Appearing Before Legislative Committees"
          },
          {
            "code": "07.5.3",
            "title": "Institutional Risk Ownership"
          },
          {
            "code": "07.5.4",
            "title": "Succession and Institutional Memory"
          }
        ]
      }
    ]
  },
  {
    "code": "PUB-08",
    "title": "Digital Government & E-Governance",
    "audience": "L2 · ICT units, reform teams, service owners",
    "courses": [
      {
        "code": "PUB-08.1",
        "title": "The Case for Digital Government",
        "lessons": [
          {
            "code": "08.1.1",
            "title": "What Digital Government Actually Means"
          },
          {
            "code": "08.1.2",
            "title": "Nigeria's Digital Economy Policy and NITDA"
          },
          {
            "code": "08.1.3",
            "title": "Digital Maturity Assessment for MDAs"
          },
          {
            "code": "08.1.4",
            "title": "Why Government IT Projects Fail"
          }
        ]
      },
      {
        "code": "PUB-08.2",
        "title": "Designing Digital Services",
        "lessons": [
          {
            "code": "08.2.1",
            "title": "Service Design and Citizen Journey Mapping"
          },
          {
            "code": "08.2.2",
            "title": "Digitising a Paper Process End to End"
          },
          {
            "code": "08.2.3",
            "title": "Accessibility, Inclusion and the Digital Divide"
          },
          {
            "code": "08.2.4",
            "title": "Piloting, Iterating and Scaling"
          }
        ]
      },
      {
        "code": "PUB-08.3",
        "title": "Enabling Technology",
        "lessons": [
          {
            "code": "08.3.1",
            "title": "Government Cloud and Hosting Decisions"
          },
          {
            "code": "08.3.2",
            "title": "Interoperability and Data Sharing Between MDAs"
          },
          {
            "code": "08.3.3",
            "title": "Digital Identity and Payment Rails"
          },
          {
            "code": "08.3.4",
            "title": "Procuring and Managing Technology Vendors"
          }
        ]
      },
      {
        "code": "PUB-08.4",
        "title": "Adoption and Sustainability",
        "lessons": [
          {
            "code": "08.4.1",
            "title": "Change Management for Digital Rollouts"
          },
          {
            "code": "08.4.2",
            "title": "Building Digital Skills Across the Workforce"
          },
          {
            "code": "08.4.3",
            "title": "Measuring Digital Service Performance"
          },
          {
            "code": "08.4.4",
            "title": "Funding and Sustaining Digital Services"
          }
        ]
      }
    ]
  },
  {
    "code": "PUB-09",
    "title": "Local Government Administration",
    "audience": "L2 · LGA staff, council officers, chairmen and supervisory councillors",
    "courses": [
      {
        "code": "PUB-09.1",
        "title": "The Local Government System",
        "lessons": [
          {
            "code": "09.1.1",
            "title": "Constitutional Basis and Functions of LGAs"
          },
          {
            "code": "09.1.2",
            "title": "Structure: Chairman, Council and Departments"
          },
          {
            "code": "09.1.3",
            "title": "LGA–State Relations and the Service Commission"
          },
          {
            "code": "09.1.4",
            "title": "Autonomy, Allocation and the JAAC"
          }
        ]
      },
      {
        "code": "PUB-09.2",
        "title": "Local Governance in Practice",
        "lessons": [
          {
            "code": "09.2.1",
            "title": "Council Meetings, Motions and Bye-Laws"
          },
          {
            "code": "09.2.2",
            "title": "Community Engagement and Traditional Institutions"
          },
          {
            "code": "09.2.3",
            "title": "Grassroots Participation and Town Halls"
          },
          {
            "code": "09.2.4",
            "title": "Conflict, Security and Community Cohesion"
          }
        ]
      },
      {
        "code": "PUB-09.3",
        "title": "Local Service Delivery",
        "lessons": [
          {
            "code": "09.3.1",
            "title": "Primary Health, Education and Sanitation Mandates"
          },
          {
            "code": "09.3.2",
            "title": "Markets, Motor Parks and Environmental Services"
          },
          {
            "code": "09.3.3",
            "title": "Rural Infrastructure and Maintenance"
          },
          {
            "code": "09.3.4",
            "title": "Managing Contractors at Local Level"
          }
        ]
      },
      {
        "code": "PUB-09.4",
        "title": "Local Revenue and Finance",
        "lessons": [
          {
            "code": "09.4.1",
            "title": "Internally Generated Revenue Sources"
          },
          {
            "code": "09.4.2",
            "title": "Rates, Levies and Permit Administration"
          },
          {
            "code": "09.4.3",
            "title": "LGA Budgeting and Financial Reporting"
          },
          {
            "code": "09.4.4",
            "title": "Transparency and Community Accountability"
          }
        ]
      }
    ]
  },
  {
    "code": "PUB-10",
    "title": "Public Sector HR & Workforce Management",
    "audience": "L2 · HR and establishment officers, service commissions",
    "courses": [
      {
        "code": "PUB-10.1",
        "title": "The HR Framework",
        "lessons": [
          {
            "code": "10.1.1",
            "title": "The Civil Service Commission and HR Authority"
          },
          {
            "code": "10.1.2",
            "title": "Scheme of Service and Job Classification"
          },
          {
            "code": "10.1.3",
            "title": "Establishment, Nominal Roll and Manpower Planning"
          },
          {
            "code": "10.1.4",
            "title": "Public Service Rules Applied to HR"
          }
        ]
      },
      {
        "code": "PUB-10.2",
        "title": "Resourcing the Service",
        "lessons": [
          {
            "code": "10.2.1",
            "title": "Recruitment, Selection and Merit"
          },
          {
            "code": "10.2.2",
            "title": "Onboarding and Induction"
          },
          {
            "code": "10.2.3",
            "title": "Transfers, Secondments and Deployment"
          },
          {
            "code": "10.2.4",
            "title": "Managing the Establishment Register"
          }
        ]
      },
      {
        "code": "PUB-10.3",
        "title": "Performance and Development",
        "lessons": [
          {
            "code": "10.3.1",
            "title": "APER and Modern Performance Appraisal"
          },
          {
            "code": "10.3.2",
            "title": "Setting Objectives in a Public Sector Context"
          },
          {
            "code": "10.3.3",
            "title": "Training Needs Analysis and Capacity Building"
          },
          {
            "code": "10.3.4",
            "title": "Managing Underperformance and Discipline"
          }
        ]
      },
      {
        "code": "PUB-10.4",
        "title": "Employee Relations and Exit",
        "lessons": [
          {
            "code": "10.4.1",
            "title": "Unions and Industrial Relations"
          },
          {
            "code": "10.4.2",
            "title": "Grievance and Disciplinary Procedures"
          },
          {
            "code": "10.4.3",
            "title": "Employee Wellbeing and Workplace Safety"
          },
          {
            "code": "10.4.4",
            "title": "Retirement, Pensions and Knowledge Transfer"
          }
        ]
      }
    ]
  },
  {
    "code": "PUB-11",
    "title": "Records, Information & Data Governance",
    "audience": "L2 · Registry staff, ICT, FOI desk officers, data protection leads",
    "courses": [
      {
        "code": "PUB-11.1",
        "title": "Records Management Fundamentals",
        "lessons": [
          {
            "code": "11.1.1",
            "title": "Why Records Matter in Government"
          },
          {
            "code": "11.1.2",
            "title": "The Records Lifecycle"
          },
          {
            "code": "11.1.3",
            "title": "Registry Operations and Filing Systems"
          },
          {
            "code": "11.1.4",
            "title": "Classification, Security Markings and Handling"
          }
        ]
      },
      {
        "code": "PUB-11.2",
        "title": "Digital Records",
        "lessons": [
          {
            "code": "11.2.1",
            "title": "Digitisation Planning and Scanning Standards"
          },
          {
            "code": "11.2.2",
            "title": "Electronic Document and Records Management Systems"
          },
          {
            "code": "11.2.3",
            "title": "Metadata, Naming and Version Control"
          },
          {
            "code": "11.2.4",
            "title": "Email and Messaging as Official Records"
          }
        ]
      },
      {
        "code": "PUB-11.3",
        "title": "Access and Transparency",
        "lessons": [
          {
            "code": "11.3.1",
            "title": "The Freedom of Information Act in Practice"
          },
          {
            "code": "11.3.2",
            "title": "Processing an FOI Request"
          },
          {
            "code": "11.3.3",
            "title": "Proactive Disclosure and Open Data"
          },
          {
            "code": "11.3.4",
            "title": "Exemptions, Redaction and Refusal"
          }
        ]
      },
      {
        "code": "PUB-11.4",
        "title": "Data Protection and Privacy",
        "lessons": [
          {
            "code": "11.4.1",
            "title": "The Nigeria Data Protection Act: Scope and Principles"
          },
          {
            "code": "11.4.2",
            "title": "Lawful Basis and Consent in Government Processing"
          },
          {
            "code": "11.4.3",
            "title": "Data Subject Rights and How to Respond"
          },
          {
            "code": "11.4.4",
            "title": "Data Protection Impact Assessments"
          },
          {
            "code": "11.4.5",
            "title": "Breach Response and NDPC Notification"
          }
        ]
      },
      {
        "code": "PUB-11.5",
        "title": "Retention and Disposal",
        "lessons": [
          {
            "code": "11.5.1",
            "title": "Building a Retention Schedule"
          },
          {
            "code": "11.5.2",
            "title": "Archiving and the National Archives"
          },
          {
            "code": "11.5.3",
            "title": "Secure Disposal and Destruction"
          },
          {
            "code": "11.5.4",
            "title": "Audit Trails and Compliance Evidence"
          }
        ]
      }
    ]
  },
  {
    "code": "PRI-01",
    "title": "Entrepreneurship & MSME Growth",
    "audience": "L1 · Founders, small business owners, traders formalising",
    "courses": [
      {
        "code": "PRI-01.1",
        "title": "Starting a Business in Nigeria",
        "lessons": [
          {
            "code": "01.1.1",
            "title": "From Idea to Validated Opportunity"
          },
          {
            "code": "01.1.2",
            "title": "Business Models and Value Propositions"
          },
          {
            "code": "01.1.3",
            "title": "CAC Registration and Legal Structures"
          },
          {
            "code": "01.1.4",
            "title": "Licences, Permits and Sector Regulators"
          }
        ]
      },
      {
        "code": "PRI-01.2",
        "title": "Understanding Your Market",
        "lessons": [
          {
            "code": "01.2.1",
            "title": "Market Research on a Small Budget"
          },
          {
            "code": "01.2.2",
            "title": "Customer Segmentation and Personas"
          },
          {
            "code": "01.2.3",
            "title": "Competitive Analysis"
          },
          {
            "code": "01.2.4",
            "title": "Pricing Your Product or Service"
          }
        ]
      },
      {
        "code": "PRI-01.3",
        "title": "Running the Business",
        "lessons": [
          {
            "code": "01.3.1",
            "title": "Operations and Standard Procedures"
          },
          {
            "code": "01.3.2",
            "title": "Managing Suppliers and Inventory"
          },
          {
            "code": "01.3.3",
            "title": "Hiring Your First Employees"
          },
          {
            "code": "01.3.4",
            "title": "Business Continuity and Common Risks"
          }
        ]
      },
      {
        "code": "PRI-01.4",
        "title": "Funding and Growth",
        "lessons": [
          {
            "code": "01.4.1",
            "title": "Bootstrapping and Cash Discipline"
          },
          {
            "code": "01.4.2",
            "title": "Loans, Grants and Development Finance"
          },
          {
            "code": "01.4.3",
            "title": "Preparing for Investors"
          },
          {
            "code": "01.4.4",
            "title": "Scaling Without Breaking"
          }
        ]
      }
    ]
  },
  {
    "code": "PRI-02",
    "title": "Finance, Accounting & Tax for Business",
    "audience": "L1–L2 · Business owners, finance staff, non-finance managers",
    "courses": [
      {
        "code": "PRI-02.1",
        "title": "Financial Literacy Foundations",
        "lessons": [
          {
            "code": "02.1.1",
            "title": "The Language of Business Finance"
          },
          {
            "code": "02.1.2",
            "title": "Cash Versus Profit"
          },
          {
            "code": "02.1.3",
            "title": "Separating Personal and Business Finances"
          },
          {
            "code": "02.1.4",
            "title": "Banking, Payments and Transaction Records"
          }
        ]
      },
      {
        "code": "PRI-02.2",
        "title": "Bookkeeping and Accounts",
        "lessons": [
          {
            "code": "02.2.1",
            "title": "Double Entry Made Simple"
          },
          {
            "code": "02.2.2",
            "title": "Recording Sales, Purchases and Expenses"
          },
          {
            "code": "02.2.3",
            "title": "Preparing a Profit and Loss Account"
          },
          {
            "code": "02.2.4",
            "title": "Reading a Balance Sheet"
          },
          {
            "code": "02.2.5",
            "title": "Bookkeeping Software for Small Business"
          }
        ]
      },
      {
        "code": "PRI-02.3",
        "title": "Planning and Control",
        "lessons": [
          {
            "code": "02.3.1",
            "title": "Building an Operating Budget"
          },
          {
            "code": "02.3.2",
            "title": "Cash Flow Forecasting"
          },
          {
            "code": "02.3.3",
            "title": "Costing and Margin Analysis"
          },
          {
            "code": "02.3.4",
            "title": "Credit Control and Chasing Debtors"
          }
        ]
      },
      {
        "code": "PRI-02.4",
        "title": "Tax and Compliance",
        "lessons": [
          {
            "code": "02.4.1",
            "title": "Business Tax Obligations in Nigeria"
          },
          {
            "code": "02.4.2",
            "title": "VAT Registration, Charging and Filing"
          },
          {
            "code": "02.4.3",
            "title": "PAYE and Employee Deductions"
          },
          {
            "code": "02.4.4",
            "title": "Company Income Tax and Annual Returns"
          },
          {
            "code": "02.4.5",
            "title": "Working With Auditors and Tax Authorities"
          }
        ]
      },
      {
        "code": "PRI-02.5",
        "title": "Financial Analysis (L2)",
        "lessons": [
          {
            "code": "02.5.1",
            "title": "Ratio Analysis and Performance Metrics"
          },
          {
            "code": "02.5.2",
            "title": "Investment Appraisal: NPV, IRR and Payback"
          },
          {
            "code": "02.5.3",
            "title": "Financial Modelling in Excel"
          },
          {
            "code": "02.5.4",
            "title": "Presenting Financials to Non-Finance Audiences"
          }
        ]
      }
    ]
  },
  {
    "code": "PRI-03",
    "title": "Sales & Business Development",
    "audience": "L1–L2 · Sales executives, account managers, business owners",
    "courses": [
      {
        "code": "PRI-03.1",
        "title": "Sales Foundations",
        "lessons": [
          {
            "code": "03.1.1",
            "title": "The Modern Sales Process"
          },
          {
            "code": "03.1.2",
            "title": "Understanding Buyer Psychology"
          },
          {
            "code": "03.1.3",
            "title": "Product Knowledge and Value Articulation"
          },
          {
            "code": "03.1.4",
            "title": "Sales Ethics and Professionalism"
          }
        ]
      },
      {
        "code": "PRI-03.2",
        "title": "Winning New Business",
        "lessons": [
          {
            "code": "03.2.1",
            "title": "Prospecting and Lead Generation"
          },
          {
            "code": "03.2.2",
            "title": "Cold Outreach That Works"
          },
          {
            "code": "03.2.3",
            "title": "Qualifying Opportunities"
          },
          {
            "code": "03.2.4",
            "title": "Discovery Conversations and Needs Analysis"
          }
        ]
      },
      {
        "code": "PRI-03.3",
        "title": "Closing and Negotiating",
        "lessons": [
          {
            "code": "03.3.1",
            "title": "Proposals and Pitches That Convert"
          },
          {
            "code": "03.3.2",
            "title": "Handling Objections"
          },
          {
            "code": "03.3.3",
            "title": "Negotiation Fundamentals"
          },
          {
            "code": "03.3.4",
            "title": "Closing Techniques and Next Steps"
          }
        ]
      },
      {
        "code": "PRI-03.4",
        "title": "Managing the Pipeline",
        "lessons": [
          {
            "code": "03.4.1",
            "title": "CRM Fundamentals and Data Hygiene"
          },
          {
            "code": "03.4.2",
            "title": "Forecasting and Pipeline Reviews"
          },
          {
            "code": "03.4.3",
            "title": "Key Account Management"
          },
          {
            "code": "03.4.4",
            "title": "Upselling, Cross-Selling and Renewals"
          }
        ]
      },
      {
        "code": "PRI-03.5",
        "title": "Leading a Sales Team (L2)",
        "lessons": [
          {
            "code": "03.5.1",
            "title": "Territory and Target Setting"
          },
          {
            "code": "03.5.2",
            "title": "Coaching Sales Performance"
          },
          {
            "code": "03.5.3",
            "title": "Compensation and Incentives"
          },
          {
            "code": "03.5.4",
            "title": "Sales Operations and Reporting"
          }
        ]
      }
    ]
  },
  {
    "code": "PRI-04",
    "title": "Marketing, Brand & Digital Growth",
    "audience": "L1–L2 · Marketing staff, founders, comms teams",
    "courses": [
      {
        "code": "PRI-04.1",
        "title": "Marketing Foundations",
        "lessons": [
          {
            "code": "04.1.1",
            "title": "Marketing Strategy and the Marketing Mix"
          },
          {
            "code": "04.1.2",
            "title": "Positioning and Differentiation"
          },
          {
            "code": "04.1.3",
            "title": "Brand Identity and Consistency"
          },
          {
            "code": "04.1.4",
            "title": "Understanding the Nigerian Consumer"
          }
        ]
      },
      {
        "code": "PRI-04.2",
        "title": "Content and Channels",
        "lessons": [
          {
            "code": "04.2.1",
            "title": "Content Marketing and Editorial Planning"
          },
          {
            "code": "04.2.2",
            "title": "Social Media for Business"
          },
          {
            "code": "04.2.3",
            "title": "WhatsApp Business and Community Marketing"
          },
          {
            "code": "04.2.4",
            "title": "Email Marketing and List Building"
          }
        ]
      },
      {
        "code": "PRI-04.3",
        "title": "Paid and Performance",
        "lessons": [
          {
            "code": "04.3.1",
            "title": "Paid Advertising Fundamentals"
          },
          {
            "code": "04.3.2",
            "title": "Meta and Google Ads in Practice"
          },
          {
            "code": "04.3.3",
            "title": "Landing Pages and Conversion Basics"
          },
          {
            "code": "04.3.4",
            "title": "Budgeting and Managing Ad Spend"
          }
        ]
      },
      {
        "code": "PRI-04.4",
        "title": "Measurement and Optimisation",
        "lessons": [
          {
            "code": "04.4.1",
            "title": "Marketing Analytics and Attribution"
          },
          {
            "code": "04.4.2",
            "title": "A/B Testing"
          },
          {
            "code": "04.4.3",
            "title": "SEO Fundamentals"
          },
          {
            "code": "04.4.4",
            "title": "Reporting Marketing ROI"
          }
        ]
      }
    ]
  },
  {
    "code": "PRI-05",
    "title": "Leadership & People Management",
    "audience": "L2–L3 · New and experienced managers, senior leadership",
    "courses": [
      {
        "code": "PRI-05.1",
        "title": "Becoming a Manager",
        "lessons": [
          {
            "code": "05.1.1",
            "title": "From Individual Contributor to Manager"
          },
          {
            "code": "05.1.2",
            "title": "Setting Expectations and Delegating"
          },
          {
            "code": "05.1.3",
            "title": "Running Effective One-to-Ones"
          },
          {
            "code": "05.1.4",
            "title": "Managing Your Time as a Manager"
          }
        ]
      },
      {
        "code": "PRI-05.2",
        "title": "Team Performance",
        "lessons": [
          {
            "code": "05.2.1",
            "title": "Goal Setting and OKRs"
          },
          {
            "code": "05.2.2",
            "title": "Giving and Receiving Feedback"
          },
          {
            "code": "05.2.3",
            "title": "Coaching Conversations"
          },
          {
            "code": "05.2.4",
            "title": "Managing Underperformance"
          },
          {
            "code": "05.2.5",
            "title": "Recognition and Motivation"
          }
        ]
      },
      {
        "code": "PRI-05.3",
        "title": "Team Dynamics",
        "lessons": [
          {
            "code": "05.3.1",
            "title": "Building Psychological Safety"
          },
          {
            "code": "05.3.2",
            "title": "Managing Conflict"
          },
          {
            "code": "05.3.3",
            "title": "Inclusive and Cross-Cultural Leadership"
          },
          {
            "code": "05.3.4",
            "title": "Leading Hybrid and Remote Teams"
          }
        ]
      },
      {
        "code": "PRI-05.4",
        "title": "Senior Leadership (L3)",
        "lessons": [
          {
            "code": "05.4.1",
            "title": "Strategic Thinking and Business Acumen"
          },
          {
            "code": "05.4.2",
            "title": "Leading Organisational Change"
          },
          {
            "code": "05.4.3",
            "title": "Executive Presence and Influence"
          },
          {
            "code": "05.4.4",
            "title": "Decision Making Under Uncertainty"
          },
          {
            "code": "05.4.5",
            "title": "Building Leadership Bench Strength"
          }
        ]
      }
    ]
  },
  {
    "code": "PRI-06",
    "title": "Human Resources & Talent",
    "audience": "L2 · HR generalists, office managers, owner-managers",
    "courses": [
      {
        "code": "PRI-06.1",
        "title": "HR Fundamentals",
        "lessons": [
          {
            "code": "06.1.1",
            "title": "The HR Function and Its Value"
          },
          {
            "code": "06.1.2",
            "title": "Nigerian Labour Act Essentials"
          },
          {
            "code": "06.1.3",
            "title": "Contracts, Handbooks and Policies"
          },
          {
            "code": "06.1.4",
            "title": "HR Records and Confidentiality"
          }
        ]
      },
      {
        "code": "PRI-06.2",
        "title": "Talent Acquisition",
        "lessons": [
          {
            "code": "06.2.1",
            "title": "Workforce Planning"
          },
          {
            "code": "06.2.2",
            "title": "Writing Job Descriptions and Adverts"
          },
          {
            "code": "06.2.3",
            "title": "Structured Interviewing and Selection"
          },
          {
            "code": "06.2.4",
            "title": "Offers, References and Onboarding"
          }
        ]
      },
      {
        "code": "PRI-06.3",
        "title": "Reward and Performance",
        "lessons": [
          {
            "code": "06.3.1",
            "title": "Compensation Structures and Benchmarking"
          },
          {
            "code": "06.3.2",
            "title": "Payroll, PAYE and Pension Compliance"
          },
          {
            "code": "06.3.3",
            "title": "Performance Management Systems"
          },
          {
            "code": "06.3.4",
            "title": "Learning and Development Strategy"
          }
        ]
      },
      {
        "code": "PRI-06.4",
        "title": "Employee Relations",
        "lessons": [
          {
            "code": "06.4.1",
            "title": "Discipline and Grievance Handling"
          },
          {
            "code": "06.4.2",
            "title": "Managing Absence and Wellbeing"
          },
          {
            "code": "06.4.3",
            "title": "Redundancy and Termination Done Properly"
          },
          {
            "code": "06.4.4",
            "title": "Culture, Engagement and Retention"
          }
        ]
      }
    ]
  },
  {
    "code": "PRI-07",
    "title": "Project & Programme Management",
    "audience": "L2–L3 · Project managers, delivery leads, PMO staff",
    "courses": [
      {
        "code": "PRI-07.1",
        "title": "Project Fundamentals",
        "lessons": [
          {
            "code": "07.1.1",
            "title": "What Makes Something a Project"
          },
          {
            "code": "07.1.2",
            "title": "Project Lifecycle and Governance"
          },
          {
            "code": "07.1.3",
            "title": "Business Case and Benefits"
          },
          {
            "code": "07.1.4",
            "title": "Roles: Sponsor, Manager, Team"
          }
        ]
      },
      {
        "code": "PRI-07.2",
        "title": "Planning and Delivery",
        "lessons": [
          {
            "code": "07.2.1",
            "title": "Scope and Work Breakdown Structure"
          },
          {
            "code": "07.2.2",
            "title": "Scheduling, Dependencies and Critical Path"
          },
          {
            "code": "07.2.3",
            "title": "Budgeting and Resource Planning"
          },
          {
            "code": "07.2.4",
            "title": "Procurement and Vendor Management"
          }
        ]
      },
      {
        "code": "PRI-07.3",
        "title": "Control and Risk",
        "lessons": [
          {
            "code": "07.3.1",
            "title": "Risk and Issue Management (RAID)"
          },
          {
            "code": "07.3.2",
            "title": "Change Control"
          },
          {
            "code": "07.3.3",
            "title": "Progress Tracking and Reporting"
          },
          {
            "code": "07.3.4",
            "title": "Quality Management"
          }
        ]
      },
      {
        "code": "PRI-07.4",
        "title": "Agile and Modern Delivery",
        "lessons": [
          {
            "code": "07.4.1",
            "title": "Agile Principles and Scrum"
          },
          {
            "code": "07.4.2",
            "title": "Kanban and Flow"
          },
          {
            "code": "07.4.3",
            "title": "Delivery Tooling with Jira"
          },
          {
            "code": "07.4.4",
            "title": "Choosing Between Agile and Waterfall"
          }
        ]
      },
      {
        "code": "PRI-07.5",
        "title": "Programme and Portfolio (L3)",
        "lessons": [
          {
            "code": "07.5.1",
            "title": "Programme Management Fundamentals"
          },
          {
            "code": "07.5.2",
            "title": "Benefits Realisation"
          },
          {
            "code": "07.5.3",
            "title": "Portfolio Prioritisation"
          },
          {
            "code": "07.5.4",
            "title": "Setting Up and Running a PMO"
          }
        ]
      }
    ]
  },
  {
    "code": "PRI-08",
    "title": "Data & Analytics",
    "audience": "L1–L3 · Analysts, managers, anyone working with numbers",
    "courses": [
      {
        "code": "PRI-08.1",
        "title": "Data Literacy",
        "lessons": [
          {
            "code": "08.1.1",
            "title": "Understanding Data and Data Types"
          },
          {
            "code": "08.1.2",
            "title": "Reading Charts Critically"
          },
          {
            "code": "08.1.3",
            "title": "Descriptive Statistics Without Fear"
          },
          {
            "code": "08.1.4",
            "title": "Making Data-Informed Decisions"
          }
        ]
      },
      {
        "code": "PRI-08.2",
        "title": "Excel for Analysis",
        "lessons": [
          {
            "code": "08.2.1",
            "title": "Cleaning and Structuring Data"
          },
          {
            "code": "08.2.2",
            "title": "Lookup and Reference Functions"
          },
          {
            "code": "08.2.3",
            "title": "Pivot Tables and Summarisation"
          },
          {
            "code": "08.2.4",
            "title": "Dashboards and Conditional Formatting"
          },
          {
            "code": "08.2.5",
            "title": "Power Query Basics"
          }
        ]
      },
      {
        "code": "PRI-08.3",
        "title": "Business Intelligence",
        "lessons": [
          {
            "code": "08.3.1",
            "title": "Introduction to Power BI"
          },
          {
            "code": "08.3.2",
            "title": "Data Modelling and Relationships"
          },
          {
            "code": "08.3.3",
            "title": "DAX Essentials"
          },
          {
            "code": "08.3.4",
            "title": "Designing Effective Dashboards"
          },
          {
            "code": "08.3.5",
            "title": "Publishing, Sharing and Row-Level Security"
          }
        ]
      },
      {
        "code": "PRI-08.4",
        "title": "Databases and SQL",
        "lessons": [
          {
            "code": "08.4.1",
            "title": "Relational Database Concepts"
          },
          {
            "code": "08.4.2",
            "title": "SELECT, WHERE and ORDER BY"
          },
          {
            "code": "08.4.3",
            "title": "Joins Across Tables"
          },
          {
            "code": "08.4.4",
            "title": "Aggregation and Grouping"
          },
          {
            "code": "08.4.5",
            "title": "Subqueries and Common Table Expressions"
          }
        ]
      },
      {
        "code": "PRI-08.5",
        "title": "Advanced Analytics (L3)",
        "lessons": [
          {
            "code": "08.5.1",
            "title": "Python for Data Analysis with pandas"
          },
          {
            "code": "08.5.2",
            "title": "Data Visualisation in Python"
          },
          {
            "code": "08.5.3",
            "title": "Introduction to Statistical Modelling"
          },
          {
            "code": "08.5.4",
            "title": "Machine Learning Concepts for Business"
          }
        ]
      }
    ]
  },
  {
    "code": "PRI-09",
    "title": "Technology, Cloud & Infrastructure",
    "audience": "L2–L3 · IT staff, systems administrators, technical teams",
    "courses": [
      {
        "code": "PRI-09.1",
        "title": "IT Foundations",
        "lessons": [
          {
            "code": "09.1.1",
            "title": "How Computers and Networks Work"
          },
          {
            "code": "09.1.2",
            "title": "Operating Systems and Virtualisation"
          },
          {
            "code": "09.1.3",
            "title": "Storage and Backup Fundamentals"
          },
          {
            "code": "09.1.4",
            "title": "Hardware and Asset Lifecycle"
          }
        ]
      },
      {
        "code": "PRI-09.2",
        "title": "Cloud Computing",
        "lessons": [
          {
            "code": "09.2.1",
            "title": "Cloud Concepts and Service Models"
          },
          {
            "code": "09.2.2",
            "title": "AWS Core Services"
          },
          {
            "code": "09.2.3",
            "title": "Microsoft Azure Core Services"
          },
          {
            "code": "09.2.4",
            "title": "Hybrid and On-Premises Infrastructure"
          },
          {
            "code": "09.2.5",
            "title": "Cloud Cost Management and FinOps"
          }
        ]
      },
      {
        "code": "PRI-09.3",
        "title": "IT Service Management",
        "lessons": [
          {
            "code": "09.3.1",
            "title": "ITIL Concepts and the Service Lifecycle"
          },
          {
            "code": "09.3.2",
            "title": "Service Desk Operations"
          },
          {
            "code": "09.3.3",
            "title": "Incident, Problem and Change Management"
          },
          {
            "code": "09.3.4",
            "title": "SLAs, Reporting and Continual Improvement"
          },
          {
            "code": "09.3.5",
            "title": "Asset and Configuration Management"
          }
        ]
      },
      {
        "code": "PRI-09.4",
        "title": "Software and Automation (L3)",
        "lessons": [
          {
            "code": "09.4.1",
            "title": "Introduction to Programming"
          },
          {
            "code": "09.4.2",
            "title": "Version Control With Git"
          },
          {
            "code": "09.4.3",
            "title": "APIs and Integration Basics"
          },
          {
            "code": "09.4.4",
            "title": "Infrastructure as Code"
          },
          {
            "code": "09.4.5",
            "title": "CI/CD and DevOps Fundamentals"
          }
        ]
      }
    ]
  },
  {
    "code": "PRI-10",
    "title": "Cybersecurity & Information Security",
    "audience": "L1–L3 · All staff (M1) through to security specialists (M5)",
    "courses": [
      {
        "code": "PRI-10.1",
        "title": "Security Awareness (L1)",
        "lessons": [
          {
            "code": "10.1.1",
            "title": "The Threat Landscape in Nigeria"
          },
          {
            "code": "10.1.2",
            "title": "Phishing, Smishing and Social Engineering"
          },
          {
            "code": "10.1.3",
            "title": "Passwords, MFA and Account Security"
          },
          {
            "code": "10.1.4",
            "title": "Safe Remote and Mobile Working"
          },
          {
            "code": "10.1.5",
            "title": "Reporting Suspicious Activity"
          }
        ]
      },
      {
        "code": "PRI-10.2",
        "title": "Security Fundamentals (L2)",
        "lessons": [
          {
            "code": "10.2.1",
            "title": "The CIA Triad and Security Principles"
          },
          {
            "code": "10.2.2",
            "title": "Identity and Access Management"
          },
          {
            "code": "10.2.3",
            "title": "Network Security Basics"
          },
          {
            "code": "10.2.4",
            "title": "Encryption and Key Management"
          },
          {
            "code": "10.2.5",
            "title": "Endpoint and Email Security"
          }
        ]
      },
      {
        "code": "PRI-10.3",
        "title": "Governance, Risk and Compliance",
        "lessons": [
          {
            "code": "10.3.1",
            "title": "Information Security Policy and Standards"
          },
          {
            "code": "10.3.2",
            "title": "ISO 27001 Overview"
          },
          {
            "code": "10.3.3",
            "title": "Security Risk Assessment"
          },
          {
            "code": "10.3.4",
            "title": "Third-Party and Supply Chain Risk"
          },
          {
            "code": "10.3.5",
            "title": "Audit and Evidence"
          }
        ]
      },
      {
        "code": "PRI-10.4",
        "title": "Data Protection",
        "lessons": [
          {
            "code": "10.4.1",
            "title": "NDPA for Private Organisations"
          },
          {
            "code": "10.4.2",
            "title": "Appointing and Supporting a DPO"
          },
          {
            "code": "10.4.3",
            "title": "Data Mapping and Records of Processing"
          },
          {
            "code": "10.4.4",
            "title": "DPIAs and Privacy by Design"
          },
          {
            "code": "10.4.5",
            "title": "Breach Response and Notification"
          }
        ]
      },
      {
        "code": "PRI-10.5",
        "title": "Security Operations (L3)",
        "lessons": [
          {
            "code": "10.5.1",
            "title": "Security Monitoring and SIEM"
          },
          {
            "code": "10.5.2",
            "title": "Vulnerability Management"
          },
          {
            "code": "10.5.3",
            "title": "Incident Response Planning"
          },
          {
            "code": "10.5.4",
            "title": "Business Continuity and Disaster Recovery"
          },
          {
            "code": "10.5.5",
            "title": "Running a Tabletop Exercise"
          }
        ]
      }
    ]
  },
  {
    "code": "PRI-11",
    "title": "Customer Experience & Service Operations",
    "audience": "L1–L2 · Contact centres, retail, hospitality, service businesses",
    "courses": [
      {
        "code": "PRI-11.1",
        "title": "Customer Service Foundations",
        "lessons": [
          {
            "code": "11.1.1",
            "title": "What Customers Actually Value"
          },
          {
            "code": "11.1.2",
            "title": "Service Standards and Expectations"
          },
          {
            "code": "11.1.3",
            "title": "Communicating Across Channels"
          },
          {
            "code": "11.1.4",
            "title": "Service Recovery After Failure"
          }
        ]
      },
      {
        "code": "PRI-11.2",
        "title": "Managing Difficult Situations",
        "lessons": [
          {
            "code": "11.2.1",
            "title": "Handling Complaints Professionally"
          },
          {
            "code": "11.2.2",
            "title": "De-escalation Techniques"
          },
          {
            "code": "11.2.3",
            "title": "Managing Difficult Customers"
          },
          {
            "code": "11.2.4",
            "title": "Emotional Resilience in Service Roles"
          }
        ]
      },
      {
        "code": "PRI-11.3",
        "title": "Service Operations",
        "lessons": [
          {
            "code": "11.3.1",
            "title": "Designing Service Processes"
          },
          {
            "code": "11.3.2",
            "title": "Capacity, Queuing and Scheduling"
          },
          {
            "code": "11.3.3",
            "title": "Contact Centre Fundamentals"
          },
          {
            "code": "11.3.4",
            "title": "Quality Monitoring and Coaching"
          }
        ]
      },
      {
        "code": "PRI-11.4",
        "title": "Experience Strategy (L2)",
        "lessons": [
          {
            "code": "11.4.1",
            "title": "Customer Journey Mapping"
          },
          {
            "code": "11.4.2",
            "title": "Voice of the Customer Programmes"
          },
          {
            "code": "11.4.3",
            "title": "NPS, CSAT and Service Metrics"
          },
          {
            "code": "11.4.4",
            "title": "Building a Customer-Centric Culture"
          }
        ]
      }
    ]
  },
  {
    "code": "X-01",
    "title": "Digital Workplace Foundations",
    "audience": "L1 · Universal entry path for low digital confidence",
    "courses": [
      {
        "code": "X-01.1",
        "title": "Getting Started With Technology",
        "lessons": [
          {
            "code": "01.1.1",
            "title": "Computer and Device Basics"
          },
          {
            "code": "01.1.2",
            "title": "Files, Folders and Storage"
          },
          {
            "code": "01.1.3",
            "title": "Internet, Browsers and Search"
          },
          {
            "code": "01.1.4",
            "title": "Troubleshooting and Getting Help"
          }
        ]
      },
      {
        "code": "X-01.2",
        "title": "Microsoft Word",
        "lessons": [
          {
            "code": "01.2.1",
            "title": "Creating and Formatting Documents"
          },
          {
            "code": "01.2.2",
            "title": "Styles, Headings and Templates"
          },
          {
            "code": "01.2.3",
            "title": "Tables, Images and Layout"
          },
          {
            "code": "01.2.4",
            "title": "Review, Comments and Track Changes"
          },
          {
            "code": "01.2.5",
            "title": "Mail Merge and Printing"
          }
        ]
      },
      {
        "code": "X-01.3",
        "title": "Microsoft Excel",
        "lessons": [
          {
            "code": "01.3.1",
            "title": "Workbook and Worksheet Basics"
          },
          {
            "code": "01.3.2",
            "title": "Formulas and Core Functions"
          },
          {
            "code": "01.3.3",
            "title": "Formatting and Tables"
          },
          {
            "code": "01.3.4",
            "title": "Sorting, Filtering and Charts"
          }
        ]
      },
      {
        "code": "X-01.4",
        "title": "Microsoft PowerPoint",
        "lessons": [
          {
            "code": "01.4.1",
            "title": "Building a Deck"
          },
          {
            "code": "01.4.2",
            "title": "Slide Masters and Layouts"
          },
          {
            "code": "01.4.3",
            "title": "Visuals, Charts and Diagrams"
          },
          {
            "code": "01.4.4",
            "title": "Delivering and Sharing"
          }
        ]
      },
      {
        "code": "X-01.5",
        "title": "Collaboration and Communication",
        "lessons": [
          {
            "code": "01.5.1",
            "title": "Professional Email"
          },
          {
            "code": "01.5.2",
            "title": "Calendar and Meeting Management"
          },
          {
            "code": "01.5.3",
            "title": "Teams and Google Workspace"
          },
          {
            "code": "01.5.4",
            "title": "Shared Drives and Co-authoring"
          },
          {
            "code": "01.5.5",
            "title": "Virtual Meeting Etiquette"
          }
        ]
      }
    ]
  },
  {
    "code": "X-02",
    "title": "Professional & Personal Effectiveness",
    "audience": "L1–L2 · Every learner, every sector",
    "courses": [
      {
        "code": "X-02.1",
        "title": "Communication",
        "lessons": [
          {
            "code": "02.1.1",
            "title": "Clear Written Communication"
          },
          {
            "code": "02.1.2",
            "title": "Report and Memo Writing"
          },
          {
            "code": "02.1.3",
            "title": "Active Listening"
          },
          {
            "code": "02.1.4",
            "title": "Difficult Conversations"
          },
          {
            "code": "02.1.5",
            "title": "Cross-Cultural Communication"
          }
        ]
      },
      {
        "code": "X-02.2",
        "title": "Presenting and Influencing",
        "lessons": [
          {
            "code": "02.2.1",
            "title": "Structuring a Presentation"
          },
          {
            "code": "02.2.2",
            "title": "Slide Design Principles"
          },
          {
            "code": "02.2.3",
            "title": "Delivery, Voice and Body Language"
          },
          {
            "code": "02.2.4",
            "title": "Handling Questions"
          },
          {
            "code": "02.2.5",
            "title": "Presenting Virtually"
          }
        ]
      },
      {
        "code": "X-02.3",
        "title": "Productivity",
        "lessons": [
          {
            "code": "02.3.1",
            "title": "Prioritisation and Planning"
          },
          {
            "code": "02.3.2",
            "title": "Managing Email and Interruptions"
          },
          {
            "code": "02.3.3",
            "title": "Running Effective Meetings"
          },
          {
            "code": "02.3.4",
            "title": "Personal Productivity Tools"
          }
        ]
      },
      {
        "code": "X-02.4",
        "title": "Thinking and Problem Solving",
        "lessons": [
          {
            "code": "02.4.1",
            "title": "Critical Thinking Fundamentals"
          },
          {
            "code": "02.4.2",
            "title": "Root Cause Analysis"
          },
          {
            "code": "02.4.3",
            "title": "Structured Decision Making"
          },
          {
            "code": "02.4.4",
            "title": "Creativity and Idea Generation"
          }
        ]
      },
      {
        "code": "X-02.5",
        "title": "Wellbeing and Growth",
        "lessons": [
          {
            "code": "02.5.1",
            "title": "Emotional Intelligence"
          },
          {
            "code": "02.5.2",
            "title": "Managing Stress and Burnout"
          },
          {
            "code": "02.5.3",
            "title": "Building Professional Networks"
          },
          {
            "code": "02.5.4",
            "title": "Career Planning and Self-Development"
          }
        ]
      }
    ]
  },
  {
    "code": "X-03",
    "title": "AI & Emerging Technology",
    "audience": "L1–L2 · The attention-winning path; sells the whole catalogue",
    "courses": [
      {
        "code": "X-03.1",
        "title": "Understanding AI",
        "lessons": [
          {
            "code": "03.1.1",
            "title": "What AI Is and Is Not"
          },
          {
            "code": "03.1.2",
            "title": "How Generative AI Works, in Plain English"
          },
          {
            "code": "03.1.3",
            "title": "Where AI Adds Real Value"
          },
          {
            "code": "03.1.4",
            "title": "Limitations, Bias and Hallucination"
          }
        ]
      },
      {
        "code": "X-03.2",
        "title": "Using AI at Work",
        "lessons": [
          {
            "code": "03.2.1",
            "title": "Prompting Fundamentals"
          },
          {
            "code": "03.2.2",
            "title": "Drafting, Summarising and Editing"
          },
          {
            "code": "03.2.3",
            "title": "Research and Analysis With AI"
          },
          {
            "code": "03.2.4",
            "title": "Verifying and Fact-Checking Output"
          }
        ]
      },
      {
        "code": "X-03.3",
        "title": "Responsible AI",
        "lessons": [
          {
            "code": "03.3.1",
            "title": "Confidentiality: What Never to Paste"
          },
          {
            "code": "03.3.2",
            "title": "AI and the NDPA"
          },
          {
            "code": "03.3.3",
            "title": "Building an Organisational AI Policy"
          },
          {
            "code": "03.3.4",
            "title": "Ethical Use and Disclosure"
          }
        ]
      },
      {
        "code": "X-03.4",
        "title": "Automation and the Future",
        "lessons": [
          {
            "code": "03.4.1",
            "title": "Process Mapping and Automation Candidates"
          },
          {
            "code": "03.4.2",
            "title": "Low-Code and No-Code Tools"
          },
          {
            "code": "03.4.3",
            "title": "AI Agents and Workflow Automation"
          },
          {
            "code": "03.4.4",
            "title": "Preparing Your Workforce for AI"
          }
        ]
      }
    ]
  }
];
