import { TestBed, inject } from '@angular/core/testing';

import { WindowSessionService } from './window-session.service';

describe('WindowSessionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WindowSessionService]
    });
  });

  it('should ...', inject([WindowSessionService], (service: WindowSessionService) => {
    expect(service).toBeTruthy();
  }));
});
