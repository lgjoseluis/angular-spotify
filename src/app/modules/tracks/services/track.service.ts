import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  private readonly URL = environment.api;

  constructor(private httpClient: HttpClient) { 
    
  }

  public getAllTracks$():Observable<any> {
    return this.httpClient
      .get(`${this.URL}/tracks`)
      .pipe(
        map( (dataRaw: any) => {
          return dataRaw.data;
        })
      );      
  }

  public getTracksRandom$():Observable<any> {
    return this.httpClient
      .get(`${this.URL}/tracks`)
      .pipe(
        map( ({data}: any) => {
          return data.reverse();
        }),
        map((dataReverse) => {
          return dataReverse.filter((track:TrackModel) => track._id !== 1);
        })
      );      
  }
}
