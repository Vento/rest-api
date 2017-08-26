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
      lat: 0,
      lng: 0
    },
    zoom: 16,
    minZoom: 13,
    maxZoom: 20
  };

  private mapStyle: any = [
    {
      "featureType": "all",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "featureType": "all",
      "stylers": [
        {
          "saturation": 36
        },
        {
          "color": "#000000"
        },
        {
          "lightness": 40
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "featureType": "all",
      "stylers": [
        {
          "visibility": "on"
        },
        {
          "color": "#000000"
        },
        {
          "lightness": 16
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "featureType": "all",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "geometry.fill",
      "featureType": "administrative",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 20
        }
      ]
    },
    {
      "elementType": "geometry.stroke",
      "featureType": "administrative",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 17
        },
        {
          "weight": 1.2
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "featureType": "administrative.country",
      "stylers": [
        {
          "color": "#ed5929"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "featureType": "administrative.locality",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "featureType": "administrative.neighborhood",
      "stylers": [
        {
          "color": "#fbfbfb"
        }
      ]
    },
    {
      "elementType": "geometry",
      "featureType": "landscape",
      "stylers": [
        {
          "color": "#1f1613"
        },
        {
          "lightness": 20
        }
      ]
    },
    {
      "elementType": "geometry.fill",
      "featureType": "landscape.natural.landcover",
      "stylers": [
        {
          "color": "#693013"
        }
      ]
    },
    {
      "elementType": "geometry",
      "featureType": "poi",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 21
        },
        {
          "visibility": "on"
        }
      ]
    },
    {
      "elementType": "geometry",
      "featureType": "poi.business",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "elementType": "geometry.fill",
      "featureType": "road",
      "stylers": [
        {
          "color": "#df6715"
        }
      ]
    },
    {
      "elementType": "geometry.fill",
      "featureType": "road.highway",
      "stylers": [
        {
          "color": "#f07d0b"
        },
        {
          "lightness": "0"
        }
      ]
    },
    {
      "elementType": "geometry.stroke",
      "featureType": "road.highway",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "featureType": "road.highway",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "featureType": "road.highway",
      "stylers": [
        {
          "color": "#ed5929"
        }
      ]
    },
    {
      "elementType": "geometry",
      "featureType": "road.arterial",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 18
        }
      ]
    },
    {
      "elementType": "geometry.fill",
      "featureType": "road.arterial",
      "stylers": [
        {
          "color": "#575757"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "featureType": "road.arterial",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "featureType": "road.arterial",
      "stylers": [
        {
          "color": "#2c2c2c"
        }
      ]
    },
    {
      "elementType": "geometry",
      "featureType": "road.local",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 16
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "featureType": "road.local",
      "stylers": [
        {
          "color": "#999999"
        }
      ]
    },
    {
      "elementType": "geometry",
      "featureType": "transit",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 19
        }
      ]
    },
    {
      "elementType": "geometry",
      "featureType": "water",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 17
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
    Geolocation.getCurrentPosition().then((position) => {
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
      console.log('geolocation error', error);
    });
  }
}
