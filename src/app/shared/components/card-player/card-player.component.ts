import { Component, Input, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';

@Component({
  selector: 'app-card-player',
  templateUrl: './card-player.component.html',
  styleUrls: ['./card-player.component.scss']
})
export class CardPlayerComponent implements OnInit {
  @Input() mode:'small'|'big' = 'small';
  @Input() track!: TrackModel;

  constructor() { }

  ngOnInit(): void {
  }

}
