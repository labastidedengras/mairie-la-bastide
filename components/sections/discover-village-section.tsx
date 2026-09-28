import Image from "next/image";

// Ici, la chronologie est un vrai contenu : ce sont des dates, dans l'ordre.
const timeline = [
  {
    date: "XIe–XIIe siècle",
    text: "Premières fondations du terroir et construction de la chapelle Saint-Jean d'Orgerolles.",
  },
  {
    date: "Vers 1300",
    text: "Construction du château fort, qui appartenait à l'évêque d'Uzès.",
  },
  {
    date: "XVIe siècle",
    text: "Le château est reconstruit par la famille de la Fare.",
  },
  {
    date: "1893",
    text: "La Tour de l'Horloge s'élève à vingt mètres devant la mairie.",
  },
];

export default function DiscoverVillageSection() {
  return (
    <section className="bg-white">
      <div className="grid lg:grid-cols-2">
        {/* La photo va jusqu'au bord de l'écran ; hauteur minimale pour ne pas trop la recadrer */}
        <div className="relative min-h-[26rem] lg:min-h-[46rem]">
          <Image
            src="/images/chapelle-la-bastide.jpg"
            alt="Clocher en pierre de la chapelle de La Bastide-d'Engras"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            unoptimized
            className="object-cover object-[50%_30%]"
          />
        </div>

        {/* Le texte est centré verticalement dans sa moitié, avec des marges symétriques */}
        <div className="flex items-center px-6 py-16 lg:px-16 lg:py-24 xl:px-24">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-4xl lg:text-5xl">
              Un village médiéval au pied de sa barre rocheuse
            </h2>

            <p className="mt-8 text-lg leading-relaxed text-stone-800">
              L&apos;histoire de La Bastide-d&apos;Engras commence entre le XIe
              et le XIIe siècle, à l&apos;époque où les comtes de Toulouse
              régnaient sur la Provence gardoise. Initialement établi autour du
              hameau historique d&apos;Orgerolles, le village actuel s&apos;est
              progressivement structuré au pied de sa barre rocheuse fortifiée.
            </p>

            <p className="mt-5 text-base leading-relaxed text-stone-700">
              Ancienne place forte autrefois ceinte de hauts remparts, la
              commune abrite un imposant château féodal, ainsi que sa
              remarquable église romane.
            </p>

            <h3 className="mt-14 font-serif text-2xl font-semibold text-stone-900">
              Repères chronologiques
            </h3>

            <ol className="mt-4 border-b border-stone-200">
              {timeline.map((item) => (
                <li
                  key={item.date}
                  className="grid gap-1 border-t border-stone-200 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6"
                >
                  <span className="font-serif text-xl font-semibold text-[#9e5218]">
                    {item.date}
                  </span>
                  <span className="text-base leading-relaxed text-stone-700">
                    {item.text}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
