/**
 * Created by ApolloYr on 3/14/2018.
 */
import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {SettingsService} from "../../services/settings.service";
import {AngularFirestore} from "angularfire2/firestore";
import {Router} from "@angular/router";
import {Api} from "../../services/api.service";
import {NotifyService} from "../../services/notify.service";

@Component({
    templateUrl: './forgot-password.component.html',
    selector: 'page-forgot-password',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordDialog {

    public email = '';

    constructor(
        public dialogRef: MatDialogRef<ForgotPasswordDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public api: Api,
        public setting: SettingsService,
        public notify: NotifyService,
    )
    {

    }

    send() {
        if (this.email != '') {
            this.setting.showLoading();

            this.api.fbResetPassword(this.email).then(() => {

                this.setting.hideLoading()
                this.notify.showNotification('success', 'reset password email sent');
                this.dialogRef.close();

            }).catch((error) => {
                console.log(error);
                this.setting.hideLoading();
                this.notify.showNotification('error', error.message);
            });
        }
    }

    cancel() {
        this.dialogRef.close();
    }
}
