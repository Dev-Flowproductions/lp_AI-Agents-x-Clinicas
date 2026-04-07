"use client";

import { useLocale } from "next-intl";
import type { ReactNode } from "react";
import { trackLandingEvent } from "@/lib/analytics-client";

type Props = {
  href: string;
  children: ReactNode;
};

export function DiagnosticStartLink({ href, children }: Props) {
  const locale = useLocale();
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-12 items-center justify-center rounded-lg bg-flow-purple px-8 py-3 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-flow-purple-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flow-purple"
      onClick={() => {
        trackLandingEvent("diagnostic_start_click", { locale });
      }}
    >
      {children}
    </a>
  );
}
