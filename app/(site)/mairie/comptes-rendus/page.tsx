import type { Metadata } from "next";
import ComptesRendusClientContent from "./ComptesRendusClientContent";

export const metadata: Metadata = {
  title: "Comptes-rendus du Conseil Municipal",
  description:
    "Accédez en toute transparence aux procès-verbaux, délibérations et comptes-rendus officiels des séances du conseil municipal de La Bastide d'Engras.",
};

export default function ComptesRendusPage() {
  return <ComptesRendusClientContent />;
}
