import { Component, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.scss']
})
export class MediaPlayerComponent implements OnInit {
  mockCover: TrackModel = {
    cover:'https://cdn.pixabay.com/photo/2020/08/31/00/33/guitar-5531027_960_720.jpg',
    album:'Gioli & Assia',
    name:'BEBE (Oficial)',
    url:'http://locahost/track.mp3',
    _id: 1
  }

  constructor() { }

  ngOnInit(): void {
  }

}
