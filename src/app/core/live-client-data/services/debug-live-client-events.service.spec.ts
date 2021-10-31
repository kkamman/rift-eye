import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DebugLiveClientEventsService } from './debug-live-client-events.service';

describe('DebugLiveClientEventsService', () => {
  let service: DebugLiveClientEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DebugLiveClientEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
