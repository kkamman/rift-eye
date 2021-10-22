import { Component, OnInit } from '@angular/core';
import { LiveClientDataApiService } from './core/live-client-data/services/live-client-data-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'rift-eye';

  constructor(
    private readonly liveClientDataApiService: LiveClientDataApiService
  ) {}

  ngOnInit(): void {
    setInterval(() => {
      this.liveClientDataApiService.getAllGameData().subscribe(console.log);
    }, 10000);
  }
}
