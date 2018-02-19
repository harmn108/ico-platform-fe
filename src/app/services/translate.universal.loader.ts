import {Observable} from 'rxjs/Observable';
import {TranslateLoader} from '@ngx-translate/core';
const fs = require('fs');

export class TranslateUniversalLoader implements TranslateLoader {
    constructor(private prefix = 'i18n', private suffix = '.json') {}

    public getTranslation(lang: string): Observable<any> {
        return Observable.create(observer => {
            observer.next(JSON.parse(fs.readFileSync(`${this.prefix}/${lang}${this.suffix}`, 'utf8')));
            observer.complete();
        });
    }
}
