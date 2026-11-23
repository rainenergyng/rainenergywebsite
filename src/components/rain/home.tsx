import { Button } from "@/components/ui/button";
import { images } from "@/data/content";
import {
  Layout,
  SectionHeading,
  QuoteButton,
  Reveal,
  why,
  ArrowUpRight,
  ShieldCheck,
  company,
  FaqSection,
} from "./shared";
import { FactsBand, HseRail, PipelineSchematic, ServiceExplorer } from "./interactive";
import { ArrowDown } from "lucide-react";

export function HomePage() {
  return (
    <Layout>
      <section className="home-hero">
        <img
          className="hero-photo"
          src={images.plant}
          alt="Rain Energy gas processing and pipeline infrastructure"
          width={1920}
          height={1024}
          fetchPriority="high"
        />
        <div className="container hero-content reveal">
          <div className="eyebrow">
            {company.tagline} • {company.experienceHeadline}
          </div>
          <h1>
            Bridging decades of expertise
            <br />
            with the <span>future of energy.</span>
          </h1>
          <p>{company.endToEnd}</p>
          <div className="hero-actions">
            <QuoteButton />
            <Button asChild variant="lightOutline">
              <a href="/services">
                Explore our services
                <ArrowUpRight />
              </a>
            </Button>
          </div>
        </div>
        <div className="container hero-bottom">
          <span>
            <ShieldCheck />
            {company.commitments.join(" • ")}
          </span>
          <span className="scroll-label">
            Explore our capabilities
            <ArrowDown />
          </span>
        </div>
      </section>

      <FactsBand />

      {/* Core Services Explorer */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Our capabilities"
            title="Six core service lines. One accountable team."
            href="/services"
            link="View all services"
          />
          <ServiceExplorer />
        </div>
      </section>

      {/* Why Rain Energy Split */}
      <section className="section section-muted">
        <div className="container split">
          <Reveal>
            <img
              src={images.engineer}
              alt="Nigerian engineer reviewing energy facility specifications"
              width={1024}
              height={1024}
              loading="lazy"
            />
          </Reveal>
          <Reveal delay={120}>
            <div className="eyebrow">Who We Are</div>
            <h2>
              New company.
              <br />
              20+ years founder expertise.
            </h2>
            {company.whoWeAre.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="reasons">
              {why.map((r) => (
                <div className="reason" key={r.title}>
                  <r.icon />
                  <div>
                    <h3>{r.title}</h3>
                    <p>{r.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <a href="/about" className="text-link">
              Read our full company story
              <ArrowUpRight />
            </a>
          </Reveal>
        </div>
      </section>

      {/* Specialized Pipeline Interventions */}
      <section className="section dark-band blueprint">
        <div className="container">
          <SectionHeading
            eyebrow="Specialized pipeline works"
            title="Protecting critical energy infrastructure."
            href="/services/pipeline-works"
            link="Explore pipeline works"
          />
          <PipelineSchematic />
        </div>
      </section>

      {/* HSE Framework Preview */}
      <section className="section section-muted">
        <div className="container">
          <SectionHeading
            eyebrow="HSE & Compliance"
            title="Safety is non-negotiable."
            href="/hse-quality"
            link="Explore our HSE framework"
          />
          <HseRail />
        </div>
      </section>

      {/* Engineering Capabilities & Services FAQ */}
      <FaqSection />
    </Layout>
  );
}
