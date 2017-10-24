import {Component} from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';
import {RouteViewPage} from '../../pages/route-view/route-view';
import {ProfileService} from '../../providers/profile/profile-service';
import {ViewUtilities} from '../../providers/view-utilities/view-utilities';
import {IRoute} from "./RouteModel";
import {IProfile} from "../../models/ProfileModel";

@Component({
  selector: 'page-routes',
  templateUrl: 'routes.html'
})
export class Routes {
  private routes: IRoute[] = [];
  private hasDataClass?: any = "no-data-bg";

  constructor(private navCtrl: NavController,
              private viewUtilities: ViewUtilities,
              private profileService: ProfileService) {}

  public ionViewWillEnter() {
    this.loadData();
  }

  private loadData(): void {
    this.profileService.getCurrentProfile().subscribe((profile: IProfile) => {
        if (profile.routes && profile.routes.length !== 0) this.hasDataClass = "";
        this.routes = profile.routes || [];
      },
      err => {
        this.viewUtilities.onError(err);
      }
    )
  }

  private navigateToRoute(routeId): void {
    this.navCtrl.push(RouteViewPage, {
      route: routeId
    });
  }

  private addRoute():  void {
    this.navCtrl.push(RouteViewPage, {
      route: undefined
    });
  }

  private beginRoute(): void {

  }

  private deleteRoute() : void {

  }

}
