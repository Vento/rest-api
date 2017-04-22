import { Component, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { Platform } from 'ionic-angular';
import { GoogleMap } from 'ionic-native';

@Component({
  selector: 'GoogleMap',
  template: '<div [id]="id" [style.height]="height" [style.width]="width" style="display: block;"></div>'
})    
export class GoogleMapComponent implements AfterViewInit {
  @Input() id: string = 'GoogleMap';
  @Input() height: string = '100%';
  @Input() width: string = '100%';
  @Output() init: EventEmitter<GoogleMap> = new EventEmitter<GoogleMap>();
    
  public map: GoogleMap;
  constructor(private platform: Platform) { }
    
  ngAfterViewInit(): void {
      
    this.platform.ready()
      .then(()=>{
        GoogleMap.isAvailable().then(
          res => {
            this.map = new GoogleMap(this.id);
            this.init.emit(this.map)
          },
          err => console.warn(err));
      });
  }
    
}
