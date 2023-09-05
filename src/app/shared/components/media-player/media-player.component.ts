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
  listObservers$: Array<Subscription> = [];
  state: string = 'paused';

  constructor(public multimediaService: MultimediaService) { }

  ngOnInit(): void {
    const observer1$ = this.multimediaService.playerStatus$
      .subscribe(status => this.state = status);

    this.listObservers$ = [observer1$];
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach(u => u.unsubscribe());   
  }
}
