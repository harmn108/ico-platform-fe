// import {async, ComponentFixture, TestBed} from '@angular/core/testing';
//
// import {ProfileComponent} from './profile.component';
// import {UserService} from '../services/user.service';
// import {HttpModule} from '@angular/http';
// import {MatProgressBarModule} from '@angular/material';
// import {RouterTestingModule} from '@angular/router/testing';
// import {TranslateModule} from '../services/@ngx-translate/core/index';
//
// describe('ProfileComponent', () => {
//     let component: ProfileComponent;
//     let fixture: ComponentFixture<ProfileComponent>;
//
//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//                 declarations: [ProfileComponent],
//                 imports: [
//                     HttpModule,
//                     MatProgressBarModule,
//                     TranslateModule.forRoot(),
//                     RouterTestingModule
//                 ],
//                 providers: [UserService]
//             })
//             .compileComponents();
//     }));
//
//     beforeEach(() => {
//         fixture = TestBed.createComponent(ProfileComponent);
//         component = fixture.componentInstance;
//         component.wallet = {
//             publicKey: 'publicKey',
//             imageURL: 'imageURL',
//             balance: 0,
//             transactions: []
//         };
//         fixture.detectChanges();
//     });
//
//     it('should be created', () => {
//         expect(component).toBeTruthy();
//     });
// });
