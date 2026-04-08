import { getTranslations } from "next-intl/server";
import { contentMax, copyMeasure } from "@/lib/layout-classes";

export async function SiteFooter() {
  const t = await getTranslations("Footer");
  return (
    <footer className="bg-gradient-to-b from-[#eceaf5] via-flow-bg to-white py-12">
      <div className={contentMax}>
        <div className={`flex flex-col gap-1 ${copyMeasure}`}>
          <p className="text-base font-medium text-flow-text">{t("builtBy")}</p>
          <p className="text-base text-flow-muted">{t("rights")}</p>
        </div>
      </div>
    </footer>
  );
}
