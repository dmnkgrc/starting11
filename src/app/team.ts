// Player model
export interface Player {
  number: number;
  name: string;
  position: string;
  first_name: string;
  last_name: string;
  country: { name: string; code: string };
  images: { url: string; width: number; height: number }[];
  birth_date: string;
  age: number;
  height: number;
  weight: number;
}

// Team model
export interface Team {
  players: Player[];
}
