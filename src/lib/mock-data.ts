/**
 * Local mock content. ONLY `src/lib/posts.ts` may import this file —
 * components go through the helpers so this can be swapped for MongoDB later.
 *
 * Content is intentionally general: no fees, no legal claims, no guaranteed outcomes.
 */
import type { Author, Category, Country, Post } from "@/types/post";

export const categories: Category[] = [
  { id: "cat-student-visa", name: "Student Visa", slug: "student-visa" },
  { id: "cat-work-visa", name: "Work Visa", slug: "work-visa" },
  { id: "cat-immigration-news", name: "Immigration News", slug: "immigration-news" },
  { id: "cat-study-guides", name: "Study Abroad Guides", slug: "study-abroad-guides" },
  { id: "cat-scholarships", name: "Scholarships", slug: "scholarships" },
  { id: "cat-success-stories", name: "Success Stories", slug: "success-stories" },
];

export const countries: Country[] = [
  {
    id: "country-canada",
    name: "Canada",
    slug: "canada",
    flag: "🇨🇦",
    description: "Study permits, post-graduation work and pathways to settle.",
  },
  {
    id: "country-uk",
    name: "United Kingdom",
    slug: "uk",
    flag: "🇬🇧",
    description: "World-ranked universities and the Graduate Route after you finish.",
  },
  {
    id: "country-usa",
    name: "USA",
    slug: "usa",
    flag: "🇺🇸",
    description: "F-1 student visas, interview prep and practical training options.",
  },
  {
    id: "country-australia",
    name: "Australia",
    slug: "australia",
    flag: "🇦🇺",
    description: "Student visas, scholarships and the Genuine Student requirement.",
  },
  {
    id: "country-germany",
    name: "Germany",
    slug: "germany",
    flag: "🇩🇪",
    description: "Low-tuition public universities and the Opportunity Card for jobseekers.",
  },
  {
    id: "country-uae",
    name: "Dubai (UAE)",
    slug: "uae",
    flag: "🇦🇪",
    description: "Long-term residence options and work visas for skilled professionals.",
  },
];

const authors = {
  priya: {
    name: "Priya Malhotra",
    role: "Senior Visa Consultant",
    avatar: "https://i.pravatar.cc/100?u=priya-malhotra",
  },
  arjun: {
    name: "Arjun Mehta",
    role: "Study Abroad Counsellor",
    avatar: "https://i.pravatar.cc/100?u=arjun-mehta",
  },
  editorial: {
    name: "Monarch Editorial",
    role: "Immigration Content Team",
    avatar: "https://i.pravatar.cc/100?u=monarch-editorial",
  },
} satisfies Record<string, Author>;

const cat = (slug: string): Category => {
  const found = categories.find((c) => c.slug === slug);
  if (!found) throw new Error(`Unknown category: ${slug}`);
  return found;
};

const cover = (slug: string) => `https://picsum.photos/seed/${slug}/1200/800`;

