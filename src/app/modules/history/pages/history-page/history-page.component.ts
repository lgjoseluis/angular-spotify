import { Component, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';
import { SearchService } from '@modules/history/services/search.service';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit {
  listResults: TrackModel[] =[];

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
  }

  public receiveData(event:string):void
  {
    this.searchService.serarchTracks$(event)
    .subscribe(
      ({data}) =>{
        this.listResults = data;
      }
    );
  }
}
