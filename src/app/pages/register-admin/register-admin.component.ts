/**
 * Created by ApolloYr on 2/27/2018.
 */

import {Component, OnInit} from "@angular/core";
import {SettingsService} from "../../services/settings.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Validate} from "../../services/validate.service";
import {Router} from "@angular/router";
import {AngularFireAuth} from "angularfire2/auth";
import {NotifyService} from "../../services/notify.service";
import {Api} from "../../services/api.service";
@Component({
    templateUrl: './register-admin.component.html',
    selector: 'page-register-admin',
    styleUrls: ['./register-admin.component.scss']
})
export class RegisterAdminPage implements OnInit {

    form: FormGroup

    info = {
        name: '',
        email: '',
        password: ''
    }

    constructor(public setting: SettingsService,
                public formBuilder: FormBuilder,
                public validate: Validate,
                public router: Router,
                private fAuth: AngularFireAuth,
                public notify: NotifyService,
                public api: Api) {

    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    cancel() {
        this.router.navigate(['/home']);
    }

    send() {
        if (this.form.valid && this.info.password.length >= 6) {
            this.setting.showLoading();
            this.api.fbCreateAccount(this.info).then(res => {
                this.setting.hideLoading()

                res.updateProfile({displayName: this.info.name});   ////  set display name

                this.notify.showNotification('success', 'New admin user created successfully');
                this.router.navigate(['/home']);
            }).catch(err => {
                this.setting.hideLoading()
                console.log(err);
                this.notify.showNotification('error', 'New admin user creation failed');
            });
        } else if (!this.form.valid) {
            this.notify.showNotification('warn', 'all field required');
        } else if (this.info.password.length < 6) {
            this.notify.showNotification('warn', 'Password should be at least 6 characters!');
        }
    }
}
