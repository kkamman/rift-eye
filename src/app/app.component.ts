import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LiveClientDataApiService } from './core/live-client-data/services/live-client-data-api.service';
import { LiveClientEventsService } from './core/live-client-data/services/live-client-events.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'rift-eye';

  constructor(
    private readonly liveClientDataApiService: LiveClientDataApiService,
    private readonly liveClientEventService: LiveClientEventsService
  ) {}

  ngOnInit(): void {
    this.liveClientEventService.getEvent$().subscribe(console.log);
    this.liveClientEventService.startPolling();

    interval(10000)
      .pipe(switchMap(() => this.liveClientDataApiService.getAllGameData()))
      .subscribe(console.log);
  }
}
