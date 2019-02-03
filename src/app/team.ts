export interface Player {
  number: number;
  name: string;
  position: string;
}

export interface Team {
  players: Player[];
}
