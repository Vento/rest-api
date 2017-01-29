export class SettingsModel{

    languages: any[];
    selectedLanguage: any;
    useNativeMaps: boolean = false;
    
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