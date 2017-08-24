import {Component, ElementRef, ViewChild} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {ViewUtilities} from '../../providers/view-utilities/view-utilities';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {GoogleMapsProvider} from "../../providers/google-maps/google-maps";
import {Observable} from "rxjs/Observable";
import {MatchService} from "../../providers/match/match-service";
import {IUserPosition} from "./MatchesModel";
import {StompService, StompState} from "../../providers/stomp-js/stomp.service";
import {AgmCoreModule, LatLngLiteral, GoogleMapsAPIWrapper} from '@agm/core';
import {MarkerOptions} from "@agm/core/services/google-maps-types";

@Component({
  selector: 'page-matches',
  templateUrl: 'matches.html'
})
export class Matches {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
  private stompClient: any;
  private socket: any;
  private markers: any = [];
  public gMaps: GoogleMapsAPIWrapper;


  constructor(public navCtrl: NavController, private platform: Platform, private viewUtilities: ViewUtilities, public googleMapsProvider: GoogleMapsProvider,
              private matchService: MatchService, private _stompService: StompService) {
    this.initWebsocket();
  }

  paths: Array<LatLngLiteral> = []


  public ionViewDidLoad(): void {

    this.platform.ready().then(() => {
      this.googleMapsProvider.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);
    });

  }

  public ionViewWillLeave() {
    //this.wsDisconnect();
  }

  private initWebsocket(): void {
    this._stompService.state
      .map((state: number) => StompState[state])
      .subscribe((status: string) => {
        console.log(`Stomp connection status: ${status}`);
      });

    this.platform.ready().then(() => {
      this.wsConnect();
    });
  }

  private wsConnect() {
    let aroundMeSubscription = this._stompService.subscribe('/app/around/test');
    aroundMeSubscription.map((message: any) => {
      return message.body;
    }).subscribe((msg_body: string) => {
      console.log(JSON.parse(msg_body), msg_body);
      this.markers = [];
      JSON.parse(msg_body).forEach((location: any) => {
        let marker: any = {};
        marker.lat = location.position.x;
        marker.lng = location.position.y;
        marker.label = location.username;
        this.markers.push(marker);
        console.log(this.markers)
      })
    });

    let errorSubscription = this._stompService.subscribe('/queue/errors');
    errorSubscription.map((message: any) => {
      return message.body;
    }).subscribe((msg_body: string) => {
      console.log(`Error: ${msg_body}`);
    });
  }

/*  private sendLocation() {
    this.stompClient.send("/app/track", {}, JSON.stringify({
      'username': "test",
      'position': {"x": "1.222", "y": "2.33"}
    }));
  }*/

}
