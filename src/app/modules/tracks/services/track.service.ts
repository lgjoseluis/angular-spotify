import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';
import { Observable, observable, of } from 'rxjs';

import * as dataRaw from '../../../data/tracks.json'

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  public dataTracksTrending$:Observable<TrackModel[]> = of([]);
  public dataTracksRandom$:Observable<any> = of([]);

  constructor() { 
    const {data}: any = (dataRaw as any).default; // {} -> destructuración

    this.dataTracksTrending$ = of(data);

    this.dataTracksRandom$ = new Observable( (observer) => {
      const trackExample: TrackModel ={
        _id:9,
        name:'Leve',
        album:'Cartel de Santa',
        url:'http://',
        cover:'https://setlist.me/wp-content/uploads/2018/10/cartel-de-santa-1503661764.85.2560x1440.jpg'
      };

      setTimeout(() => {
        observer.next([trackExample]);          
      }, 3500);
      
    });
  }
}
