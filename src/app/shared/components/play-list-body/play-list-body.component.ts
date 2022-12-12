import { Component, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';
import * as dataRaw from '../../../data/tracks.json'

@Component({
  selector: 'app-play-list-body',
  templateUrl: './play-list-body.component.html',
  styleUrls: ['./play-list-body.component.scss']
})
export class PlayListBodyComponent implements OnInit {
  tracks: Array<TrackModel> = [];

  constructor() { }

  ngOnInit(): void {
    const {data}: any = (dataRaw as any).default; // {} -> destructuración
    this.tracks = data;
  }

}
