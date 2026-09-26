import AssociationsSection from "@/components/sections/association-section";
import DiscoverVillageSection from "@/components/sections/discover-village-section";
import Hero from "@/components/sections/hero";
import MunicipalLifeSection from "@/components/sections/municipal-life-section";
import NewsAndAgendaSection from "@/components/sections/news-agenda-section";
import QuickAccessSection from "@/components/sections/quick-access-section";

export default function Home() {
  return (
    <>
      <Hero />
      <QuickAccessSection />
      <NewsAndAgendaSection />
      <DiscoverVillageSection />
      <MunicipalLifeSection />
      <AssociationsSection />
    </>
  );
}
