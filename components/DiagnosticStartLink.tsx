"use client";

import { useLocale } from "next-intl";
import type { ReactNode } from "react";
import { trackLandingEvent } from "@/lib/analytics-client";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function DiagnosticStartLink({ href, children, className }: Props) {
  const locale = useLocale();
  const base =
    "inline-flex min-h-[3.25rem] items-center justify-center rounded-lg bg-flow-purple px-8 py-3 text-center text-base font-semibold text-white shadow-sm transition-colors hover:bg-flow-purple-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flow-purple";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className ? `${base} ${className}` : base}
      onClick={() => {
        trackLandingEvent("diagnostic_start_click", { locale });
      }}
    >
      {children}
    </a>
  );
}
