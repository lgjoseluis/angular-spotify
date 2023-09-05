import { Injectable, EventEmitter } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';
import { BehaviorSubject, Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {
  public callback:EventEmitter<any> = new EventEmitter<any>();

  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined);
  public audio!: HTMLAudioElement;
  

  constructor() 
  { 
    this.audio = new Audio();

    this.trackInfo$.subscribe(response => {
      if(response)
      {      
        this.setAudio(response);
      }
    })
  }

  public setAudio(track:TrackModel):void
  {
    console.log('Track mms:>', track);
    this.audio.src = track.url;
    this.audio.play();
  }
}
