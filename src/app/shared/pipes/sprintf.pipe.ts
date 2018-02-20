import {Pipe, PipeTransform} from '@angular/core';

const sprintf = require('sprintf-js').sprintf;

@Pipe({
    name: 'sprintf'
})
export class SprintfPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        return sprintf(value, ...args);
    }

}
