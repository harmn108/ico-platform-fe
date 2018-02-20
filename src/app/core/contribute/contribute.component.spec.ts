import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributeComponent } from './contribute.component';
import {MatInputModule, MatProgressBarModule} from '@angular/material';
import {ControlMessagesComponent} from '../validator/control-message.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateModule} from '@ngx-translate/core';

describe('ContributeComponent', () => {
  let component: ContributeComponent;
  let fixture: ComponentFixture<ContributeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContributeComponent, ControlMessagesComponent ],
      imports: [
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        MatProgressBarModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [UserService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
