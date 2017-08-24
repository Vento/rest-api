import {Component, ElementRef, ViewChild} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {Routes} from '../../pages/routes/routes';
import {ProfileService} from '../../providers/profile/profile-service';
import {ViewUtilities} from '../../providers/view-utilities/view-utilities';
import {GoogleMapsProvider} from "../../providers/google-maps/google-maps";
import {IPoint, IRoute} from "../routes/RouteModel";

@Component({
  selector: 'page-route-view',
  templateUrl: 'route-view.html'
})
export class RouteViewPage {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef
  private selectedRoute?: IRoute;
  private route: IRoute;
  private submitted = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewUtilities: ViewUtilities,
              private profileService: ProfileService,
              public platform: Platform,
              public maps: GoogleMapsProvider) {
    this.selectedRoute = navParams.get('route');
    if (this.selectedRoute === undefined) {
      this.route = <IRoute> {}
      this.route.points = [];
    }
  }

  public ionViewDidLoad(): void {
    this.platform.ready().then(() => {
      let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);
    });

  }

  public saveRoute(form) {
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

  private onError(err) {
    this.viewUtilities.dismissLoading();
    this.viewUtilities.presentToast(<any>err);
  }

}
