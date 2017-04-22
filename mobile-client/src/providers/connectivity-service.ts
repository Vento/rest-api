import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Network } from 'ionic-native';
import { Platform, Events } from 'ionic-angular';

declare var Connection;

/*
  Generated class for the ConnectivityService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ConnectivityService {

  private onDevice: boolean;
  private connectWatch: any; 
  private disconnectWatch: any;

  constructor(private platform: Platform, private events: Events){
    this.onDevice = this.platform.is('cordova');
  }

  isOnline(): boolean {
    if(this.onDevice && Network.type){
      return Network.type !== Connection.NONE;
    } else {
      return navigator.onLine; 
    }
  }

  isOffline(): boolean {
    if(this.onDevice && Network.type){
      return Network.type === Connection.NONE;
    } else {
      return !navigator.onLine;   
    }
  }

  addConnectivityListeners(){
    this.connectWatch = Network.onConnect().subscribe(con => {
      this.events.publish('connectivity:connected');
    });    
    this.disconnectWatch = Network.onDisconnect().subscribe(con => {
      this.events.publish('connectivity:disconnected');
    });  
  }

  removeConnectivityListeners() {
    this.connectWatch.unsubscribe();
    this.disconnectWatch.unsubscribe();     
  }
}
