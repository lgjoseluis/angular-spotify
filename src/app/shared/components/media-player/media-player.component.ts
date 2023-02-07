import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.scss']
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
  mockCover: TrackModel = {
    cover:'https://cdn.pixabay.com/photo/2020/08/31/00/33/guitar-5531027_960_720.jpg',
    album:'Gioli & Assia',
    name:'BEBE (Oficial)',
    url:'http://locahost/track.mp3',
    _id: 1
  }
  listObservers$:Array<Subscription> = [];

  constructor(private _multimediaService: MultimediaService) { }

  ngOnInit(): void {
    const observer1$: Subscription = this._multimediaService.callback.subscribe(
      (response:TrackModel) =>{
        console.log('Recibiendo', response);
      }
    );

    this.listObservers$ = [observer1$];
  }

  ngOnDestroy(): void {
      this.listObservers$.forEach( u => u.unsubscribe());
  }
}
