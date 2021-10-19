import { TestBed } from '@angular/core/testing';

import { LiveClientDataService } from './live-client-data.service';

describe('LiveClientDataService', () => {
  let service: LiveClientDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiveClientDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
