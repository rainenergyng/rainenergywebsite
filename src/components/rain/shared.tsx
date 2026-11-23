import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import {
  ArrowUpRight,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ShieldCheck,
  MessageCircle,
  Linkedin,
  Facebook,
  DraftingCompass,
  PackageSearch,
  Wrench,
  HardHat,
  Gauge,
  Flame,
  CheckCircle2,
  Users,
  Clock,
  Layers,
  Leaf,
  Award,
  FileCheck2,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { services, serviceHref, images, company, primaryPhone, faqs } from "@/data/content";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export const iconMap: Record<string, LucideIcon> = {
  epicc: DraftingCompass,
  "pipeline-works": Wrench,
  "civil-structural": HardHat,
  "electrical-instrumentation": Gauge,
  "fabrication-distribution": Flame,
  "operations-maintenance": PackageSearch,
};

export function RELogoMark({
  className = "w-9 h-9",
  color = "#FFFFFF",
  accentColor = "#C6A15B",
}: {
  className?: string;
  color?: string;
  accentColor?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M16 16H48C59 16 67 24 67 35C67 44.5 60.5 52.5 50.5 54L68 84H52L36 56H28V84H16V16ZM28 28V44H47C52 44 55 40.5 55 36C55 31.5 52 28 47 28H28Z"
        fill={color}
      />
      <path
        d="M60 20H86V30H60V20ZM56 40H84V50H56V40ZM50 63L63 84H77L64 63H50Z"
        fill={accentColor}
      />
    </svg>
  );
}

export function Wordmark() {
  return (
    <Link to="/" className="brand" aria-label="Rain Energy Limited Home">
      <RELogoMark className="w-10 h-10" color="#FFFFFF" accentColor="#C6A15B" />
      <div className="brand-titles">
        <span className="brand-name">RAIN</span>
        <span className="brand-sub">ENERGY LIMITED</span>
      </div>
    </Link>
  );
}

const nav: [string, string][] = [
  ["Home", "/"],
  ["About", "/about"],
  ["Services", "/services"],
  ["HSE & Compliance", "/hse-quality"],
  ["Contact", "/contact"],
];

export function QuoteButton({ outline = false }: { outline?: boolean }) {
  return (
    <Button asChild variant={outline ? "lightOutline" : "gold"}>
      <a href="/contact#quote">
        Request a quote <ArrowUpRight />
      </a>
    </Button>
  );
}

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div
      className={`reveal ${className}`.trim()}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

export function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const duration = 850;
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(Math.round(value * eased));
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        setDisplay(0);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref}>
      {display}
      {suffix && <span className="fact-suffix">{suffix}</span>}
    </span>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const [menu, setMenu] = useState(false);

  const active = (path: string) =>
    path === "/"
      ? pathname === "/"
      : pathname === path || (path === "/services" && pathname.startsWith("/services"));

  useEffect(() => {
    if (!menu) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(false);
    };
    document.addEventListener("keydown", key);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", key);
      document.body.style.overflow = previous;
    };
  }, [menu]);

  return (
    <>
      <div className="utility">
        <div className="container">
          <div className="utility-left">
            <a href={`tel:${primaryPhone.tel}`}>
              <Phone />
              {primaryPhone.display}
            </a>
            <a href={`mailto:${company.email}`}>
              <Mail />
              {company.email}
            </a>
            <span>
              <MapPin />
              Chevy View Estate, Lekki, Lagos
            </span>
          </div>
          <div className="utility-right">
            {company.tagline} • 100% Nigerian-Owned • {company.experienceHeadline}
          </div>
        </div>
      </div>

      <header className="site-header">
        <div className="container header-inner">
          <Wordmark />
          <nav aria-label="Main navigation" className="desktop-nav">
            {nav.map(([label, path]) =>
              path === "/services" ? (
                <div className="nav-dropdown" key={path}>
                  <a href={path} className={`nav-link ${active(path) ? "active" : ""}`}>
                    Services
                    <ChevronDown />
                  </a>
                  <div className="dropdown-panel">
                    {services.map((s) => (
                      <a key={s.slug} href={serviceHref(s.slug)}>
                        {s.name}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <a
                  key={path}
                  className={`nav-link ${active(path) ? "active" : ""}`}
                  href={path}
                  aria-current={active(path) ? "page" : undefined}
                >
                  {label}
                </a>
              ),
            )}
          </nav>
          <div className="header-cta">
            <QuoteButton />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="menu-button"
            aria-label="Open navigation"
            onClick={() => setMenu(true)}
          >
            <Menu />
          </Button>
        </div>
      </header>

      {menu && (
        <>
          <div className="drawer-backdrop" onClick={() => setMenu(false)} />
          <nav className="mobile-nav" aria-label="Mobile navigation">
            <Button
              variant="ghost"
              size="icon"
              className="drawer-close"
              aria-label="Close navigation"
              onClick={() => setMenu(false)}
            >
              <X />
            </Button>
            <Wordmark />
            {nav.map(([label, path]) => (
              <a
                key={path}
                href={path}
                className={active(path) ? "active" : ""}
                onClick={() => setMenu(false)}
              >
                {label}
              </a>
            ))}
            <QuoteButton />
          </nav>
        </>
      )}

      <main>{children}</main>

      <section className="cta-band">
        <div className="container cta-inner">
          <div>
            <h2>
              Have a project in mind?
              <br />
              Talk to our engineers.
            </h2>
            <p>From an initial idea to a fully operational facility, we’re ready.</p>
          </div>
          <QuoteButton />
        </div>
      </section>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <Wordmark />
              <p>
                {company.whoWeAre[0]} {company.whoWeAre[1]}
              </p>
              <div className="socials">
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin />
                </a>
                <a href="https://x.com/" target="_blank" rel="noreferrer" aria-label="X">
                  <X />
                </a>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                >
                  <Facebook />
                </a>
              </div>
            </div>
            <div>
              <h3>Explore</h3>
              <ul>
                {nav
                  .filter((n) => n[1] !== "/")
                  .map(([label, path]) => (
                    <li key={path}>
                      <a href={path}>{label}</a>
                    </li>
                  ))}
              </ul>
            </div>
            <div>
              <h3>Our services</h3>
              <ul>
                {services.map((s) => (
                  <li key={s.slug}>
                    <a href={serviceHref(s.slug)}>{s.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Get in touch</h3>
              <ul>
                <li>No. 1 Oba Sijuade Okunade Crescent,</li>
                <li>Chevy View Estate, Lekki, Lagos</li>
                {company.phones.map((p) => (
                  <li key={p.tel}>
                    <a href={`tel:${p.tel}`}>{p.display}</a>
                  </li>
                ))}
                <li>
                  <a href={`mailto:${company.email}`}>{company.email}</a>
                </li>
                <li>Monday – Friday, 8am – 5pm</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>
              © {company.established} {company.name}. All rights reserved.
            </span>
            <span>{company.tagline} • West Africa</span>
          </div>
        </div>
      </footer>

      <a
        className="whatsapp"
        href={`https://wa.me/${primaryPhone.tel.replace(/^\+/, "")}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Rain Energy on WhatsApp"
        title="Chat on WhatsApp"
      >
        <MessageCircle />
      </a>
    </>
  );
}

export type Crumb = { label: string; to: string };

export function PageHero({
  title,
  description,
  category,
  crumbs,
  image = images.plant,
}: {
  title: string;
  description?: string;
  category?: string;
  crumbs?: Crumb[];
  image?: string;
}) {
  const trail: Crumb[] =
    crumbs !== undefined
      ? crumbs
      : category
        ? [{ label: category, to: `/${category.toLowerCase()}` }]
        : [];

  return (
    <section className="page-hero">
      <img
        src={image}
        width={1920}
        height={1024}
        className="hero-photo"
        alt="Rain Energy industrial engineering infrastructure"
      />
      <div className="container reveal">
        <div className="breadcrumb">
          <a href="/">Home</a>
          <ChevronRight />
          {trail.map((c) => (
            <span key={c.to} className="breadcrumb-step">
              <a href={c.to}>{c.label}</a>
              <ChevronRight />
            </span>
          ))}
          <span>{title}</span>
        </div>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  link,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  href?: string;
  link?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h2>{title}</h2>
      </div>
      {href ? (
        <a href={href} className="text-link">
          {link}
          <ArrowUpRight />
        </a>
      ) : description ? (
        <p>{description}</p>
      ) : null}
    </div>
  );
}

export function ServicesGrid() {
  return (
    <div className="services-grid">
      {services.map((s, i) => {
        const Icon = iconMap[s.slug] ?? DraftingCompass;
        return (
          <a className="service-card" href={serviceHref(s.slug)} key={s.slug}>
            <Icon className="service-icon" strokeWidth={1.4} />
            <span className="card-number">0{i + 1}</span>
            <h3>{s.name}</h3>
            <p>{s.short}</p>
            <span className="text-link">
              Learn more
              <ArrowUpRight />
            </span>
          </a>
        );
      })}
    </div>
  );
}

export const why = [
  {
    icon: Users,
    title: "Indigenous expertise",
    text: "Local knowledge. A skilled, 100% Nigerian workforce.",
  },
  {
    icon: ShieldCheck,
    title: "Safety in every phase",
    text: "People, assets and the environment come first.",
  },
  {
    icon: Layers,
    title: "End-to-end delivery",
    text: "One partner from design through to commissioning.",
  },
  {
    icon: Clock,
    title: "Responsive execution",
    text: "Clear communication and a focus on on-time delivery.",
  },
];

export function NotFound({
  kind = "page",
  to,
  href,
  label = "Back to home",
}: {
  kind?: string;
  to?: string;
  href?: string;
  label?: string;
}) {
  const target = to ?? href ?? "/";
  return (
    <Layout>
      <section className="not-found container">
        <strong>404</strong>
        <h1>This {kind} couldn’t be found.</h1>
        <p>The link may be incomplete, or the {kind} is no longer available.</p>
        <Button asChild variant="navy">
          <a href={target}>
            {label}
            <ArrowRight />
          </a>
        </Button>
      </section>
    </Layout>
  );
}

export function ComplianceGrid() {
  return (
    <div className="compliance-grid">
      {company.compliance.map((c) => (
        <div className="compliance-card" key={c.code}>
          <div>
            <div className="compliance-badge">{c.code}</div>
            <div className="compliance-val">{c.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function HseFrameworkGrid() {
  return (
    <div className="hse-framework-grid">
      {company.hseFramework.map((item) => (
        <div className="hse-framework-card" key={item.code}>
          <span className="hse-step-pill">{item.code}</span>
          <p className="hse-step-desc">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}

export function FaqSection({
  title = "Frequently Asked Questions",
  eyebrow = "Capabilities & Delivery FAQ",
  description = "Detailed answers regarding our engineering standards, EPIC&C turnkey model, pipeline interventions, and project mobilization.",
}: {
  title?: string;
  eyebrow?: string;
  description?: string;
}) {
  return (
    <section className="section" id="faq">
      <div className="container">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <div className="faq-container">
          <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                value={`item-${index}`}
                key={faq.question}
                className="faq-item border-none"
              >
                <AccordionTrigger className="faq-trigger hover:no-underline">
                  <div className="text-left">
                    <span className="faq-category">{faq.category}</span>
                    <span>{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="faq-content">
                  <p>{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="faq-help-card">
            <div>
              <h3 className="text-lg font-bold text-navy mb-1">
                Have a specific project or engineering inquiry?
              </h3>
              <p className="text-sm text-ink opacity-80">
                Our multidisciplinary engineering and project team in Lagos is ready to evaluate
                your scope and technical specifications.
              </p>
            </div>
            <Button asChild variant="gold" className="shrink-0">
              <a href="/contact#quote">
                Request a quote <ArrowUpRight />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export {
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Clock,
  Layers,
  Leaf,
  Award,
  FileCheck2,
  Phone,
  Mail,
  MapPin,
  company,
};
