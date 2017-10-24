import {Component, ElementRef, ViewChild} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {GoogleMapsProvider} from "../../providers/google-maps/google-maps";
import {StompService, StompState} from "../../providers/@stomp/ng2-stompjs";
import {GoogleMapsAPIWrapper, AgmMap} from '@agm/core';
import {IPosition, IUserLocation} from "./MatchesModel";
import {Geolocation} from 'ionic-native';
import {ProfileStorage} from "../../providers/profile/profile-storage";
import {IProfile} from "models/ProfileModel";
import {ModalController} from 'ionic-angular';
import {ChallengeModal} from "./challengeModal/challengeModal";

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

  constructor(public navCtrl: NavController, private platform: Platform, public googleMapsProvider: GoogleMapsProvider,
              private _stompService: StompService, private profileStorage: ProfileStorage, private modalCtrl: ModalController) {
    this.initWebsocket();
  }

  public loadAPIWrapper(map) {
    this.map = map;
  }

  public ionViewDidLoad(): void {

    this.platform.ready().then(() => {
      this.googleMapsProvider.init(this.mapElement, this.pleaseConnect.nativeElement);
    });

    this.profileStorage.getProfile().then((profile: IProfile) => {
      this.username = (profile) ? profile.name : undefined;
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
  }

  private closeDetail(): void {
    this.activeMarker = undefined;
  }

  private showRouteSelectionPrompt(): void {
    let routesModal = this.modalCtrl.create(ChallengeModal, {userId: 8675309});
    routesModal.present();
  }
}


