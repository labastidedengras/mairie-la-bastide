import { type SchemaTypeDefinition } from "sanity";
import actualite from "./actualite";
import association from "./association";
import compteRendu from "./compteRendu";
import reservation from "./reservation";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [compteRendu, actualite, association, reservation],
};
