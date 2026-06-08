import Hero from "@/components/hero";
import AgendaSection from "@/components/home/AgendaSection";
import ContactBanner from "@/components/home/ContactBanner";
import DiscoverVillageSection from "@/components/home/DiscoverVillageSection";
import NewsSection from "@/components/news-section";
import QuickAccessSection from "@/components/QuickAccessSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <NewsSection />
      <QuickAccessSection />
      <DiscoverVillageSection />
      <AgendaSection />
      <ContactBanner />
    </main>
  );
}
