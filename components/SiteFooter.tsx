import { getTranslations } from "next-intl/server";

export async function SiteFooter() {
  const t = await getTranslations("Footer");
  return (
    <footer className="border-t border-flow-border bg-white px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm text-flow-muted">{t("rights")}</p>
      </div>
    </footer>
  );
}
