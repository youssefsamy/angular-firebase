/**
 * Created by ApolloYr on 2/27/2018.
 */

import {Component, OnInit} from "@angular/core";
import {SettingsService} from "../../services/settings.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Validate} from "../../services/validate.service";
import {Router} from "@angular/router";
import {Api} from "../../services/api.service";
import * as firebase from 'firebase';
import {AngularFirestore} from "angularfire2/firestore";
import {NotifyService} from "../../services/notify.service";
@Component({
    templateUrl: './send-notification.component.html',
    selector: 'page-send-notification',
    styleUrls: ['./send-notification.component.scss']
})
export class SendNotificationPage implements OnInit {

    form: FormGroup

    users = [];
    selectedIndex = -1;
    selectedUser = 'all';

    info = {
        title: '',
        message: '',
    }

    public messaging;

    constructor(public setting: SettingsService,
                public formBuilder: FormBuilder,
                public validate: Validate,
                public router: Router,
                public api: Api,
                public afStore: AngularFirestore,
                public notfiy: NotifyService
    ) {

    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            title: ['', Validators.required],
            message: ['', Validators.required],
            selectedUser: '',
            selectedIndex: ''
        });
        this.getUsers();
    }

    getUsers() {
        let userColRef = this.afStore.collection('users');
        userColRef.valueChanges().subscribe(res => {
            this.users = res;
            console.log(res);
        });
    }


    send() {
        if (!this.form.valid) {
            this.notfiy.showNotification('warn', 'all fields are required');
            return;
        }
        console.log(this.selectedUser);
        switch (this.selectedUser) {
            case 'all':
                this.sendPushNotification('/topics/all');
                break;
            case 'android':
                this.sendPushNotification('/topics/android');
                break;
            case 'ios':
                this.sendPushNotification('/topics/ios');
                break;
            case 'single':
                if (this.selectedIndex == -1) {
                    this.notfiy.showNotification('warn', "please select client");
                    return;
                }
                this.sendPushNotification(this.users[this.selectedIndex].devId);
                break;
        }
    }

    sendPushNotification(to) {
        this.api.sendFBNotification('https://fcm.googleapis.com/fcm/send', {
            to: to,
            data: this.info
        }).subscribe(res => {
            this.notfiy.showNotification('success', "Notificação enviada com sucesso.");
        });
    }

    selectChanged() {
        console.log(this.selectedUser);
        if (this.selectedUser !== 'single') this.selectedIndex = -1;
    }

    cancel() {
        this.router.navigate(['/home']);
    }
}
