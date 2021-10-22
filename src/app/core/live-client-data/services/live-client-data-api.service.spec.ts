import { TestBed } from '@angular/core/testing';
import { LiveClientDataApiService } from './live-client-data-api.service';

describe('LiveClientDataApiService', () => {
  let service: LiveClientDataApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiveClientDataApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
