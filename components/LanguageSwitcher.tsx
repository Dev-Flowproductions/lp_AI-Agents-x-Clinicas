"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const locales = routing.locales;

export function LanguageSwitcher() {
  const t = useTranslations("Languages");
  const tNav = useTranslations("Nav");
  const current = useLocale();

  return (
    <nav aria-label={tNav("languageNav")} className="flex flex-wrap items-center">
      <ul className="flex flex-wrap gap-4" role="list">
        {locales.map((locale) => (
          <li key={locale}>
            {locale === current ? (
              <span
                className="text-base font-semibold text-flow-purple"
                aria-current="true"
              >
                {t(locale)}
              </span>
            ) : (
              <Link
                href="/"
                locale={locale}
                className="text-base text-flow-text underline decoration-flow-purple/40 underline-offset-4 transition-colors hover:text-flow-purple hover:decoration-flow-purple"
              >
                {t(locale)}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
