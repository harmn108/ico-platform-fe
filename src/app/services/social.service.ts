// import { Injectable } from '@angular/core';
// import {environment} from '../../environments/environment';
// import { FacebookService, InitParams, UIParams, UIResponse } from 'ngx-facebook';
//
// @Injectable()
// export class SocialService {
//
//     constructor(private fb: FacebookService) {
//       const initParams: InitParams = {
//           appId: environment.fbapi,
//           xfbml: true,
//           version: 'v2.10'
//       };
//
//       fb.init(initParams);
//     }
//
//     fbShare(url) {
//         const options: UIParams = {
//             method: 'share',
//             href: url,
//         };
//
//         this.fb.ui(options)
//             .then((res: UIResponse) => {
//                 console.log('Got the users profile', res);
//             })
//             .catch(err => console.log(err));
//
//     }
//
// }
