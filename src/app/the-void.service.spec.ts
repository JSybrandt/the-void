import { TestBed } from '@angular/core/testing';

import { TheVoidService } from './the-void.service';

describe('TheVoidService', () => {
  let service: TheVoidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TheVoidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
