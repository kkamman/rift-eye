import { ActivePlayer } from './active-player.model';
import { EventData } from './event-data.model';
import { GameStats } from './game-stats.model';

export interface GameData {
  activePlayer: ActivePlayer;
  allPlayers: unknown[];
  events: EventData;
  gameData: GameStats;
}
