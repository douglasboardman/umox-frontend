import { TestBed } from '@angular/core/testing';

import { MessangerService } from './messenger.service';

describe('MessangerService', () => {
  let service: MessangerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessangerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
