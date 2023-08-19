import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';
import { TrackService } from '@modules/tracks/services/track.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-track-page',
  templateUrl: './track-page.component.html',
  styleUrls: ['./track-page.component.scss']
})
export class TrackPageComponent implements OnInit, OnDestroy {
  public tracksTrending: Array<TrackModel> = [];
  public tracksRandom: Array<TrackModel> = [];

  private listObservers$: Array<Subscription> = [];

  constructor(private trackService: TrackService) { 

  }

  ngOnInit(): void {
    this.trackService.getAllTracks$()
      .subscribe(
        response => {
          this.tracksTrending = response;
        }
      );

    this.trackService.getTracksRandom$()
      .subscribe(
        response => {
          this.tracksRandom = response;
        }
      );
  }

  ngOnDestroy(): void {
    
  }

}
