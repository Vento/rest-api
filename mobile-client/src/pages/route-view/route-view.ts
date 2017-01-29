import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Route } from './route';
import { Routes } from '../../pages/routes/routes';
import { ProfileService } from '../../providers/profile/profile-service';
import { ViewUtilities } from '../../providers/view-utilities/view-utilities';

@Component({
  selector: 'page-route-view',
  templateUrl: 'route-view.html'
})
export class RouteViewPage {
  selectedRoute?: any;
  route?: Route;
  submitted = false;
  updatedRoutes?: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewUtilities: ViewUtilities,
              private profileService: ProfileService) {
    this.selectedRoute = navParams.get('route');
    
    if (this.selectedRoute == "new") this.route = new Route("",[]);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RouteViewPage');
  }

  saveRoute(form) {
    console.log(form);
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

}
