import Hero from "@/components/sections/hero";
import AgendaSection from "@/components/sections/agenda-section";
import DiscoverVillageSection from "@/components/sections/discover-village-section";
import NewsSection from "@/components/sections/news-section";
import QuickAccessSection from "@/components/sections/quick-access-section";

export default function Home() {
  return (
    <>
      <Hero />
      <QuickAccessSection />
      <NewsSection />
      <DiscoverVillageSection />
      <AgendaSection />
    </>
  );
}
