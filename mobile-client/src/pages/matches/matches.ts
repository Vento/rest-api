import { Component } from '@angular/core';

import { NavController, Platform } from 'ionic-angular';
import { ViewUtilities } from '../../providers/view-utilities/view-utilities';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng } from 'ionic-native';
import { Geolocation } from 'ionic-native';


@Component({
  selector: 'page-matches',
  templateUrl: 'matches.html'
})
export class Matches {

    map: GoogleMap;

    constructor(public navCtrl: NavController, public platform: Platform, public viewUtilities: ViewUtilities) {
        this.platform.ready().then(() => {
            this.loadMap();
        });
    }
    ionViewWillEnter() {
        this.viewUtilities.presentLoading();    
    }
    ionViewDidLoaded() {
        this.platform.ready().then(() => {
            this.loadMap();
        });     
    }

    loadMap(){
        Geolocation.getCurrentPosition().then((position) => {

            let location = new GoogleMapsLatLng(position.coords.latitude, position.coords.longitude);

            this.map = new GoogleMap('map', {
            'backgroundColor': 'white',
            'controls': {
                'compass': true,
                'myLocationButton': true,
                'indoorPicker': true,
                'zoom': true
            },
            'gestures': {
                'scroll': true,
                'tilt': true,
                'rotate': true,
                'zoom': true
            },
            'camera': {
                'latLng': location,
                'tilt': 30,
                'zoom': 15,
                'bearing': 50
            }
            });
            this.viewUtilities.presentToast(position.coords.latitude +' '+ position.coords.longitude); 
            this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
                this.viewUtilities.dismissLoading(); 
                this.viewUtilities.presentToast('Map is ready!');   
            },
                err => {
                this.viewUtilities.onError(err);      
          } );
        });

    }

}
