import { Injectable, EventEmitter } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';
import { BehaviorSubject, Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {
  public callback:EventEmitter<any> = new EventEmitter<any>();

  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined);

  public timeElapsed$: BehaviorSubject<string> = new BehaviorSubject('00:00');
  public timeRemaining$: BehaviorSubject<string> = new BehaviorSubject('-00:00');

  public playerStatus$: BehaviorSubject<string> = new BehaviorSubject('paused');  
  
  public audio!: HTMLAudioElement;  

  constructor() 
  { 
    this.audio = new Audio();

    this.trackInfo$.subscribe(response => {
      if(response)
      {      
        this.setAudio(response);
      }
    });

    this.listenAllEvents();
  }
  
  private listenAllEvents(): void
  {
    this.audio.addEventListener('timeupdate', this.calculateTime, false);
    this.audio.addEventListener('playing', this.setPlayerStatus, false);
    this.audio.addEventListener('play', this.setPlayerStatus, false);
    this.audio.addEventListener('pause', this.setPlayerStatus, false);
    this.audio.addEventListener('ended', this.setPlayerStatus, false);
  }

  private calculateTime = () =>
  {
    const {duration, currentTime} = this.audio;   
    
    this.setTimeElapsed(currentTime);
    this.setTimeRemaining(currentTime, duration);
  }

  private setTimeElapsed(currentTime: number) : void
  {
    let seconds = Math.floor(currentTime % 60);
    let minutes = Math.floor((currentTime / 60) % 60);
        
    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;
    const displayFormat = `${displayMinutes}:${displaySeconds}`;    

    this.timeElapsed$.next(displayFormat);
  }

  private setTimeRemaining(currentTime: number, duration: number): void {
    let timeLeft = duration - currentTime;
    let seconds = Math.floor(timeLeft % 60);
    let minutes = Math.floor((timeLeft / 60) % 60);

    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;
    const displayFormat = `-${displayMinutes}:${displaySeconds}`
    this.timeRemaining$.next(displayFormat)
  }

  private setPlayerStatus = (state: any) => 
  {
    switch (state.type) 
    {
      case 'play':
        this.playerStatus$.next('play')
        break;
      case 'playing':
        this.playerStatus$.next('playing')
        break;
      case 'ended':
        this.playerStatus$.next('ended')
        break;
      default:
        this.playerStatus$.next('paused')
        break;
    }
  }

  public togglePlayer(): void 
  {
    (this.audio.paused) ? this.audio.play() : this.audio.pause();
  }  

  public setAudio(track:TrackModel):void
  {
    console.log('Track mms:>', track);
    this.audio.src = track.url;
    this.audio.play();
  }
}
