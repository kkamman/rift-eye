import { ActivePlayer } from './active-player.model';
import { EventData } from './event-data.model';
import { GameStats } from './game-stats.model';
import { Player } from './player.model';

export interface GameData {
  activePlayer: ActivePlayer;
  allPlayers: Player[];
  events: EventData;
  gameData: GameStats;
}
