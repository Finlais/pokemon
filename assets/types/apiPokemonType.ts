interface Name {
  fr: string;
  en: string;
  jp: string;
}

interface SpriteUrls {
  regular: string;
  shiny: string;
  gmax: string | null;
}

interface Type {
  name: string;
  image: string;
}

interface Talent {
  name: string;
  tc: boolean;
}

interface Stats {
  hp: number;
  atk: number;
  def: number;
  spe_atk: number;
  spe_def: number;
  vit: number;
}

interface Resistance {
  name: string;
  multiplier: number;
}

interface EvolutionStep {
  pokedex_id: number;
  name: string;
  condition: string;
}

interface MegaEvolution {
  orbe: string;
  sprites: {
    regular: string;
    shiny: string;
  };
}

interface Evolution {
  pre: EvolutionStep[];
  next: null;
  mega: MegaEvolution[];
}

interface Gender {
  male: number;
  female: number;
}

interface Pokemon {
  pokedex_id: number;
  generation: number;
  category: string;
  name: Name;
  sprites: SpriteUrls;
  types: Type[];
  talents: Talent[];
  stats: Stats;
  resistances: Resistance[];
  evolution: Evolution;
  height: string;
  weight: string;
  egg_groups: string[];
  sexe: Gender;
  catch_rate: number;
  level_100: number;
  formes: null;
}
