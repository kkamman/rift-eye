import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LiveClientEvent } from '../models/live-client-events.model';
import { LiveClientEventsService } from './live-client-events.service';

@Injectable({
  providedIn: 'root',
})
export class DebugLiveClientEventsService extends LiveClientEventsService {
  private debugEvents: LiveClientEvent[] = [];

  addDebugEvent(event: LiveClientEvent): void {
    this.debugEvents.push(event);
  }

  setDebugEvents(events: LiveClientEvent[]): void {
    this.debugEvents = events;
  }

  clearDebugEvents(): void {
    this.debugEvents = [];
  }

  override requestEvents(): Observable<LiveClientEvent[]> {
    return of([...this.debugEvents]);
  }
}
