import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';
import { TrackService } from '@modules/tracks/services/track.service';
import { Subscription, firstValueFrom } from 'rxjs';
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
    this.loadDataAll();
    this.loadDataRandom();
  }

  ngOnDestroy(): void {
    
  }

  private async loadDataAll(): Promise<any>
  {
    this.tracksTrending = await firstValueFrom(this.trackService.getAllTracks$());
  }

  private loadDataRandom(): void
  {
    this.trackService.getTracksRandom$()
      .subscribe({
        next: (v) => { this.tracksRandom = v },        
        complete: () => console.info('Complete')
      });
  }
}
