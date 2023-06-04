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
    const observerTracksTrending$ = this.trackService.dataTracksTrending$.subscribe(
      response => {
        this.tracksTrending = response;
        this.tracksRandom = response;
      });

      const observerTracksRandom$ = this.trackService.dataTracksRandom$.subscribe(
        response => {
          this.tracksRandom = [...this.tracksRandom, ...response]; //Contatenando items al array
        });

    this.listObservers$ = [observerTracksTrending$, observerTracksRandom$]
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach( u => u.unsubscribe() );
  }

}