export const posts: Post[] = [
  {
    id: "post-001",
    title: "Canada Study Permit 2026: Documents Checklist and Timeline",
    slug: "canada-study-permit-2026-documents-checklist",
    excerpt:
      "A step-by-step checklist of the documents most Canadian study permit applications need, plus a realistic timeline from offer letter to arrival.",
    coverImage: cover("canada-study-permit-2026-documents-checklist"),
    content: `## Start with your letter of acceptance
Your application begins with an acceptance letter from a Designated Learning Institution (DLI). Many applicants also need a provincial or territorial attestation letter — check whether it applies to your programme.

## Core documents
- Valid passport
- Letter of acceptance (and attestation letter, if required)
- Proof of financial support
- Statement of purpose
- Academic transcripts and language test results

## Plan your timeline
Processing times vary by season and country of application. Aim to apply as soon as you have your offer, and keep buffer time for biometrics and medicals.`,
    category: cat("student-visa"),
    countries: ["canada"],
    tags: ["study permit", "documents", "checklist"],
    author: authors.priya,
    publishedAt: "2026-11-17T09:00:00.000Z",
    status: "published",
    featured: true,
    readingTime: 8,
    seoTitle: "Canada Study Permit 2026 Checklist & Timeline for Indian Students",
    seoDescription:
      "Documents most Canadian study permit applications need and a realistic timeline from offer letter to arrival.",
  },
  {
    id: "post-002",
    title: "UK Graduate Route Explained: Stay and Work After Your Degree",
    slug: "uk-graduate-route-explained",
    excerpt:
      "How the Graduate Route lets international students stay in the UK to work or look for work after graduating — who is eligible and when to apply.",
    coverImage: cover("uk-graduate-route-explained"),
    content: `## What is the Graduate Route?
The Graduate Route is a post-study visa that lets eligible graduates stay in the UK to work or look for work without employer sponsorship.

## Who can apply
- You must be in the UK on a valid Student visa
- You must have successfully completed an eligible course
- Your university must have reported your completion to the Home Office

## Things to keep in mind
The length of stay depends on your qualification and the rules in force when you apply. Policy here is evolving, so confirm the current position before you plan your next step.`,
    category: cat("work-visa"),
    countries: ["uk"],
    tags: ["post-study work", "graduate route"],
    author: authors.arjun,
    publishedAt: "2026-11-13T09:00:00.000Z",
    status: "published",
    featured: false,
    readingTime: 6,
  },
  {
    id: "post-003",
    title: "Germany Opportunity Card: Who Qualifies and How to Apply",
    slug: "germany-opportunity-card-who-qualifies",
    excerpt:
      "Germany's points-based Opportunity Card lets skilled workers enter the country to look for a job. Here is how the points work and how to prepare.",
    coverImage: cover("germany-opportunity-card-who-qualifies"),
    content: `## A jobseeker permit for skilled workers
The Opportunity Card (Chancenkarte) allows qualified professionals to come to Germany to search for work.

## How points are awarded
Points are typically considered for:
- Recognised qualifications
- German or English language skills
- Professional experience
- Age and previous ties to Germany

## Before you apply
Get your qualifications assessed early and keep proof of funds ready. Requirements can change, so speak with an advisor before you book anything.`,
    category: cat("work-visa"),
    countries: ["germany"],
    tags: ["opportunity card", "jobseeker", "skilled workers"],
    author: authors.priya,
    publishedAt: "2026-11-09T09:00:00.000Z",
    status: "published",
    featured: false,
    readingTime: 7,
  },
  {
    id: "post-004",
    title: "Top Scholarships for Indian Students in Australia",
    slug: "top-scholarships-indian-students-australia",
    excerpt:
      "From government awards to university merit scholarships, these are the funding routes Indian students most often explore for study in Australia.",
    coverImage: cover("top-scholarships-indian-students-australia"),
    content: `## Where scholarships come from
- **Government programmes** such as Australia Awards and research training schemes
- **University scholarships** for academic merit, often applied automatically with your offer
- **Faculty and industry awards** for specific fields

## Build a strong application
Start early, tailor each essay to the scholarship's purpose, and keep transcripts and references ready. Deadlines usually fall months before the intake.`,
    category: cat("scholarships"),
    countries: ["australia"],
    tags: ["scholarships", "funding", "masters"],
    author: authors.arjun,
    publishedAt: "2026-11-05T09:00:00.000Z",
    status: "published",
    featured: false,
    readingTime: 6,
  },
  {
    id: "post-005",
    title: "Dubai Golden Visa: Eligibility for Professionals",
    slug: "dubai-golden-visa-eligibility-professionals",
    excerpt:
      "The UAE Golden Visa offers long-term residence to certain skilled professionals. Learn the eligibility categories and what documents are usually reviewed.",
    coverImage: cover("dubai-golden-visa-eligibility-professionals"),
    content: `## Long-term residence in the UAE
The Golden Visa is a long-term residence permit for selected groups, including some skilled professionals, investors and outstanding talents.

## What is usually reviewed
- Your professional classification and qualifications
- Employment contract and salary documentation
- Educational certificates, attested where required

## Our advice
Categories and thresholds are updated periodically. Confirm the latest criteria for your profession before you apply.`,
    category: cat("work-visa"),
    countries: ["uae"],
    tags: ["golden visa", "residence", "professionals"],
    author: authors.priya,
    publishedAt: "2026-10-31T09:00:00.000Z",
    status: "published",
    featured: false,
    readingTime: 5,
  },
  {
    id: "post-006",
    title: "USA F-1 Visa Interview: 10 Questions You Must Prepare For",
    slug: "usa-f1-visa-interview-questions",
    excerpt:
      "The F-1 interview is short, so every answer counts. Prepare for the ten questions consular officers ask most often — and how to answer honestly and clearly.",
    coverImage: cover("usa-f1-visa-interview-questions"),
    content: `## Why the interview matters
Your F-1 interview is your chance to show that you are a genuine student with clear plans.

## Questions to prepare
1. Why did you choose this university?
2. Why this course?
3. How will you fund your studies?
4. What are your plans after graduation?
5. Who is sponsoring you?

## How to answer
Be concise, be honest, and make sure your answers match your documents. Practise out loud — but don't memorise scripts.`,
    category: cat("student-visa"),
    countries: ["usa"],
    tags: ["f-1", "interview", "preparation"],
    author: authors.arjun,
    publishedAt: "2026-10-27T09:00:00.000Z",
    status: "published",
    featured: false,
    readingTime: 9,
  },
  {
    id: "post-007",
    title: "Canada, UK or Australia? Choosing Where to Do Your Master's",
    slug: "canada-uk-australia-choosing-masters-destination",
    excerpt:
      "Course length, post-study options, living costs and lifestyle all differ. A practical framework to compare the three most popular destinations side by side.",
    coverImage: cover("canada-uk-australia-choosing-masters-destination"),
    content: `## Compare what matters to you
- **Course length:** one-year and two-year master's options affect your total budget
- **Post-study work:** each country has its own rules for staying on after graduation
- **Cost of living:** varies widely by city, not just by country

## Make a shortlist
Rank your priorities first — career goals, budget, and long-term plans — then shortlist universities that fit.`,
    category: cat("study-abroad-guides"),
    countries: ["canada", "uk", "australia"],
    tags: ["masters", "comparison", "planning"],
    author: authors.arjun,
    publishedAt: "2026-10-22T09:00:00.000Z",
    status: "published",
    featured: false,
    readingTime: 10,
  },
  {
    id: "post-008",
    title: "Writing a Statement of Purpose That Visa Officers Actually Read",
    slug: "statement-of-purpose-visa-officers",
    excerpt:
      "A strong SOP connects your past, your course and your future plans. Here's a simple structure, common mistakes to avoid and how to keep it authentic.",
    coverImage: cover("statement-of-purpose-visa-officers"),
    content: `## A simple structure
1. Your academic and professional background
2. Why this course and this institution
3. How it fits your career plans
4. Your ties and plans after the course

## Common mistakes
- Copying templates from the internet
- Vague goals with no link to the course
- Contradicting your other documents

Write in your own voice. Specific, honest detail is far more convincing than impressive vocabulary.`,
    category: cat("study-abroad-guides"),
    countries: ["canada", "uk", "usa"],
    tags: ["sop", "writing", "applications"],
    author: authors.editorial,
    publishedAt: "2026-10-17T09:00:00.000Z",
    status: "published",
    featured: false,
    readingTime: 7,
  },
  {
    id: "post-009",
    title: "What Changing Student Visa Policies Mean for 2027 Intakes",
    slug: "student-visa-policy-changes-2027-intakes",
    excerpt:
      "Several popular destinations have been reviewing international student numbers and work rights. What applicants planning for 2027 should watch closely.",
    coverImage: cover("student-visa-policy-changes-2027-intakes"),
    content: `## A period of change
Governments in several major study destinations have been reviewing caps, financial requirements and post-study work options.

## What this means for you
- Apply early, as intake-specific limits can fill quickly
- Keep your finances well documented
- Choose institutions and courses that fit your profile closely

We track official announcements and will update our guides as rules are confirmed.`,
    category: cat("immigration-news"),
    countries: ["canada", "uk", "australia", "usa"],
    tags: ["policy", "2027 intake", "updates"],
    author: authors.editorial,
    publishedAt: "2026-10-12T09:00:00.000Z",
    status: "published",
    featured: false,
    readingTime: 5,
  },
  {
    id: "post-010",
    title: "From Pune to Toronto: How Riya Prepared a Confident Study Permit Application",
    slug: "pune-to-toronto-study-permit-story",
    excerpt:
      "Riya was worried about explaining a gap year. With careful documentation and a clear study plan, she submitted an application she felt sure of.",
    coverImage: cover("pune-to-toronto-study-permit-story"),
    content: `## The challenge
Riya had a one-year gap after her bachelor's and wasn't sure how to explain it.

## What we worked on together
- Documenting the gap with certificates from the courses and internship she completed
- A focused statement of purpose that linked her experience to her chosen programme
- Organising financial documents clearly

## The outcome
Riya is now studying in Toronto. Every case is different — but preparation makes a real difference.`,
    category: cat("success-stories"),
    countries: ["canada"],
    tags: ["success story", "study gap", "toronto"],
    author: authors.priya,
    publishedAt: "2026-10-07T09:00:00.000Z",
    status: "published",
    featured: false,
    readingTime: 4,
  },
  {
    id: "post-011",
    title: "Australia's Genuine Student Requirement: What Applicants Should Know",
    slug: "australia-genuine-student-requirement",
    excerpt:
      "The Genuine Student requirement asks applicants to show they intend to study in Australia. How to approach the questions with honest, specific answers.",
    coverImage: cover("australia-genuine-student-requirement"),
    content: `## What the requirement assesses
Applicants answer targeted questions about their circumstances, their course choice and how it benefits their future.

## Answering well
- Be specific about why this course and provider
- Explain how the course connects to your previous study or work
- Support your answers with documents

Generic or copied answers are easy to spot. Keep it personal and consistent.`,
    category: cat("immigration-news"),
    countries: ["australia"],
    tags: ["genuine student", "student visa", "australia"],
    author: authors.editorial,
    publishedAt: "2026-10-01T09:00:00.000Z",
    status: "published",
    featured: false,
    readingTime: 5,
  },
  {
    id: "post-012",
    title: "Funding Your Master's in Germany: DAAD and Other Scholarships",
    slug: "germany-masters-daad-scholarships",
    excerpt:
      "Germany's public universities are known for low tuition, but living costs still add up. An overview of DAAD and other scholarships worth exploring.",
    coverImage: cover("germany-masters-daad-scholarships"),
    content: `## Why scholarships still matter
Even with low or no tuition at many public universities, you'll need to plan for living costs.

## Where to look
- **DAAD** programmes for postgraduate study and research
- **Political and private foundations** that support international students
- **University-specific awards** for strong academic profiles

Check each scholarship's eligibility, language requirements and deadlines well in advance.`,
    category: cat("scholarships"),
    countries: ["germany"],
    tags: ["daad", "scholarships", "germany"],
    author: authors.arjun,
    publishedAt: "2026-09-25T09:00:00.000Z",
    status: "published",
    featured: false,
    readingTime: 6,
  },
  {
    // Draft — must never appear on the public site.
    id: "post-013",
    title: "Germany Student Visa Blocked Account: Step-by-Step (Draft)",
    slug: "germany-student-visa-blocked-account",
    excerpt: "DRAFT — work in progress on opening a blocked account for a German student visa.",
    coverImage: cover("germany-student-visa-blocked-account"),
    content: "## Draft\nOutline only.",
    category: cat("student-visa"),
    countries: ["germany"],
    tags: ["draft"],
    author: authors.editorial,
    publishedAt: "2026-11-19T09:00:00.000Z",
    status: "draft",
    featured: false,
    readingTime: 3,
  },
];
