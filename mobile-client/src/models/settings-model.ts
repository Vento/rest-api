export class SettingsModel{

    languages: any[];
    selectedLanguage: any;
    useNativeMaps: boolean = false;
    pushNotifications: boolean = true;
    
    constructor() {
        this.languages = [
            {
                key: 'English',
                value: 'en_US',
                checked: true
            },
            {
                key: 'Ελληνικά',
                value: 'el_GR',
                checked: false
            },
        ]
    }

}