import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the MatchesList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-matches-list',
  templateUrl: 'matches-list.html'
})
export class MatchesListPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello MatchesListPage Page');
  }

}
