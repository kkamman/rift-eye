import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Abilities } from '../models/abilities.model';
import { ActivePlayer } from '../models/active-player.model';
import { EventData } from '../models/event-data.model';
import { GameData } from '../models/game-data.model';
import { GameStats } from '../models/game-stats.model';
import { PlayerItems } from '../models/items.model';
import { PlayerScore } from '../models/player-score.model';
import { ActivePlayerRunes, PlayerMainRunes } from '../models/runes.model';
import { PlayerSummonerSpells } from '../models/summoner-spells.model';

@Injectable({
  providedIn: 'root',
})
export class LiveClientDataApiService {
  private readonly baseUrl = 'https://127.0.0.1:2999/liveclientdata';

  constructor(private readonly http: HttpClient) {}

  getAllGameData(): Observable<GameData> {
    return this.request('allgamedata');
  }

  getActivePlayer(): Observable<ActivePlayer> {
    return this.request('activeplayer');
  }

  getActivePlayerName(): Observable<string> {
    return this.request('activeplayername');
  }

  getActivePlayerAbilities(): Observable<Abilities> {
    return this.request('activeplayerabilities');
  }

  getActivePlayerRunes(): Observable<ActivePlayerRunes> {
    return this.request('activeplayerrunes');
  }

  getPlayerList(): Observable<unknown> {
    return this.request('playerlist');
  }

  getPlayerScores(summonerName: string): Observable<PlayerScore> {
    return this.request('playerscores', summonerName);
  }

  getPlayerSummonerSpells(
    summonerName: string
  ): Observable<PlayerSummonerSpells> {
    return this.request('playersummonerspells', summonerName);
  }

  getPlayerMainRunes(summonerName: string): Observable<PlayerMainRunes> {
    return this.request('playermainrunes', summonerName);
  }

  getPlayerItems(summonerName: string): Observable<PlayerItems> {
    return this.request('playeritems', summonerName);
  }

  getEventData(): Observable<EventData> {
    return this.request('eventdata');
  }

  getGameStats(): Observable<GameStats> {
    return this.request('gamestats');
  }

  private request<T>(endpoint: string, summonerName?: string): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    const options = summonerName
      ? { params: new HttpParams().set('summonerName', summonerName) }
      : {};
    return this.http.get<T>(url, options);
  }
}
