import { TestBed, async, inject } from '@angular/core/testing';

import { ProfileGuard } from './profile.guard';
import {UserService} from '../../../services/user.service';
import {HttpModule} from '@angular/http';
import {RouterTestingModule} from '@angular/router/testing';

describe('ProfileGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpModule
      ],
      providers: [ProfileGuard, UserService]
    });
  });

  it('should ...', inject([ProfileGuard], (guard: ProfileGuard) => {
    expect(guard).toBeTruthy();
  }));
});
