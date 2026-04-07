import { getTranslations } from "next-intl/server";
import { contentMax } from "@/lib/layout-classes";

export async function SiteFooter() {
  const t = await getTranslations("Footer");
  return (
    <footer className="border-t border-flow-border bg-white py-12">
      <div className={contentMax}>
        <p className="text-sm text-flow-muted">{t("rights")}</p>
      </div>
    </footer>
  );
}
