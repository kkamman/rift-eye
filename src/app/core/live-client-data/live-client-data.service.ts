import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivePlayer } from './models/active-player.model';

@Injectable({
  providedIn: 'root',
})
export class LiveClientDataService {
  private readonly liveClientDataUrl = 'https://127.0.0.1:2999/liveclientdata';

  constructor(private readonly http: HttpClient) {}

  getActivePlayer(): Observable<ActivePlayer> {
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

  getEventData(): Observable<unknown> {
    return this.request('eventdata');
  }

  getGameStats(): Observable<unknown> {
    return this.request('gamestats');
  }

  private request<T>(endpoint: string, summonerName?: string): Observable<T> {
    const url = `${this.liveClientDataUrl}/${endpoint}`;
    const options = summonerName
      ? { params: new HttpParams().set('summonerName', summonerName) }
      : {};
    return this.http.get<T>(url, options);
  }
}
