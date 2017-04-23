import { TestBed, inject } from '@angular/core/testing';

import { LwsmService } from './lwsm.service';

describe('LwsmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LwsmService]
    });
  });

  it('should ...', inject([LwsmService], (service: LwsmService) => {
    expect(service).toBeTruthy();
  }));
});
