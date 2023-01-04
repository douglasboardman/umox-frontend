import { TestBed } from '@angular/core/testing';

import { ValidacaoInputService } from './validacao-input.service';

describe('ValidacaoInputService', () => {
  let service: ValidacaoInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidacaoInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
