import { type SchemaTypeDefinition } from "sanity";
import actualite from "./actualite";
import compteRendu from "./compteRendu";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [compteRendu, actualite],
};
