//This will intercept every call to the backend and place the user id and token in the header, if available.
//It is used for authentication.

import { Injectable } from '@angular/core';
import { Injector } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpHeaders,
    HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        private inj: Injector
    ) { }
    public env = environment;
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (sessionStorage.getItem('USER_ID')) {
            const headers = new HttpHeaders({
                'user_id': sessionStorage.getItem('USER_ID') || '',
                'token': sessionStorage.getItem('TOKEN') || '',
                'Content-Type': 'application/json'
            });
            request = request.clone({headers});
        }
        return next.handle(request).pipe(
            map(event => {
                if (event instanceof HttpResponse) {
                    if (event['body'] && event['body']['error']) {
                        console.error(event['body']['error']);
                    }
                }
                return event;
            }),
            catchError(error => {
                return throwError(error);
            }),
            finalize(() => {
            })
        )
    }
}
