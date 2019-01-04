/**
 * Created by ApolloYr on 2/27/2018.
 */

import {Component, OnInit} from "@angular/core";
import {SettingsService} from "../../services/settings.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Validate} from "../../services/validate.service";
import {Router} from "@angular/router";
import {Api} from "../../services/api.service";
import {NotifyService} from "../../services/notify.service";
@Component({
    templateUrl: './change-password.component.html',
    selector: 'page-change-password',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordPage implements OnInit {

    form: FormGroup

    info = {
        current_password: '',
        new_password: '',
        confirm_password: ''
    }

    constructor(
        public setting: SettingsService,
        public formBuilder: FormBuilder,
        public validate: Validate,
        public router: Router,
        public api: Api,
        public notify: NotifyService
    ) {

    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            current_password: ['', Validators.required],
            // new_password: ['', Validators.required],
            // confirm_password: ['', Validators.required],
        });
    }

    cancel() {
        this.router.navigate(['/home']);
    }

    save() {
        if (this.info.current_password == this.setting.loginPassword) {
            this.setting.showLoading();

            this.api.fbResetPassword(this.setting.loginInfo.email).then(() => {

                this.setting.hideLoading()
                this.notify.showNotification('success', 'Foi enviado um e-mail para ' + this.setting.loginInfo.email + ' com o link para a troca da senha');

                this.api.fbLogout();
                this.setting.init();
                this.router.navigate(['/login']);
            }).catch((error) => {
                console.log(error);
                this.setting.hideLoading();
                this.notify.showNotification('error', 'fail');
            });

        } else {
            this.notify.showNotification('error', 'Invalid Password');
        }
    }
}
