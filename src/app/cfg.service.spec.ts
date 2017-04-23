import { TestBed, inject } from '@angular/core/testing';

import { CfgService } from './cfg.service';

describe('CfgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CfgService]
    });
  });

  it('should ...', inject([CfgService], (service: CfgService) => {
    expect(service).toBeTruthy();
  }));
});
