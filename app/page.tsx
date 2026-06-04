import Hero from "@/components/hero";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-semibold mb-6">
          Bienvenue à La Bastide d&apos;Engras
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          Découvrez notre charmant village niché au cœur de la nature, où
          l&apos;histoire et la convivialité se rencontrent. Explorez nos
          actualités, apprenez-en plus sur notre mairie, et plongez dans la vie
          locale animée de La Bastide d&apos;Engras.
        </p>
        <p className="text-lg text-gray-700">
          Que vous soyez résident ou visiteur, nous vous invitons à découvrir
          tout ce que notre belle commune a à offrir. N&apos;hésitez pas à nous
          contacter pour toute question ou suggestion !
        </p>
      </div>
    </main>
  );
}
