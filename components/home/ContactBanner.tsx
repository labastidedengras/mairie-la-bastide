import { Phone } from "lucide-react";
import Link from "next/link";

export default function ContactBanner() {
  return (
    <section className="bg-[#8a7a5a] py-20 text-white">
      <div className="mx-auto max-w-5xl px-6">
        <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/10 p-10 backdrop-blur-sm">
          <div className="flex flex-col gap-8 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
            {/* Content */}
            <div>
              <span className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">
                Une question ?
              </span>

              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                La mairie est à votre écoute
              </h2>

              <p className="mt-4 max-w-2xl text-lg text-white/75">
                Retrouvez les informations utiles ou contactez la mairie pour
                toute question concernant la vie du village.
              </p>
            </div>

            {/* CTA */}
            <div className="flex shrink-0 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 font-medium text-[#8a7a5a] transition hover:scale-[1.02]"
              >
                <Phone className="h-5 w-5" />
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
