import { Component } from '@angular/core';

import { NavController, Platform, Events, AlertController, PopoverController, ViewController } from 'ionic-angular';
import {Geolocation, GeolocationOptions, GoogleMap, GoogleMapsEvent, GoogleMapsLatLng,
        GoogleMapsPolyline, CameraPosition, GoogleMapsMarkerOptions, GoogleMapsMarker} from 'ionic-native';
import { LocationAccuracy } from 'ionic-native';
import { LocationTrackerService } from '../../providers/location-tracker-service';
import { ViewUtilities } from '../../providers/view-utilities/view-utilities';
import { GoogleMapComponent } from '../../components/googlemaps/googlemaps-component';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
    selector: 'page-matches',
    templateUrl: 'matches.html'
})
export class Matches {

    public map: GoogleMap;
    private currentCoords: { lat: number, lng: number } = { lat: 40.64361, lng: 22.9308 };
    private mapOptions: { zoom: number, tilt: number } = { zoom: 12, tilt: 10 };
    private geolocationWatch: any;
    private stompClient: any;
    private isConnected: boolean = true;
    private polyPoints: GoogleMapsLatLng[];
    private socket:any;

    constructor(public navCtrl: NavController, private platform: Platform, private viewUtilities: ViewUtilities,
        private locationTrackerService: LocationTrackerService, private events: Events, private alertCtrl: AlertController,
        private popoverCtrl: PopoverController) {
        this.init();
    }
    
    private ionViewWillEnter() {
        //this.viewUtilities.presentLoading();   
    }

    private init() {
        this.socket =  new SockJS('/api/matches/ws');
        this.platform.ready().then(() => {
            this.requestHighAccuracy();
            this.addConnectivityListeners();
            //this.addLocationTrackingListener();
            this.wsConnect();
        }); 
    } 
    
    private ionViewWillLeave() {
        this.removeConnectivityListeners();
        this.removeGeolocationListeners();
        //this.removeLocationTrackingListener();
        this.wsDisconnect();
    }

    private doRefresh(refresher) {
        this.sendLocation();
        setTimeout(() => {
            refresher.complete();
        }, 2000);
    }
    
