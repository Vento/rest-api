import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Route } from './route';
import { Routes } from '../../pages/routes/routes';
import { ProfileService } from '../../providers/profile/profile-service';
import { ViewUtilities } from '../../providers/view-utilities/view-utilities';
import { Geolocation, GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, CameraPosition, GoogleMapsMarkerOptions, GoogleMapsMarker,GoogleMapsPolyline, GoogleMapsPolylineOptions} from 'ionic-native';
import { LocationAccuracy } from 'ionic-native';

@Component({
  selector: 'page-route-view',
  templateUrl: 'route-view.html'
})
export class RouteViewPage {
  selectedRoute?: any;
  route?: Route;
  submitted = false;
  updatedRoutes?: any;
  map: GoogleMap;
  mapOptions: { zoom: number, tilt: number };
  currentCoords: { lat: number, lng: number };
  geolocationWatch: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewUtilities: ViewUtilities,
              private profileService: ProfileService,
              public platform: Platform) {
    this.selectedRoute = navParams.get('route');
    
    if (this.selectedRoute == "new") {
      this.route = new Route("", []);
      this.currentCoords = { lat: 40.64361, lng: 22.9308 };
      this.mapOptions = { zoom: 18, tilt: 30 };
      this.loadMap();
    } 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RouteViewPage');
  }

  loadMap(lat?: number, lng?: number) {
        let element: HTMLElement = document.getElementById('map');

        this.map = new GoogleMap(element);
        this.map.one(GoogleMapsEvent.MAP_READY).then(() =>  this.viewUtilities.presentToast('Map is ready!') );
        let latitude = (lat) ?  lat : this.currentCoords.lat;
        let longitude = (lng) ? lng : this.currentCoords.lng;
        let center: GoogleMapsLatLng = new GoogleMapsLatLng(latitude, longitude);

        let cameraPosition: CameraPosition = {
            target: center,
            zoom: this.mapOptions.zoom,
            tilt: this.mapOptions.tilt
        };
        
        this.map.moveCamera(cameraPosition);

        let markerOptions: GoogleMapsMarkerOptions = {
            position: center,
            title: 'Start'
        };

        this.map.addMarker(markerOptions).then((marker: GoogleMapsMarker) => {
            marker.showInfoWindow();
        });   
        this.addPolyline();
  }  
  
    doRefresh(refresher) {
        this.loadMap();
        setTimeout(() => {
        refresher.complete();
        }, 2000);
    }
  
    init() {
        this.platform.ready().then(() => {
          Geolocation.getCurrentPosition().then(pos => {
              this.currentCoords.lat = pos.coords.latitude;
              this.currentCoords.lng = pos.coords.longitude;
              this.loadMap(pos.coords.latitude,pos.coords.longitude);
          });   
        }); 
    }
  
  saveRoute(form) {
    this.submitted = true;

    if (form.valid) {
      this.viewUtilities.presentLoading();  
      this.profileService.createRoute(this.route).subscribe(
        updatedData => {        
          this.viewUtilities.presentToast("Route saved!");
          this.viewUtilities.dismissLoading();
          this.navCtrl.push(Routes)
        },
        err => {
          this.onError(err);
            } 
        )
    }
  }

  onError(err) {
    this.viewUtilities.dismissLoading(); 
    this.viewUtilities.presentToast(<any>err);
  } 
  
  addPolyline(coords?: number) {
    let polyPoints: GoogleMapsLatLng[] = [
      new GoogleMapsLatLng(40.64361, 22.9308),
      new GoogleMapsLatLng(40.65361, 22.9308),
      new GoogleMapsLatLng(40.66361, 22.9308),
      new GoogleMapsLatLng(40.67361, 22.9308),
    ];
    let polylineOptions: GoogleMapsPolylineOptions = {
      points: polyPoints
    };
    polylineOptions.points
    this.map.addPolyline(polylineOptions);
  }
}
