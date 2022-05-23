import { TestBed } from '@angular/core/testing';

import { XodusService } from './xodus.service';

describe('XodusService', () => {
  let service: XodusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XodusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
