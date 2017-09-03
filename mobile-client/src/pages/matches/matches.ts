import {Component, ElementRef, ViewChild} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {ViewUtilities} from '../../providers/view-utilities/view-utilities';
import {GoogleMapsProvider} from "../../providers/google-maps/google-maps";
import {MatchService} from "../../providers/match/match-service";
import {StompService, StompState} from "@stomp/ng2-stompjs";
import {LatLngLiteral, GoogleMapsAPIWrapper, AgmMap} from '@agm/core';
import {IPosition, IUserLocation} from "./MatchesModel";
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Geolocation} from 'ionic-native';
import {ProfileStorage} from "../../providers/profile/profile-storage";
import {IProfile} from "models/ProfileModel";
import { ModalController, NavParams } from 'ionic-angular';



declare let google: any;

@Component({
  selector: 'page-matches',
  templateUrl: 'matches.html'
})
export class Matches {

  @ViewChild(AgmMap) mapElement: AgmMap;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
  private markers: any = [];
  private map: GoogleMapsAPIWrapper;
  private username: string;
  private activeMarker: any;
  private circleRadius: number = 100;

  constructor(public navCtrl: NavController, private platform: Platform, private viewUtilities: ViewUtilities,
              public googleMapsProvider: GoogleMapsProvider, private matchService: MatchService,
              private _stompService: StompService, private http: Http, private profileStorage: ProfileStorage,
              private modalCtrl: ModalController) {
    this.initWebsocket();
  }

  public loadAPIWrapper(map) {
    this.map = map;
  }

  public animateCircle() {
    let direction = 1;
    let rMin = 150, rMax = 1000;
    setInterval(() => {
      let radius = this.circleRadius;
      if ((radius > rMax) || (radius < rMin)) {
        direction *= -1;
      }
      this.circleRadius = radius + direction * 10;
    }, 50);
  }

  public ionViewDidLoad(): void {

    this.platform.ready().then(() => {
      this.googleMapsProvider.init(this.mapElement, this.pleaseConnect.nativeElement);
    });

    this.profileStorage.getProfile().then((profile: IProfile) => {
      this.username = profile.name;
    })
  }

  public ionViewWillLeave() {
    //this.wsDisconnect();
  }

  private initWebsocket(): void {
    this._stompService.state
      .map((state: number) => StompState[state])
      .subscribe((status: string) => {
        console.log(`Stomp connection status: ${status}`);
        this.sendLocation();
      });

    this.platform.ready().then(() => {
      this.wsConnect();
    });
  }

  private wsConnect() {
    let aroundMeSubscription = this._stompService.subscribe(`/app/around/${this.username}`);
    aroundMeSubscription.map((message: any) => {
      return message.body;
    }).subscribe((msg_body: string) => {
      console.log(JSON.parse(msg_body), msg_body);
      this.markers = [];
      JSON.parse(msg_body).forEach((location: IUserLocation) => {
        let marker: any = {};
        marker.lat = location.position.x;
        marker.lng = location.position.y;
        marker.label = location.username;
        this.markers.push(marker);
      })
    });

    let pushNotificationSubscription = this._stompService.subscribe(`/app/challenge/${this.username}`);
    pushNotificationSubscription.map((message: any) => {
      return message.body;
    }).subscribe((msg_body: string) => {
      console.log(JSON.parse(msg_body), msg_body);
    });

    let errorSubscription = this._stompService.subscribe('/queue/errors');
    errorSubscription.map((message: any) => {
      return message.body;
    }).subscribe((msg_body: string) => {
      console.log(`Error: ${msg_body}`);
    });
  }

  private sendLocation() {
    Geolocation.getCurrentPosition().then((position) => {
      let coords: IPosition = {x: position.coords.latitude, y: position.coords.longitude};
      let userLocation: IUserLocation = {
        username: this.username,
        position: coords
      };
      this._stompService.publish(`/app/track/${this.username}`, JSON.stringify(userLocation));
    });
  }

  private openDetail(marker): void {
    this.activeMarker = "test";
    console.log(this.activeMarker)
  }

  private closeDetail(): void {
    this.activeMarker = undefined;
  }

  private showRouteSelectionPrompt(): void {
    let routesModal = this.modalCtrl.create(ChallengeRoute, { userId: 8675309 });
    routesModal.present();
  }
}

@Component({
  selector: 'page-challenge-route-select',
  template: '<alert-wrapper>test</alert-wrapper>'
})
export class ChallengeRoute {

  constructor(params: NavParams) {
    console.log('UserId', params.get('userId'));
  }
}
