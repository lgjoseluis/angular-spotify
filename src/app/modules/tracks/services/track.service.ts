import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';
import { Observable } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
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
      .get(`${this.URL}/trackss`)
      .pipe(
        tap( data => console.log('Source:>', data)),
        mergeMap( ({data}: any) => this.skipById(data, 1)),
        tap( data => console.log('Result:>', data))
      );      
  }

  private skipById(listTracks: TrackModel[], id: number): Promise<TrackModel[]>
  {
    return new Promise( 
      (resolve, reject) =>{
        const listTemp = listTracks.filter(i => i._id !== id);

        resolve(listTemp);
      }
    );
  }
}
