import { Component, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';
import { SearchService } from '@modules/history/services/search.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit {
  listResults$: Observable<any> = of();

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
  }

  public receiveData(event:string):void
  {
    this.listResults$ = this.searchService.serarchTracks$(event);
  }
}
