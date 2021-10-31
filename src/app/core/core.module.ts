import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LiveClientEventsService } from './live-client-data/services/live-client-events.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: LiveClientEventsService,
      useClass: environment.liveClientEventsService,
    },
  ],
})
export class CoreModule {}
