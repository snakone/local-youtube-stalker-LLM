import { inject, Injectable } from "@angular/core";
import { filter, map, Observable } from "rxjs";
import { HttpService } from "../http.service";
import { VideoDetails } from "youtube-caption-extractor";
import { VideoDetailsResponse } from "@shared/definitions/interfaces";

const URI = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })

export class YoutubeService {

  private http = inject(HttpService);

  constructor() {}

  public getVideoDetails(id: string, lang = 'es'): Observable<VideoDetails> {
    return this.http.get<VideoDetailsResponse>(`${URI}?id=${id}&lang=${lang}`)
                     .pipe(
                      filter(res => res.ok),
                      map((res) => res.details));
  }
  
}