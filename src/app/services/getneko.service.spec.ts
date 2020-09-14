import { TestBed } from '@angular/core/testing';

import { NekoServiceService } from './neko-service.service';

describe('NekoServiceService', () => {
  let service: NekoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NekoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
