/**
 * Created by ApolloYr on 2/25/2018.
 */

import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {SettingsService} from "../services/settings.service";
import {TranslateService} from "@ngx-translate/core";
import {Api} from "../services/api.service";
import {AngularFireAuth} from "angularfire2/auth";
@Component({
    templateUrl: './home.component.html',
    selector: 'page-home',
    styleUrls: ['./home.component.scss']
})
export class HomePage implements OnInit {

    constructor(
        public router: Router,
        public setting: SettingsService,        
        public translate: TranslateService,
        public api: Api,
        public fAuth: AngularFireAuth
        
    ) {

    }

    ngOnInit() {
        console.log(this.fAuth.auth.currentUser);
    }

    setLanguage(lang) {
        this.api.fbLogout();

        this.translate.use(lang);
        this.translate.setDefaultLang(lang);
        this.setting.setStorage('lang', lang);
    }

    logout() {

        this.setting.init();

        this.router.navigate(['/login']);
    }

    selectPage(item) {

        this.setting.selectedPage = item;

        switch (item) {
            case 'manage_products':
                this.router.navigate(['/manage-product']);
                break;
            case 'send_notifications':
                this.router.navigate(['/send-notification']);
                break;
            case 'manage_solicitations':
                this.router.navigate(['/manage-solicitation']);
                break;
            case 'grains_prices':
                this.router.navigate(['/grains-price']);
                break;
            case 'check_new_users':
                this.router.navigate(['/check-new-user']);
                break;
            case 'register_new_admin_users':
                this.router.navigate(['/register-admin']);
                break;
            case 'change_password':
                this.router.navigate(['/change-password']);
                break;
        }
    }
}
