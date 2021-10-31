import { Item } from './items.model';
import { PlayerScore } from './player-score.model';
import { PlayerMainRunes } from './runes.model';
import { PlayerSummonerSpells } from './summoner-spells.model';
import { Team } from './team.model';

export type PlayerList = [];

export interface Player {
  championName: string;
  isBot: boolean;
  isDead: boolean;
  items: Item[];
  level: number;
  position: string;
  rawChampionName: string;
  respawnTimer: number;
  runes: PlayerMainRunes;
  scores: PlayerScore;
  skinID: number;
  summonerName: string;
  summonerSpells: PlayerSummonerSpells;
  team: Team;
}
