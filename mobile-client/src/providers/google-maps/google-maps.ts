import {Injectable} from '@angular/core';
import {Geolocation} from 'ionic-native';
import {ConnectivityProvider} from "../connectivity/connectivity";
import {Marker, GoogleMap, MapOptions, MarkerOptions} from "@agm/core/services/google-maps-types";
import {LatLngLiteral, GoogleMapsAPIWrapper, AgmMap} from "@agm/core";

export declare let google: any;

@Injectable()
export class GoogleMapsProvider {

  public map: GoogleMapsAPIWrapper;
  private mapElement: any;
  private pleaseConnect: any;
  private currentMarker: MarkerOptions;

  public options: MapOptions = {
    center: {
      lat: 6.132205,
      lng: -2.7312286
    },
    zoom: 16,
    minZoom: 13,
    maxZoom: 20
  };

  private mapStyle: any = [
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e9e9e9"
        },
        {
          "lightness": 17
        }
      ]
    },
    {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        },
        {
          "lightness": 20
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#ffffff"
        },
        {
          "lightness": 17
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#ffffff"
        },
        {
          "lightness": 29
        },
        {
          "weight": 0.2
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        },
        {
          "lightness": 18
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        },
        {
          "lightness": 16
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        },
        {
          "lightness": 21
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dedede"
        },
        {
          "lightness": 21
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "visibility": "on"
        },
        {
          "color": "#ffffff"
        },
        {
          "lightness": 16
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "saturation": 36
        },
        {
          "color": "#333333"
        },
        {
          "lightness": 40
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f2f2f2"
        },
        {
          "lightness": 19
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#fefefe"
        },
        {
          "lightness": 20
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#fefefe"
        },
        {
          "lightness": 17
        },
        {
          "weight": 1.2
        }
      ]
    }
  ];

  constructor(public connectivityService: ConnectivityProvider) {
  }

  public init(mapElement: AgmMap, pleaseConnect: any): Promise<any> {

    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;
    this.map = this.mapElement._mapsWrapper;

    return this.loadGoogleMaps();

  }

  public loadGoogleMaps(): Promise<any> {
    if (this.connectivityService.isOnline()) {
      this.enableMap();
    }
    else {
      this.disableMap();
    }

    this.addConnectivityListeners();
    this.centerToMyLocation()
    return new Promise((resolve) => {

      if (this.connectivityService.isOnline()) {
        this.enableMap();
      }
      else {
        this.disableMap();
      }

      this.addConnectivityListeners();
      this.centerToMyLocation()

    });

  }

  public disableMap(): void {

    if (this.pleaseConnect) {
      this.pleaseConnect.style.display = "block";
    }

  }

  public enableMap(): void {

    if (this.pleaseConnect) {
      this.pleaseConnect.style.display = "none";
    }

  }

  public addConnectivityListeners(): void {

    this.connectivityService.watchOnline().subscribe(() => {
      console.log("online");
      this.enableMap();
    });

    this.connectivityService.watchOffline().subscribe(() => {
      console.log("offline");
      this.disableMap();
    });

  }

  public centerToMyLocation() {
    Geolocation.getCurrentPosition({enableHighAccuracy: true, timeout: 5000, maximumAge: 0}).then((position) => {
      let latLng: LatLngLiteral = {lat: position.coords.latitude, lng: position.coords.longitude};
      this.currentMarker = <MarkerOptions> {};
      this.currentMarker.position = latLng;
      this.options.center = latLng;
      this.options.zoom = 13;
      this.mapElement.triggerResize()
        .then(() => {
          this.map.setCenter(latLng)
          this.map.panTo(latLng);
        });
    }).catch(error => {
      console.log('geolocation error', error.message);
    });
  }
}

