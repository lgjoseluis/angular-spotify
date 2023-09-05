import { Component, Input, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';
import { MultimediaService } from '@shared/services/multimedia.service';

@Component({
  selector: 'app-card-player',
  templateUrl: './card-player.component.html',
  styleUrls: ['./card-player.component.scss']
})
export class CardPlayerComponent implements OnInit {
  @Input() mode:'small'|'big' = 'small';
  @Input() track!: TrackModel;

  constructor(private _mutimediaService: MultimediaService) { }

  ngOnInit(): void {
  }

  public sendPlay(track:TrackModel):void{
    //this._mutimediaService.callback.emit(track);
    this._mutimediaService.trackInfo$.next(track);
  }
}
