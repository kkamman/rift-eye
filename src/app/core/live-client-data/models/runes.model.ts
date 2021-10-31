export interface GeneralRune {
  displayName: string;
  id: number;
  rawDescription: string;
  rawDisplayName: string;
}

export interface RuneTree {
  displayName: string;
  id: number;
  rawDescription: string;
  rawDisplayName: string;
}

export interface StatRune {
  id: number;
  rawDescription: string;
}

export interface PlayerMainRunes {
  keystone: GeneralRune;
  primaryRuneTree: RuneTree;
  secondaryRuneTree: RuneTree;
}

export interface ActivePlayerRunes extends PlayerMainRunes {
  generalRunes: GeneralRune[];
  statRunes: StatRune[];
}
