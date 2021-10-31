import { MockLiveClientEventsService } from 'src/app/core/live-client-data/services/mock-live-client-events.service';
import 'zone.js/plugins/zone-error';

export const environment = {
  production: false,
  liveClientEventsService: MockLiveClientEventsService,
};
