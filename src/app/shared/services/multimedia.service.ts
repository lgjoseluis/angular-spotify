import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {
  public callback:EventEmitter<any> = new EventEmitter<any>();

  constructor() { }
}
