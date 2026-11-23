import { services, serviceHref, images } from "@/data/content";
import {
  Layout,
  PageHero,
  Reveal,
  SectionHeading,
  ServicesGrid,
  NotFound,
  CheckCircle2,
  ArrowUpRight,
  FaqSection,
} from "./shared";
import { PipelineSchematic } from "./interactive";

export function ServicesPage() {
  return (
    <Layout>
      <PageHero
        title="Integrated capability. Complete delivery."
        description="Six specialist service lines. One connected approach to Nigeria’s upstream and downstream energy projects."
        crumbs={[]}
        image={images.pipework}
      />
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Our capabilities"
            title="Expertise for every project phase."
            description="From the first design decision to final handover, our teams work together to turn complex requirements into reliable outcomes."
          />
          <ServicesGrid />
        </div>
      </section>

      <section className="section dark-band blueprint">
        <div className="container">
          <SectionHeading
            eyebrow="Specialized interventions"
            title="Six live-line and emergency pipeline methods."
            href="/services/pipeline-works"
            link="Pipeline works details"
          />
          <PipelineSchematic />
        </div>
      </section>

      <DeliverySteps />

      <FaqSection
        eyebrow="Technical FAQ"
        title="Frequently asked questions on our capabilities."
        description="Learn more about our turnkey EPIC&C delivery, specialized pipeline interventions, material traceability, and safety governance."
      />
    </Layout>
  );
}

export function DeliverySteps() {
  return (
    <section className="section section-muted">
      <div className="container">
        <SectionHeading eyebrow="How we deliver" title="Clear steps. Dependable outcomes." />
        <div className="steps">
          {[
            ["Assess", "Understand your objectives, site conditions and technical requirements."],
            ["Plan", "Develop the scope, schedule, resources and risk controls."],
            ["Execute", "Deliver coordinated work with active quality and safety oversight."],
            ["Hand over", "Verify performance and provide complete operational documentation."],
          ].map(([t, p], i) => (
            <Reveal className="step" key={t} delay={i * 70}>
              <strong>0{i + 1}</strong>
              <h3>{t}</h3>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicePage({ slug }: { slug?: string }) {
  const service = services.find((s) => s.slug === slug);
  if (!service) return <NotFound kind="service" to="/services" label="Explore all services" />;

  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <Layout>
      <PageHero
        title={service.name}
        crumbs={[{ label: "Services", to: "/services" }]}
        description={service.summary}
        image={service.image}
      />
      <section className="section">
        <div className="container split">
          <Reveal>
            <div className="eyebrow">{service.headline ?? "Technical capability"}</div>
            <h2>
              Expertise designed
              <br />
              around your operation.
            </h2>
            <p>{service.summary}</p>
            <h3 className="scope-heading">Core Scope of Delivery</h3>
            <ul className="scope-list">
              {service.points.map((point) => (
                <li key={point}>
                  <CheckCircle2 />
                  {point}
                </li>
              ))}
            </ul>
            {service.closing && <p className="lead-gold">{service.closing}</p>}
          </Reveal>
          <Reveal delay={120}>
            <img
              src={service.image}
              alt={`${service.name} capability at Rain Energy`}
              width={1536}
              height={1024}
              loading="lazy"
            />
          </Reveal>
        </div>
      </section>

      {service.slug === "pipeline-works" && (
        <section className="section dark-band blueprint">
          <div className="container">
            <SectionHeading
              eyebrow="Specialized interventions"
              title="Pipeline intervention schematic."
              description="Select any station along the line to inspect our six specialized field methods."
            />
            <PipelineSchematic />
          </div>
        </section>
      )}

      <DeliverySteps />

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Other capabilities"
            title="Explore our full service range."
            href="/services"
            link="All services"
          />
          <div className="services-grid">
            {others.slice(0, 3).map((s, i) => (
              <a className="service-card" href={serviceHref(s.slug)} key={s.slug}>
                <span className="card-number">0{i + 1}</span>
                <h3>{s.name}</h3>
                <p>{s.short}</p>
                <span className="text-link">
                  Learn more
                  <ArrowUpRight />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
