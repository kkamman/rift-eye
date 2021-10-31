export interface Abilities {
  Passive: Passive;
  Q: Ability;
  W: Ability;
  E: Ability;
  R: Ability;
}

export interface Ability {
  abilityLevel: number;
  displayName: string;
  id: string;
  rawDescription: string;
  rawDisplayName: string;
}

export type Passive = Omit<Ability, 'abilityLevel'>;
