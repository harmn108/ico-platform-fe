import {Injectable} from '@angular/core';
import {HttpRequest, HttpResponse} from '@angular/common/http';

@Injectable()
export class HttpCacheService {

    private responses = [];

    constructor() {
    }

    /**
     * Returns a cached response, if any, or null if not present.
     */
    get(req: HttpRequest<any>): HttpResponse<any> | null {
        return this.responses[req.url];
    }

    /**
     * Adds or updates the response in the cache.
     */
    put(req: HttpRequest<any>, resp: HttpResponse<any>): void {
        this.responses[req.url] = resp;
    }
}
