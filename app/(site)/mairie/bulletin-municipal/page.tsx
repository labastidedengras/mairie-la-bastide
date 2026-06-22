import type { Metadata } from "next";
import BulletinMunicipalClientContent from "./bulletin-municipal-client-content";

export const metadata: Metadata = {
  title: "Bulletin Municipal",
  description:
    "Téléchargez et consultez en ligne le bulletin municipal officiel de la commune de La Bastide d'Engras.",
};

export default function BulletinMunicipalPage() {
  return <BulletinMunicipalClientContent />;
}
