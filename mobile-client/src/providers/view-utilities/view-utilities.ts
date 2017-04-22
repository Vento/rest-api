import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { TranslationService } from '../../providers/translation/translation-service';
import {NativePageTransitions, NativeTransitionOptions} from 'ionic-native';

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
    ionViewDidLoad() {
        let options: NativeTransitionOptions = {
                "direction"        : "up", // 'left|right|up|down', default 'left' (which is like 'next')
                "duration"         :  500, // in milliseconds (ms), default 400
                "slowdownfactor"   :    3, // overlap views (higher number is more) or no overlap (1). -1 doesn't slide at all. Default 4
                "slidePixels"      :   20, // optional, works nice with slowdownfactor -1 to create a 'material design'-like effect. Default not set so it slides the entire page.
                "iosdelay"         :  100, // ms to wait for the iOS webview to update before animation kicks in, default 60
                "androiddelay"     :  150, // same as above but for Android, default 70
                "winphonedelay"    :  250, // same as above but for Windows Phone, default 200,
                "fixedPixelsTop"   :    0, // the number of pixels of your fixed header, default 0 (iOS and Android)
                "fixedPixelsBottom":   60  // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
            };

            NativePageTransitions.fade(options)
            .then((data) => {
                
            })
            .catch((err) => {
                
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