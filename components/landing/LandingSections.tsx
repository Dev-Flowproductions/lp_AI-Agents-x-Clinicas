import type { ReactNode } from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { DiagnosticStartLink } from "@/components/DiagnosticStartLink";
import { getDiagnosticUrl } from "@/lib/diagnostic-url";

const FLOW_WEBSITE = "https://flowproductions.pt";

const contentMax = "mx-auto w-full max-w-5xl px-6";

const sectionShell = "border-b border-flow-border px-6 py-16 sm:py-24";
const sectionAlt = `${sectionShell} bg-white`;
const sectionMuted = `${sectionShell} bg-flow-bg`;

function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-xs font-bold uppercase tracking-[0.2em] text-flow-purple ${className}`}
    >
      {children}
    </p>
  );
}

export async function HeroSection() {
  const t = await getTranslations("Hero");
  const diagnosticUrl = getDiagnosticUrl();

  return (
    <section
      className="border-b border-flow-border bg-white pt-0"
      aria-labelledby="hero-heading"
    >
      {/* Full-bleed 16:9: same aspect as a 16:9 asset → image fills edge-to-edge, no side bars. */}
      <div className="relative hidden aspect-video w-full md:block">
        {/* Unoptimized: `/_next/image` re-encodes (WebP/AVIF + resize); that can look worse than the JPEG you see in Preview. */}
        <Image
          src="/banner.jpeg"
          alt={t("bannerAlt")}
          fill
          priority
          unoptimized
          className="object-cover object-center"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-white/55 via-white/12 to-transparent sm:h-24"
          aria-hidden
        />
      </div>

      <div
        className={`${contentMax} pb-14 pt-12 sm:pb-20 sm:pt-14 md:pt-10`}
      >
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h1
          id="hero-heading"
          className="mt-4 text-balance text-4xl font-bold leading-[1.12] tracking-tight text-flow-text sm:text-5xl sm:leading-[1.1] lg:text-[2.85rem] lg:leading-[1.08]"
        >
          {t("h1")}
        </h1>
        <p className="mt-8 max-w-3xl text-lg font-medium leading-relaxed text-flow-text sm:text-xl">
          {t("lead")}
        </p>

        <div className="mt-10 flex max-w-2xl flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
          <DiagnosticStartLink href={diagnosticUrl}>
            {t("ctaPrimary")}
          </DiagnosticStartLink>
          <a
            href={FLOW_WEBSITE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center rounded-lg border-2 border-flow-purple bg-transparent px-8 py-3 text-center text-sm font-semibold text-flow-purple transition-colors hover:bg-flow-purple/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flow-purple"
          >
            {t("ctaSecondary")}
          </a>
        </div>

        <div className="mt-14 w-full max-w-3xl space-y-5 border-t border-flow-border pt-12 text-left text-base leading-relaxed text-flow-text">
          <p>{t("p1")}</p>
          <p>{t("p2")}</p>
          <p>{t("p3")}</p>
          <p>{t("p4")}</p>
          <p className="font-medium text-flow-purple">{t("p5")}</p>
        </div>
      </div>
    </section>
  );
}

export async function BodySection() {
  const t = await getTranslations("Body");
  const bullets = ["bullet1", "bullet2", "bullet3", "bullet4"] as const;
  const nums = ["01", "02", "03", "04"] as const;

  return (
    <section className={sectionMuted} aria-labelledby="body-heading">
      <div className={contentMax}>
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2
          id="body-heading"
          className="mt-4 text-3xl font-bold leading-tight tracking-tight text-flow-text sm:text-4xl"
        >
          {t("title")}
        </h2>
        <div className="mt-10 max-w-3xl space-y-5 text-base leading-relaxed text-flow-text sm:text-lg">
          <p>{t("p1")}</p>
          <p>{t("p2")}</p>
          <p>{t("p3")}</p>
          <p className="font-medium">{t("p4")}</p>
        </div>

        <p className="mt-12 max-w-3xl text-base font-medium leading-relaxed text-flow-text sm:text-lg">
          {t("introBullets")}
        </p>

        <h3 className="mt-10 text-xl font-bold text-flow-text sm:text-2xl">
          {t("capabilitiesTitle")}
        </h3>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {bullets.map((key, i) => (
            <article
              key={key}
              className="rounded-2xl border border-flow-border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <p className="font-mono text-2xl font-bold tabular-nums text-flow-purple/90">
                {nums[i]}
              </p>
              <p className="mt-3 text-base font-semibold leading-snug text-flow-text">
                {t(key)}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-12 max-w-3xl text-base leading-relaxed text-flow-text sm:text-lg">
          {t("handover")}
        </p>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-flow-muted sm:text-lg">
          {t("crm")}
        </p>
        <p className="mt-10 max-w-3xl border-l-4 border-flow-yellow bg-white/60 py-4 pl-5 text-base font-semibold leading-relaxed text-flow-text sm:text-lg">
          {t("result")}
        </p>
      </div>
    </section>
  );
}

export async function ValueStripSection() {
  const t = await getTranslations("ValueStrip");
  const items = ["b1", "b2", "b3", "b4"] as const;

  return (
    <section
      className="border-b border-flow-purple/20 bg-gradient-to-br from-flow-purple via-[#524a8f] to-[#433c73] px-6 py-16 text-white sm:py-24"
      aria-labelledby="value-strip-heading"
    >
      <div className={contentMax}>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-flow-yellow">
          {t("eyebrow")}
        </p>
        <h2
          id="value-strip-heading"
          className="mt-4 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl"
        >
          {t("title")}
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
          {t("subtitle")}
        </p>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {items.map((key) => (
            <li key={key} className="flex gap-4 text-base leading-relaxed">
              <span
                className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-flow-yellow text-sm font-bold text-flow-text"
                aria-hidden
              >
                ✓
              </span>
              <span className="text-white/95">{t(key)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export async function HowItWorksSection() {
  const t = await getTranslations("HowItWorks");
  const steps = [
    { n: "01", title: "s1Title", body: "s1Body" },
    { n: "02", title: "s2Title", body: "s2Body" },
    { n: "03", title: "s3Title", body: "s3Body" },
  ] as const;

  return (
    <section className={sectionAlt} aria-labelledby="how-heading">
      <div className={contentMax}>
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2
          id="how-heading"
          className="mt-4 text-3xl font-bold leading-tight tracking-tight text-flow-text sm:text-4xl"
        >
          {t("title")}
        </h2>
        <ol className="mt-14 grid gap-6 lg:grid-cols-3">
          {steps.map((step) => (
            <li key={step.n}>
              <article className="h-full rounded-2xl border border-flow-border bg-flow-bg/40 p-8 shadow-sm transition-shadow hover:shadow-md">
                <span
                  className="inline-flex min-w-[3rem] items-center justify-center rounded-lg bg-flow-purple px-3 py-1.5 font-mono text-lg font-bold tabular-nums text-white"
                  aria-hidden
                >
                  {step.n}
                </span>
                <h3 className="mt-6 text-xl font-bold text-flow-text">
                  {t(step.title)}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-flow-muted">
                  {t(step.body)}
                </p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export async function ClosingDiagnosticSection() {
  const t = await getTranslations("Closing");
  const url = getDiagnosticUrl();

  return (
    <section
      id="diagnostico"
      className={`${sectionMuted} scroll-mt-28 border-t-2 border-flow-yellow/90`}
      aria-labelledby="closing-heading"
    >
      <div className={contentMax}>
        <Eyebrow className="text-flow-muted">Flow Productions</Eyebrow>
        <h2
          id="closing-heading"
          className="mt-4 text-3xl font-bold leading-tight tracking-tight text-flow-text sm:text-4xl"
        >
          {t("title")}
        </h2>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-flow-text sm:text-lg">
          {t("line1")}
        </p>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-flow-muted sm:text-lg">
          {t("line2")}
        </p>

        <div className="mt-12 overflow-hidden rounded-2xl border border-flow-border bg-white shadow-lg ring-1 ring-black/[0.04]">
          <div className="h-1.5 bg-flow-yellow" aria-hidden />
          <div className="px-6 py-10 sm:px-12 sm:py-12">
            <div className="grid grid-cols-2 gap-10 sm:gap-16">
              <div>
                <p className="text-4xl font-bold tabular-nums text-flow-purple sm:text-5xl">
                  {t("statTimeValue")}
                </p>
                <p className="mt-1 text-sm font-medium text-flow-muted">
                  {t("statTimeLabel")}
                </p>
              </div>
              <div>
                <p className="text-4xl font-bold tabular-nums text-flow-purple sm:text-5xl">
                  {t("statQuestionsValue")}
                </p>
                <p className="mt-1 text-sm font-medium text-flow-muted">
                  {t("statQuestionsLabel")}
                </p>
              </div>
            </div>
            <div className="mt-12 flex flex-col items-start gap-4">
              <DiagnosticStartLink href={url}>{t("button")}</DiagnosticStartLink>
              <p className="text-sm font-medium text-flow-muted">
                {t("cardNote")}
              </p>
            </div>
          </div>
        </div>

        <p className="mt-12 text-base leading-relaxed text-flow-text sm:text-lg">
          {t("websiteLead")}{" "}
          <a
            href={FLOW_WEBSITE}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-flow-purple underline decoration-flow-yellow decoration-2 underline-offset-2 hover:text-flow-purple-hover"
          >
            {t("websiteLinkLabel")}
          </a>
          .
        </p>
        <p className="mt-6 max-w-2xl text-xs leading-relaxed text-flow-muted">
          {t("flowReference")}
        </p>
      </div>
    </section>
  );
}
