import { getTranslations } from "next-intl/server";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Link } from "@/i18n/navigation";

export async function SiteHeader() {
  const t = await getTranslations("Nav");

  return (
    <header className="sticky top-0 z-40 border-b border-flow-border/80 bg-white/95 shadow-sm backdrop-blur-sm supports-[backdrop-filter]:bg-white/85">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:ring-2 focus:ring-flow-purple"
      >
        {t("skipToContent")}
      </a>
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-6 py-4 sm:py-5">
        <Link
          href="/"
          className="min-w-0 shrink text-xl font-bold tracking-tight text-flow-purple"
        >
          {t("brand")}
        </Link>
        <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 sm:gap-x-6">
          <LanguageSwitcher />
          <a
            href="#diagnostico"
            className="inline-flex shrink-0 items-center justify-center rounded-lg border-2 border-flow-purple bg-flow-purple px-3 py-2 text-center text-xs font-semibold text-white transition-colors hover:bg-flow-purple-hover sm:px-5 sm:text-sm"
          >
            {t("ctaDiagnostic")}
          </a>
        </div>
      </div>
    </header>
  );
}
