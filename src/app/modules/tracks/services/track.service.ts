import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError, } from 'rxjs/operators';
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
        mergeMap( ({data}: any) => this.skipById(data, 1)),  
        catchError((error) => {
          const {status:code, statusText:status} = error;
          console.table({code, status});
          return of([])
        })      
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
