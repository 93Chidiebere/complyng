<div align="center">

# ComplyNG

### Nigeria's AI-Powered NDPA 2023 Compliance Platform

*From one-time audit to continuous compliance operations*

[![Built with React](https://img.shields.io/badge/Built%20with-React-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Powered by Claude API](https://img.shields.io/badge/Powered%20by-Claude%20API-8B5CF6?style=flat-square)](https://anthropic.com)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat-square&logo=vercel)](https://vercel.com)
[![NDPA 2023](https://img.shields.io/badge/Aligned%20to-NDPA%202023-028090?style=flat-square)](https://ndpc.gov.ng)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

</div>

---

## The Problem

The Nigeria Data Protection Act 2023 (NDPA) creates binding compliance obligations for every organization that collects or processes the personal data of Nigerian residents — fintechs, edtechs, healthtech providers, HR platforms, and the vast majority of Nigerian SMEs and startups. These obligations include:

- Publishing a lawful, NDPA-compliant privacy notice
- Appointing a Data Protection Officer for qualifying organizations
- Conducting Data Protection Impact Assessments before high-risk processing activities
- Responding to data subject requests within **30 days**
- Notifying the NDPC within **72 hours** of a data breach
- Filing an annual data protection audit report

The Nigeria Data Protection Commission (NDPC) began active enforcement in 2024. Most Nigerian organizations are unknowingly exposed — not from negligence, but from the absence of affordable, Nigeria-specific compliance infrastructure.

**ComplyNG solves this.** It is a living compliance operating system that works continuously, across every dimension of NDPA exposure.

---

## What ComplyNG Does

### The Entry Point — Initial Audit
An organization uploads their privacy policy and completes a structured data inventory intake. The Claude API performs RAG-based analysis against the full NDPA 2023 text and NDPC guidance, returning:

- An overall **compliance score (0–100)**
- A prioritized list of gaps with specific NDPA section citations
- Severity ratings (HIGH / MEDIUM / LOW) for each gap
- A **30-day remediation roadmap** with clear actions per week

This populates a living compliance dashboard and seeds all 10 active modules.

### The Platform — 10 Compliance Modules

| Module | What It Does | Re-use Trigger |
|--------|-------------|----------------|
| **Regulatory Change Alerts** | Monitors NDPC publications and re-scores posture against new guidance | Every new NDPC circular or enforcement notice |
| **DSR Manager** | Tracks the 30-day response window for access, correction, deletion, and objection requests | Every incoming data subject request |
| **DPIA Generator** | Generates a full Data Protection Impact Assessment via Claude API | Every new product feature or high-risk processing activity |
| **Vendor Compliance Tracker** | Monitors DPA status, expiry dates, and NDPA adequacy of all data processors | Vendor policy changes or new processor added |
| **Breach Incident Response** | Guided NDPA Section 40 workflow — classify, assess, draft NDPC notification, track 72-hour clock | Any data security incident |
| **Staff Training Tracker** | NDPA training modules with quiz, completion tracking, and certificate generation | Annual renewal and new staff onboarding |
| **Consent Manager** | Captures, stores, and manages data subject consent with embeddable widget | Continuous — every user interaction requiring consent |
| **Breach Insurance Readiness** | Pre-builds the evidence documentation required for cyber insurance claims | Triggered and auto-populated by Breach and Training modules |
| **Data Transfer Assessor** | Checks every vendor against the NDPC adequacy list; generates SCC guidance for non-adequate countries | New vendor or vendor policy change |
| **Annual NDPC Filing** | Generates the mandatory annual data protection audit report, pre-filled from the dashboard's full-year activity log | Annual statutory obligation |

### Platform Depth Features
- **Privacy Policy Generator** — generates a complete, NDPA-compliant privacy policy from a 5-section intake form, merges in the organization's data inventory, and automatically closes related audit gaps
- **Obligation Calendar** — unified deadline view for all DSR windows, vendor renewals, NDPC filing dates, breach clocks, and training renewals with Google Calendar sync

---

## User Types & Portals

ComplyNG serves four distinct user types, each with a dedicated onboarding flow and dashboard:

| User Type | Portal | Primary Use Case |
|-----------|--------|-----------------|
| **Business / Organization** | `/dashboard` | Manage own NDPA compliance end-to-end |
| **DPCO Practitioner** | `/practitioner/dashboard` | Manage compliance for a portfolio of up to 50 client organizations |
| **Investor / VC Fund** | `/investor/dashboard` | Run read-only NDPA risk assessments on portfolio companies |
| **Compliance Consultant** | `/consultant/dashboard` | Provide managed compliance services via the platform |

---

## Market Expansion Features

### ComplyNG Verified Badge
Organizations that complete the full audit, close all HIGH severity gaps, and maintain an active subscription earn the **ComplyNG Verified — NDPA Compliant** badge. The badge is publicly verifiable at `complyng.io/verify/[org-id]` and available in HTML embed and React component formats for display on websites and apps.

### Sector-Specific Compliance Packs
NDPA compliance as the base layer, plus sector regulator obligations on top:
- **Fintech Pack** — CBN Consumer Protection Framework, NFIU AML/CFT retention rules, FCCPC consumer data rights, Open Banking obligations
- **Healthtech Pack** — NHIS patient data obligations, NAFDAC pharmacovigilance rules, telemedicine consent requirements
- **Edtech Pack** — Children's data enhanced protection, verifiable parental consent workflows, WAEC/NUC/JAMB data handling rules

### Developer API
```
POST https://api.complyng.io/v1/assess
```
Embed NDPA compliance checks directly into your product. One endpoint returns a compliance score, gap list, risk level, and required documentation checklist. Tiered pricing: Starter (free, 100 calls/month), Growth (₦25,000/month, 5,000 calls), Enterprise (custom).

### Compliance-as-a-Service
A fully managed tier where a vetted, NDPC-licensed DPCO consultant handles the client's compliance end-to-end. ComplyNG coordinates the engagement and takes a platform margin; the consultant manages all 10 modules on the client's behalf.

---

## Technical Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                 │
│   React + Vite · Tailwind CSS · React Router · Lucide Icons     │
│   Deployed on Vercel                                             │
└──────────────────────────────┬──────────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────────┐
│                       AI LAYER                                   │
│   Claude API (claude-sonnet-4-20250514)                          │
│   RAG over NDPA 2023 corpus + NDPC guidance                      │
│   Gap analysis · DPIA generation · Policy generation             │
│   DSR response drafting · Breach risk assessment                 │
└──────────────────────────────┬──────────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────────┐
│                       BACKEND (planned)                          │
│   Node.js + Express · Prisma ORM · PostgreSQL (Neon)            │
│   JWT auth · Zod validation · Resend email                       │
│   Vercel serverless functions                                    │
└─────────────────────────────────────────────────────────────────┘
```

### AI Integration
Every intelligent action in ComplyNG goes through the Claude API with a structured RAG pipeline:

- **Audit analysis** — NDPA 2023 full text is vector-indexed; the model reasons about obligation applicability per organization profile, not just keyword search
- **DPIA generation** — structured JSON output with risk assessment, compliance checklist, and recommendation (PROCEED / PROCEED WITH CONDITIONS / DO NOT PROCEED)
- **Policy generation** — plain-text, publication-ready privacy policy merged with the organization's live data inventory
- **DSR response drafting** — NDPA-compliant response letters tailored to request type and organization profile


### Demo Accounts

Four pre-seeded demo accounts are available immediately on first load — no registration required:

| Role | Email | Password |
|------|-------|----------|
| Business | business@demo.com | Demo1234! |
| Practitioner (DPCO) | practitioner@demo.com | Demo1234! |
| Investor | investor@demo.com | Demo1234! |
| Consultant | consultant@demo.com | Demo1234! |

---

## Project Structure

```
complyng/
├── public/
│   ├── favicon.ico
│   ├── favicon_32.png
│   ├── favicon_512.png
│   └── apple_touch_icon.png
├── src/
│   ├── lib/
│   │   ├── auth.js              # localStorage auth helpers
│   │   ├── claude.js            # Anthropic API wrapper
│   │   ├── scoring.js           # Compliance score engine
│   │   └── validators/          # Zod schemas per domain
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── onboard/
│   │   │   ├── Business.jsx
│   │   │   ├── Practitioner.jsx
│   │   │   ├── Investor.jsx
│   │   │   └── Consultant.jsx
│   │   ├── dashboard/           # Business user portal
│   │   │   ├── index.jsx
│   │   │   ├── dsr/
│   │   │   ├── dpia/
│   │   │   ├── vendor/
│   │   │   ├── breach/
│   │   │   ├── training/
│   │   │   ├── consent/
│   │   │   ├── insurance/
│   │   │   ├── transfers/
│   │   │   ├── calendar/
│   │   │   ├── policy-generator/
│   │   │   ├── annual-filing/
│   │   │   ├── sector-packs/
│   │   │   ├── verified-badge/
│   │   │   └── managed-service/
│   │   ├── practitioner/        # DPCO practitioner portal
│   │   ├── investor/            # Investor intelligence portal
│   │   ├── consultant/          # Consultant dashboard
│   │   └── api/                 # Developer API portal
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   └── Sidebar.jsx
│   │   └── ui/                  # Shared components
│   └── App.jsx                  # Router + route guards
├── prisma/
│   └── schema.prisma            # Full ORM schema (backend)
└── README.md
```

---

## Compliance Score Algorithm

The compliance score is a living metric that updates after every action:

```
Base score:        100
HIGH gap penalty:  -12 points each
MEDIUM gap penalty: -6 points each
LOW gap penalty:    -3 points each

Bonus points:
  Saved privacy policy:         +3
  Consent widget deployed:      +2
  ≥80% staff training complete: +5
  50–79% staff training:        +2

Final score = min(100, max(0, base - penalties + bonuses))
```

---

## Acknowledgements

- **Anthropic** — Claude API powering all AI-driven compliance analysis
- **NDPC** — Nigeria Data Protection Commission guidance and regulatory framework

---

<div align="center">

**ComplyNG** — *Compliance that never sleeps.*

Built in Nigeria. Built for Nigeria.

</div>