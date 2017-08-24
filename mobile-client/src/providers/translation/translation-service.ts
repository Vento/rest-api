import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { SettingsStorage } from '../settings/settings-storage';
import { TranslateService } from 'ng2-translate';

/*
  Generated class for the TranslationService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TranslationService {

  constructor(public events: Events, public settingsStorage: SettingsStorage, public translate: TranslateService) {
      translate.setDefaultLang('en_US');
  }

  public loadLanguagePreferences() {
    this.settingsStorage.getLanguage().then(language => {
      if(language) this.translate.use(language);
    });
  }

}
