import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MockLiveClientEventsService } from './mock-live-client-events.service';

describe('MockLiveClientEventsService', () => {
  let service: MockLiveClientEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(MockLiveClientEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
