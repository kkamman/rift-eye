import { Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  interval,
  Observable,
  ReplaySubject,
  Subject,
  Subscription,
} from 'rxjs';
import { map, skip, switchMap } from 'rxjs/operators';
import { LiveClientEvent } from '../models/live-client-events.model';
import { LiveClientDataApiService } from './live-client-data-api.service';

export enum EventSourceReplayMode {
  NoReplay,
  ReplayAll,
  ReplayCurrentMatch,
}

@Injectable({
  providedIn: 'root',
})
export class LiveClientEventsService implements OnDestroy {
  private readonly event$: ReplaySubject<LiveClientEvent> =
    new ReplaySubject<LiveClientEvent>();
  private readonly pollingIntervalChange$: Subject<number> =
    new BehaviorSubject(2000);
  private readonly maxValidatedEvents = 5;

  private previousMatchesCumulativeEventCount = 0;
  private seenEvents: LiveClientEvent[] = [];
  private pollingSubscription: Subscription | null = null;

  constructor(
    private readonly liveClientDataApiService: LiveClientDataApiService
  ) {}

  startPolling(): void {
    if (this.pollingSubscription) return;

    this.pollingSubscription = this.getPollingInterval$()
      .pipe(switchMap(() => this.requestEvents()))
      .subscribe((events) => this.handleEventsResponse(events));
  }

  stopPolling(): void {
    this.pollingSubscription?.unsubscribe();
    this.pollingSubscription = null;
  }

  retrieveEvents(): void {
    this.requestEvents().subscribe((events) =>
      this.handleEventsResponse(events)
    );
  }

  getEvent$(
    replayMode: EventSourceReplayMode = EventSourceReplayMode.NoReplay
  ): Observable<LiveClientEvent> {
    let event$ = this.event$.asObservable();

    if (replayMode === EventSourceReplayMode.NoReplay) {
      event$ = event$.pipe(
        skip(this.previousMatchesCumulativeEventCount + this.seenEvents.length)
      );
    } else if (replayMode === EventSourceReplayMode.ReplayCurrentMatch) {
      event$ = event$.pipe(skip(this.previousMatchesCumulativeEventCount));
    }

    return event$;
  }

  setPollingInterval(intervalMs: number): void {
    this.pollingIntervalChange$.next(intervalMs);
  }

  ngOnDestroy(): void {
    this.stopPolling();
  }

  protected requestEvents(): Observable<LiveClientEvent[]> {
    return this.liveClientDataApiService
      .getEventData()
      .pipe(map((eventData) => eventData.Events));
  }

  private getPollingInterval$(): Observable<number> {
    return this.pollingIntervalChange$.pipe(
      switchMap((value) => interval(value))
    );
  }

  private isNewMatch(events: LiveClientEvent[]): boolean {
    if (this.seenEvents.length > events.length) {
      return true;
    } else if (this.seenEvents.length !== 0) {
      const eventsToCompare = events.slice(
        0,
        events.length - this.seenEvents.length
      );
      let mismatchFound = false;
      let index = 0;
      while (
        !mismatchFound &&
        index < eventsToCompare.length &&
        index < this.maxValidatedEvents
      ) {
        const seenEvent = this.seenEvents[index];
        const eventToCompare = eventsToCompare[index];
        mismatchFound =
          seenEvent.EventId !== eventToCompare.EventId ||
          seenEvent.EventName !== eventToCompare.EventName ||
          seenEvent.EventTime !== eventToCompare.EventTime;
        index++;
      }
      return mismatchFound;
    }
    return false;
  }

  private handleEventsResponse(events: LiveClientEvent[]): void {
    if (this.isNewMatch(events)) {
      this.previousMatchesCumulativeEventCount += this.seenEvents.length;
      this.seenEvents = [];
    }

    if (events.length > this.seenEvents.length) {
      events
        .slice(this.seenEvents.length - events.length)
        .forEach((event) => this.event$.next(event));
    }

    this.seenEvents = events;
  }
}
