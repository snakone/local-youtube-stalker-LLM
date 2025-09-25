import { inject, Injectable } from "@angular/core";
import { filter, map, Observable } from "rxjs";

import { HttpService } from "../http.service";
import { ScrapperResponse } from "@shared/definitions/interfaces";

const URI = 'http://localhost:3000';
const route = 'scrapper';

@Injectable({ providedIn: 'root' })

export class ScrapperService {

  private http = inject(HttpService);

  constructor() {}

  public scrappePage(url: string): Observable<string> {
    return this.http.get<ScrapperResponse>(`${URI}/${route}?url=${url}`)
                     .pipe(
                      filter(res => res.ok),
                      map((res) => res.text));
  }
  
}