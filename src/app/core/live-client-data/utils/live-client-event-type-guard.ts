import {
  LiveClientEvent,
  LiveClientEventType,
} from '../models/live-client-events.model';

type NarrowLiveClientEvent<T, N> = T extends { EventName: N } ? T : never;

export const eventHasType = <T extends LiveClientEventType>(
  event: LiveClientEvent,
  eventType: T
): event is NarrowLiveClientEvent<LiveClientEvent, T> => {
  return event.EventName === eventType;
};
