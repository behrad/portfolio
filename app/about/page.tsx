import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  const experiences = [
    {
      title: "CTO",
      company: "Sazito",
      period: "2023–2025",
      description:
        "Led architecture and development of a new Go‑based marketing automation engine generating 10% company revenue in year 1. Modernized, stabilized, and optimized the legacy Go e‑commerce platform to handle high‑traffic events with tens of thousands of daily orders. Rebuilt the engineering team, introduced delivery processes, and improved engineering velocity and code quality. Architected and shipped Zishop, a B2C product search & discovery mobile app",
    },
    {
      title: "Technical Mentor",
      company: "Philia",
      period: "2024",
      description:
        "Guided the scaling of their customer‑club and segmentation platform to 1B+ monthly events. Designed real‑time workflow and segmentation engine using Python and event‑driven patterns. Mentored engineering team on scaling, reliability, and architectural decision‑making. Architected the data layer (ClickHouse) and microservices structure",
    },
    {
      title: "Engineering Manager & Technical Mentor",
      company: "Adanic",
      period: "2022–2023",
      description:
        "Advised product and engineering leadership on Agile processes and roadmap execution. Guided domain modeling, technical design reviews, and system architecture improvements. Mentored backend and frontend engineers on functional programming and problem‑solving",
    },
    {
      title: "CTO & Systems Architect",
      company: "Logistic Bazaar",
      period: "2020–2022",
      description:
        "Architected Pardis, a no‑code orchestration/workflow platform tested with 100+ services and 1000+ concurrent flows. Designed execution engine, gateway integration, and internal service communication model. Led technical direction and mentored engineering team across backend and frontend",
    },
    {
      title: "Founder & CTO",
      company: "Chabok (Marketing Automation SaaS)",
      period: "2017–2020",
      description:
        "Founded and built a marketing automation platform processing 100M+ events/month. Responsible for business strategy, sales, team building, product leadership, and technical direction. Grew the business to break-even within 18 months. Scaled to 5 SDKs for multiple client platforms, serving ~100M events/month and 10M MAU for top customers",
    },
    {
      title: "Technical Lead",
      company: "Atieh Dadeh Pardaz",
      period: "2014–2017",
      description:
        "Rebuilt the SMS gateway using Scala/Akka to handle ~2,000 msg/sec. Led a 10‑person team to build the Navad (90) TV show app, scaling to 3.5M MAU and 210k concurrent users. Designed backend architecture for high‑traffic peak events and real‑time interactions. Delivered real‑time push notification systems for enterprise/banking clients",
    },
    {
      title: "Technical Mentor",
      company: "Avval Market",
      period: "2015–2016",
      description:
        "Guided microservices redesign and improved domain boundaries. Supported adoption of Agile processes and architecture decision‑making",
    },
    {
      title: "Senior Software Engineer",
      company: "Basamad AC&C",
      period: "2005–2014",
      description:
        "Lead developer for Java/SIP Call Manager supporting 100+ concurrent calls; deployed to nationwide call-centers. Built reporting engine using Python/Node.js/CouchDB. Developed Erlang modules for FreeSWITCH integrations",
    },
    {
      title: "Java Developer",
      company: "ObjectJ (Javaneh Software)",
      period: "2003–2005",
      description:
        "Developed a web‑based accounting and parts‑management module for Emdad Khordro as part of a large J2EE system (JSP/JS)",
    },
  ]

  const skills = [
    "Engineering Leadership, Team Building, Talent Development",
    "Technical Mentorship & Coaching, Cross‑functional Alignment (Product × Engineering)",
    "Technical Strategy, Architecture Vision, System Design",
    "Distributed Systems, High‑Availability, Scalability",
    "Microservices, Event‑Driven Architecture, Real‑time Processing",
    "Multitenant SaaS Architecture",
    "Cloud/DevOps, CI/CD, Observability, SRE Practices",
    "Product Strategy, Data‑Driven Decision Making, Growth/Retention Systems",
    "Marketing Automation Platforms, Customer Segmentation Engines",
    "Realtime workflow engines, low-code & no-code automation",
    "Startup Leadership, Fractional CTO Advisory",
  ]

  const executiveSummary = "Technology leader and startup founder with extensive experience building scalable platforms, leading engineering teams, and shaping long‑term technical strategy. Blends deep architectural expertise with product thinking and team‑building leadership, enabling organizations to transform underperforming systems into resilient, scalable platforms. Skilled at shaping engineering culture, accelerating delivery velocity, and aligning technology decisions with business growth goals."

  const achievements = [
    "Built or scaled multiple platforms to millions of active users, creating new revenue streams.",
    "Led engineering teams, improving delivery speed, quality & technical decision‑making.",
    "Built one of Iran's largest marketing automation platforms, competing directly with foreign vendors in scale and capability.",
    "Delivered one of Iran's highest-traffic second-screen TV (Navad-90) engagement platforms.",
    "Stabilized and modernized legacy e-commerce infrastructure for Black Friday traffic.",
    "Architected real-time CRDT-based data warehouse, unlocked company-wide analytics and data-driven business growth.",
    "Delivered a production-grade SIP Call Manager, achieved robust scalability and reliable real-time call processing in mission-critical environments",
  ]

  const talksAndEvents = [
    { year: "2021–2024", title: "Technical Mentorship & Advisory", description: "Served as a technical mentor and advisor for multiple software companies, helping engineering teams improve system design, scalability, delivery processes, and architectural decision-making." },
    { year: "2024", title: "TechTalk Conference", description: "Delivered a technical talk on 'Architectural Patterns for Scalability', covering resilient distributed systems, high‑traffic handling, and modernization strategies." },
    { year: "2021", title: "Martech Podcast", description: "Featured as a guest on the MarTech Podcast discussing the state of Marketing Automation in Iran, ecosystem maturity, and growth patterns." },
    { year: "2014–2019", title: "Github Open Source Contribution", description: "Active contributor to multiple open‑source projects on GitHub, delivering bug fixes and architectural improvements. Engaged with international developer communities through pull requests, issue discussions, and collaborative code reviews." },
    { year: "2020", title: "Dehban Digital Marketing Program", description: "Invited as a guest lecturer teaching Marketing Automation and customer‑lifecycle strategies." },    
    { year: "2019", title: "Sharif University — Growth Leaders Summit", description: "Speaker presenting 'Advantages of Mobile Marketing Automation for Scaling Apps'." },
    { year: "2019", title: "Sharif University — Mobile Marketing Course", description: "Instructor for the Mobile Marketing Program, teaching mobile growth strategies, analytics, and automation frameworks." },
    { year: "2019", title: "Startup House of Karaj", description: "Conducted a workshop on Mobile App Growth & Marketing, focusing on acquisition, retention, and engagement loops." },
    { year: "2018", title: "ELECOMP 2018", description: "Speaker on technical challenges faced by early‑stage startups, covering scalability pitfalls, team formation, and MVP architecture." },
  ]

  const teachingExperience = [
    { period: "2025-now", company: "Behrad Tech", description: "Teaching System Design, Code Design, DDD, Type-based Modeling & software architecture" },
    { period: "2016–2024", company: "MFT (Technical Complex)", description: "Instructor teaching Java and Node.js for mid‑to‑senior‑level engineers." },
    { period: "2010s", company: "Corporate Training Programs", description: "Delivered multiple Java EE / J2EE courses across several Iranian software companies." },
    { period: "Late 2000s", company: "University Teaching", description: "Islamic Azad University — Java Instructor; Payame Noor University — Instructor for Data Structures and Advanced C++ Programming" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Header Section */}
        <section className="relative overflow-hidden border-b border-border">
          <div aria-hidden="true" className="grid-backdrop pointer-events-none absolute inset-0" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-72 opacity-70"
            style={{
              background:
                "radial-gradient(50% 100% at 70% 0%, var(--accent-soft), transparent 70%)",
            }}
          />
          <div className="container relative mx-auto px-4 py-20">
            <div className="flex flex-col items-center gap-8 md:flex-row">
              <div className="flex-shrink-0">
                <div className="relative h-44 w-44 overflow-hidden rounded-full ring-1 ring-[var(--accent-border)] ring-offset-4 ring-offset-background">
                  <Image src="/images/behrad.jpg" alt="بهراد زاری" fill className="object-cover" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-right">
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-border)] bg-[var(--accent-soft)] px-3 py-1 text-xs font-medium text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                  مهندس نرم‌افزار
                </span>
                <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                  بهراد زاری
                </h1>
                <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm md:justify-start">
                  <Link
                    href="https://www.linkedin.com/in/behradz/"
                    target="_blank"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    پروفایل لینکدین
                  </Link>
                  <Link
                    href="https://github.com/behrad"
                    target="_blank"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    پروفایل گیت‌هاب
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Executive Summary */}
        <section className="container mx-auto px-4 py-12" dir="ltr">
          <Card>
            <CardHeader className="text-left">
              <CardTitle className="text-2xl text-left">Executive Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-left">
              <p className="text-muted-foreground leading-relaxed text-pretty">{executiveSummary}</p>
            </CardContent>
          </Card>
        </section>

        {/* Key Achievements */}
        <section className="container mx-auto px-4 py-12" dir="ltr">
          <h2 className="text-3xl font-bold mb-8 text-left">Key Achievements</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <Card key={index}>
                <CardContent className="pt-6 text-left">
                  <p className="text-muted-foreground leading-relaxed">{achievement}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Professional Experience */}
        <section className="container mx-auto px-4 py-12" dir="ltr">
          <h2 className="text-3xl font-bold mb-8 text-left">Professional Experience</h2>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <Card key={index}>
                <CardHeader className="text-left">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div className="text-left">
                      <CardTitle className="text-xl">{exp.title}</CardTitle>
                      <p className="text-primary font-medium mt-1">{exp.company}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">{exp.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="text-left">
                  <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="bg-secondary/30 py-12" dir="ltr">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-left">Core Skills</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {skills.map((skill, index) => (
                <Card key={index}>
                  <CardContent className="pt-6 text-left">
                    <p className="text-muted-foreground leading-relaxed">{skill}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Talks & Events */}
        <section className="container mx-auto px-4 py-12" dir="ltr">
          <h2 className="text-3xl font-bold mb-8 text-left">Talks, Events & Community</h2>
          <div className="space-y-6">
            {talksAndEvents.map((event, index) => (
              <Card key={index}>
                <CardHeader className="text-left">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div className="text-left">
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                      <p className="text-primary font-medium mt-1">{event.year}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="text-left">
                  <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Teaching Experience */}
        <section className="container mx-auto px-4 py-12" dir="ltr">
          <h2 className="text-3xl font-bold mb-8 text-left">Teaching Experience</h2>
          <div className="space-y-6">
            {teachingExperience.map((teaching, index) => (
              <Card key={index}>
                <CardHeader className="text-left">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div className="text-left">
                      <CardTitle className="text-xl">{teaching.company}</CardTitle>
                      <p className="text-primary font-medium mt-1">{teaching.period}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="text-left">
                  <p className="text-muted-foreground leading-relaxed">{teaching.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="container mx-auto px-4 py-12" dir="ltr">
          <h2 className="text-3xl font-bold mb-8 text-left">Education</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader className="text-left">
                <CardTitle className="text-xl">MSc, Software Engineering</CardTitle>
                <p className="text-primary font-medium mt-1">Sharif University of Technology</p>
              </CardHeader>
              <CardContent className="text-left">
                <p className="text-muted-foreground">Thesis: Towards an Agile Core Methodology for Software Development</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="text-left">
                <CardTitle className="text-xl">BSc, Software Engineering</CardTitle>
                <p className="text-primary font-medium mt-1">Azad University, Central Tehran Branch</p>
              </CardHeader>
              <CardContent className="text-left">
                <p className="text-muted-foreground">Project: SOA-based National Health Portal</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden border-t border-border bg-card">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-48 opacity-50"
            style={{
              background:
                "radial-gradient(60% 100% at 50% 100%, var(--accent-soft), transparent 70%)",
            }}
          />
          <div className="container relative mx-auto max-w-2xl px-4 py-20 text-center">
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              سوال یا نیاز به مشاوره دارید؟
            </h2>
            <p className="mx-auto mb-8 max-w-[60ch] text-base leading-8 text-muted-foreground">
              برای اطلاعات بیشتر با من تماس بگیرید
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-lg px-8 shadow-none">
                <Link href="mailto:behradz@gmail.com">تماس از طریق ایمیل</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-lg border-[var(--border-strong)] bg-transparent px-8 text-foreground hover:border-primary hover:text-primary"
              >
                <Link href="https://t.me/bzari" target="_blank">
                  تماس از طریق تلگرام
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
