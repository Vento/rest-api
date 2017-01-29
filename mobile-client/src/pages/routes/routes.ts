import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { RouteModel } from '../../models/route-model';
import { RouteViewPage } from '../../pages/route-view/route-view';
import { ProfileService } from '../../providers/profile/profile-service';
import { ViewUtilities } from '../../providers/view-utilities/view-utilities';

@Component({
  selector: 'page-routes',
  templateUrl: 'routes.html'
})
export class Routes {
  routeModel?: RouteModel;
  loader: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewUtilities: ViewUtilities,  
              private profileService: ProfileService) {
    this.routeModel = new RouteModel([]);
  }

  ionViewWillEnter() {
    this.loadDashboard();
  }
  
  private loadDashboard() {
    this.profileService.getCurrentProfile().subscribe((profileData) => {        
            this.routeModel.routes = profileData.routes;
          },
          err => {
            this.viewUtilities.onError(err);
          } 
      )  
  }
  navigateToRoute(routeId) {
    this.navCtrl.push(RouteViewPage, {
      route: routeId
    });
  }

  addRoute() {
    this.navCtrl.push(RouteViewPage, {
      route: "new"
    });
  }

}
