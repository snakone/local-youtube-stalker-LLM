import { Injectable } from '@angular/core';

import {
  HttpHeaders,
  HttpClient,
  HttpParams,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable} from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()

export class HttpService {

  private readonly content = 'Content-type';
  private readonly accept = 'Accept';
  private readonly type = 'application/json';
  private readonly default = 'application/json';

  constructor(
    private http: HttpClient,
  ) {}

  public get<T>(url: string,
                headers?: HttpHeaders,
                params?: HttpParams): Observable<T> {
    return this.http.get<T>(url, { headers: this.createHeaders(headers), params })
            .pipe(catchError((err: HttpErrorResponse) => { throw err; }
    ));
  }

  public post<T>(url: string,
                 body: any | null,
                 headers?: HttpHeaders,
                 params?: HttpParams): Observable<T> {
    return this.http.post<T>(url, body, { headers: this.createHeaders(headers), params })
            .pipe(catchError((err: HttpErrorResponse) => { throw err; }
    ));
  }

  private createHeaders(_headers?: HttpHeaders): HttpHeaders {
    const contentType = _headers ? (_headers.get(this.type) || this.default) : this.default;
    const accept = _headers ? (_headers.get(this.accept) || this.default) : this.default;
    const headers = _headers || new HttpHeaders();

    return headers
      .set(this.content, contentType)
      .set(this.accept, accept)
  }

}