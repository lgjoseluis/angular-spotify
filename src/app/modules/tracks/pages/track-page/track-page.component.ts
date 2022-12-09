import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-track-page',
  templateUrl: './track-page.component.html',
  styleUrls: ['./track-page.component.scss']
})
export class TrackPageComponent implements OnInit {
  mockTrackList = [
    {
      name:'BEBE (Oficial)'
    },
    {
      name:'BEBE (Oficial)'
    },
    {
      name:'BEBE (Oficial)'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