    onMapInit(map: GoogleMap) {

        map.one(GoogleMapsEvent.MAP_READY).then((e) => {
                alert("GoogleMap.onMapReady(): " + JSON.stringify(e));

                map.setMyLocationEnabled(true);
            
            let geolocationOptions: GeolocationOptions;
            geolocationOptions.enableHighAccuracy = true;

            Geolocation.getCurrentPosition().then((position) => {
                let myPosition: GoogleMapsLatLng = new GoogleMapsLatLng(position.coords.latitude, position.coords.longitude);

                let center: CameraPosition; // = { target: myPosition, zoom: 18, tilt: 30 };
                center.target = myPosition;
                center.zoom = 18;
                center.tilt = 30;
                
                map.moveCamera(position);

            }, (err) => {
                this.viewUtilities.presentToast(err);
            });
            
            let poly = new GoogleMapsPolyline({'color': "orange",'width': 10});

            map.on(GoogleMapsEvent.MAP_LONG_CLICK).subscribe((e) => {
                this.viewUtilities.presentToast("long click");
                this.polyPoints.push(e.latLng)
                poly.setPoints(this.polyPoints);
                map.addPolyline(poly).then((polyline: GoogleMapsPolyline) => {
              });
            });
            
            map.on(GoogleMapsEvent.MAP_CLICK).subscribe((e) => {
                this.viewUtilities.presentToast("click " + e.latLng.lat() + " " +e.latLng.lng());
                var pointMarker = new GoogleMapsMarker({
                    position: e.latLng
                });
                map.addMarker(pointMarker).then((marker: GoogleMapsMarker) => {
                    //marker.showInfoWindow();
                    marker.setDraggable(true);
                    marker.addEventListener(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
                        this.viewUtilities.presentToast("Marker click");
                        marker.showInfoWindow();
                    });
                    marker.addEventListener(GoogleMapsEvent.INFO_CLICK).subscribe(() => {
                        marker.remove();
                    });
                });
            });
        });
        this.map = map;
    } 

    private addConnectivityListeners() {
        this.events.subscribe('connectivity:connected', con => {
            this.viewUtilities.presentToast('Back Online!');
            this.isConnected = true;
        });
        this.events.subscribe('connectivity:disconnected', con => {
            this.presentAlert(
                'Oh noes!',
                'Internet connection seems to done away, please reconnect in order to continue',
                ['Ok']
            );
            this.isConnected = false;
        });
    }

    private removeConnectivityListeners() {
        this.events.unsubscribe('connectivity:connected');
        this.events.unsubscribe('connectivity:disconnected');
    }

    private addMarkerGeolocationListeners(marker: GoogleMapsMarker, map: GoogleMap){  
        this.geolocationWatch = Geolocation.watchPosition().subscribe(pos => {
            this.currentCoords.lat = pos.coords.latitude;
            this.currentCoords.lng = pos.coords.longitude;
            this.viewUtilities.presentToast('Updated lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
            marker.setPosition(new GoogleMapsLatLng(pos.coords.latitude, pos.coords.longitude));
            map.refreshLayout();
        });
    }

    private removeGeolocationListeners() {
        this.geolocationWatch.unsubscribe();
    }

    private addLocationTrackingListener(){
        this.locationTrackerService.startTracking();
        this.viewUtilities.presentToast(this.locationTrackerService.lat+" - "+this.locationTrackerService.lng);
    }

    private removeLocationTrackingListener(){
        this.locationTrackerService.stopTracking();
    }
    private requestHighAccuracy() {
        LocationAccuracy.canRequest().then((canRequest: boolean) => {
            if(canRequest) {
                LocationAccuracy.request(LocationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
                    () => { },
                    error => {
                        this.viewUtilities.onError("Accuracy request failed: error code=" + error.code + "; error message=" + error.message)
                        if (error.code !== LocationAccuracy.ERROR_USER_DISAGREED) {
                        }
                    }    
                );
            }
        });
    }   

    private wsConnect() {
        this.stompClient = Stomp.over(this.socket);
        setInterval(this.sendLocation(), 5000);
        this.stompClient.connect({ login: "", passcode: "", host: "" }, function (frame) {
            this.stompClient.subscribe('/topic/track', function (messageOutput) {
                console.log("subscribe /topic/track");
                this.showMessageOutput(JSON.parse(messageOutput.body));
            });

            this.stompClient.subscribe('/user/queue/errors', function (messageOutput) {
                console.log("subscribe /queue/errors");
                this.showMessageOutput(JSON.parse(messageOutput.body));
            });
           console.log("test");
        }, error => {
                console.log('STOMP '+ error);
                setTimeout(this.wsConnect(), 5000);
                console.log('STOMP: Reconecting in 5 seconds');
        }
        );
    }

    private wsDisconnect() {
        if(this.stompClient != null) {
            this.stompClient.disconnect(() => {
                console.log("Disconnected");
            });
        }
    }
    private sendLocation() {
        this.stompClient.send("/app/track", {}, JSON.stringify( {'username':"test", 'position': {"x":"1.222", "y":"2.33"} } ));
    }

    private showMessageOutput(messageOutput) {
        console.log(messageOutput.username);
        console.log(messageOutput.position);
    }

    private presentAlert(title?: string, subtitle?: string, ... buttons: any[]) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: subtitle,
            buttons: ['Ok']
        });
        alert.present();
    }

    private presentPopover(myEvent) {
        let popover = this.popoverCtrl.create(MatchPopoverPage);
        popover.present({
            ev: myEvent
        });
    }
}

@Component({
  template: `
    <ion-list>
      <ion-list-header>Menu</ion-list-header>
      <button ion-item (click)="refreshMap()">Refresh map</button>
      <button ion-item (click)="close()">Close</button>
    </ion-list>
  `
})
export class MatchPopoverPage {
  constructor(public viewCtrl: ViewController, private matchesComponent: Matches) {}

  refreshMap() {
      this.matchesComponent.onMapInit(this.matchesComponent.map);
  }
    
  close() {
    this.viewCtrl.dismiss();
  }
}