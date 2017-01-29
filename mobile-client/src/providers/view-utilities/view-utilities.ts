import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { TranslationService } from '../../providers/translation/translation-service';

/*
  Generated class for the ProfileStorage provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ViewUtilities {

  private loader: any;

  constructor(public toastCtrl: ToastController, public loadingCtrl: LoadingController, public translationService: TranslationService) {
      this.translationService.translate.get('PLEASE_WAIT',).subscribe((res: string) => {
          this.loader = this.loadingCtrl.create({ content: res });   
      });      
      
  }    
    presentLoading() {
        this.loader.present();
    }

    dismissLoading(){
        this.loader.dismissAll();
    }
    
    presentToast(message) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 3000
        });
        toast.present();
    }
    
    onError(err) {
        this.presentToast(<any>err);
    }     
}