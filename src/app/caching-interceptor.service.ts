import {Injectable, isDevMode} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {HttpCacheService} from './http-cache.service';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
    constructor(private cache: HttpCacheService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Before doing anything, it's important to only cache GET requests.
        // Skip this interceptor if the request method isn't GET.
        if (req.method !== 'GET' || !req.headers.has('x-local-cache')) {
            return next.handle(req);
        }

        req.headers.delete('x-local-cache');

        // First, check the cache to see if this request exists.
        const cachedResponse = this.cache.get(req);
        if (cachedResponse) {

            if (isDevMode()) {
                console.log('Serving from cache', req.url);
            }


            // A cached response exists. Serve it instead of forwarding
            // the request to the next handler.
            return Observable.of(cachedResponse);
        }

        // No cached response exists. Go to the network, and cache
        // the response when it arrives.
        return next.handle(req).do(event => {
            // Remember, there may be other events besides just the response.
            if (event instanceof HttpResponse) {

                // Update the cache.
                this.cache.put(req, event);
            }
        });
    }
}
