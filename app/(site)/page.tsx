import Hero from "@/components/hero";
import AgendaSection from "@/components/home/AgendaSection";
import DiscoverVillageSection from "@/components/home/DiscoverVillageSection";
import NewsSection from "@/components/news-section";
import QuickAccessSection from "@/components/QuickAccessSection";

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
