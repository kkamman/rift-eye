import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LiveClientEventsService } from './live-client-events.service';

describe('LiveClientEventsService', () => {
  let service: LiveClientEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(LiveClientEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
