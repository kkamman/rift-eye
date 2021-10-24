import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventData } from '../models/event-data.model';
import { GameStats } from '../models/game-stats.model';

@Injectable({
  providedIn: 'root',
})
export class LiveClientDataApiService {
  private readonly baseUrl = 'https://127.0.0.1:2999/liveclientdata';

  constructor(private readonly http: HttpClient) {}

  getAllGameData(): Observable<unknown> {
    return this.request('allgamedata');
  }

  getActivePlayer(): Observable<unknown> {
    return this.request('activeplayer');
  }

  getActivePlayerName(): Observable<string> {
    return this.request('activeplayername');
  }

  getActivePlayerAbilities(): Observable<unknown> {
    return this.request('activeplayerabilities');
  }

  getActivePlayerRunes(): Observable<unknown> {
    return this.request('activeplayerrunes');
  }

  getPlayerList(): Observable<unknown> {
    return this.request('playerlist');
  }

  getPlayerScores(summonerName: string): Observable<unknown> {
    return this.request('playerscores', summonerName);
  }

  getPlayerSummonerSpells(summonerName: string): Observable<unknown> {
    return this.request('playersummonerspells', summonerName);
  }

  getPlayerMainRunes(summonerName: string): Observable<unknown> {
    return this.request('playermainrunes', summonerName);
  }

  getPlayerItems(summonerName: string): Observable<unknown> {
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
