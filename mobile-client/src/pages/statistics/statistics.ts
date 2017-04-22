import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { StatisticsModel } from '../../models/statistics-model';
import { ViewUtilities } from '../../providers/view-utilities/view-utilities';

@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html'
})
export class Statistics {
  statisticsModel?: StatisticsModel;
  hasDataClass?: any = "no-data-bg";

  constructor(public navCtrl: NavController,
              public viewUtilities: ViewUtilities) {
    this.statisticsModel = new StatisticsModel([]);
  }

  ionViewWillEnter() {
    this.loadData();
  }

  private loadData() {

  }  
}
