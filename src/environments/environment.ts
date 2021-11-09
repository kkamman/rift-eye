import { LiveClientEventsService } from 'src/app/core/live-client-data/services/live-client-events.service';
import 'zone.js/plugins/zone-error';

export const environment = {
  production: false,
  liveClientEventsService: LiveClientEventsService,
};
