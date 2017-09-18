import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';

@Component({
  selector: 'modal-challenge',
  templateUrl: 'challengeModal.html'
})
export class ChallengeModal {

  private user: string;

  constructor(params: NavParams) {
    this.user = params.get('userId');
  }
}
