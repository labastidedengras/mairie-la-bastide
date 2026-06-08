import { Landmark, MapPin, Trees } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function DiscoverVillageSection() {
  return (
    <section className="bg-[#8a7a5a] py-24 text-white">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:items-center">
        {/* Image */}
        <div className="relative overflow-hidden rounded-[2rem]">
          <div className="relative h-[550px]">
            <Image
              src="/images/village-discover.jpg"
              alt="La Bastide-d'Engras"
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/15" />
          </div>
        </div>

        {/* Content */}
        <div>
          <span className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">
            Découvrir le village
          </span>

          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Une bastide de caractère
            <br />
            au cœur du Gard
          </h2>

          <p className="mt-6 text-lg leading-8 text-white/85">
            Niché entre nature et patrimoine, La Bastide d&apos;Engras est l’une
            des plus anciennes bastides de France. Son authenticité, ses
            paysages préservés et son histoire en font un lieu de vie paisible
            et chaleureux, au cœur de l’Occitanie.
          </p>

          <p className="mt-5 text-base leading-7 text-white/70">
            Entre patrimoine local, environnement naturel remarquable et vie de
            village, découvrez un territoire à taille humaine où traditions et
            convivialité continuent de vivre au quotidien.
          </p>

          {/* Highlights */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
              <Landmark className="mb-3 h-6 w-6" />

              <p className="font-semibold">Patrimoine</p>

              <p className="mt-1 text-sm text-white/70">
                Bastide médiévale & histoire locale
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
              <Trees className="mb-3 h-6 w-6" />

              <p className="font-semibold">Nature</p>

              <p className="mt-1 text-sm text-white/70">
                Environnement préservé
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
              <MapPin className="mb-3 h-6 w-6" />

              <p className="font-semibold">Occitanie</p>

              <p className="mt-1 text-sm text-white/70">Gard • Pays d’Uzès</p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10">
            <Link
              href="/decouvrir-le-village"
              className="inline-flex items-center rounded-full bg-white px-7 py-4 font-medium text-[#8a7a5a] transition hover:scale-[1.02]"
            >
              Découvrir le village
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
