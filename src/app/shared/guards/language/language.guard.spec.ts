import { TestBed, async, inject } from '@angular/core/testing';

import { LanguageGuard } from './language.guard';

describe('LanguageGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LanguageGuard]
    });
  });

  it('should ...', inject([LanguageGuard], (guard: LanguageGuard) => {
    expect(guard).toBeTruthy();
  }));
});
