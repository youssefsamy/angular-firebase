/**
 * Created by ApolloYr on 2/3/2018.
 */

import {Component} from "@angular/core";
import {SettingsService} from "../services/settings.service";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {Api} from "../services/api.service";
@Component({
    selector: 'page-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

    constructor(
        public setting: SettingsService,
        public translate: TranslateService,
        public router: Router,
        public api: Api
    ) {

    }

    setLanguage(lang) {
        this.translate.use(lang);
        this.translate.setDefaultLang(lang);
        this.setting.setStorage('lang', lang);
    }

    logout() {

        this.api.fbLogout();

        this.setting.init();

        this.router.navigate(['/login']);
    }
}
