/**
 * Created by ApolloYr on 2/27/2018.
 */

import {Component, OnInit} from "@angular/core";
import {SettingsService} from "../../services/settings.service";
import {NotifyService} from "../../services/notify.service";
import {AngularFirestore} from "angularfire2/firestore";
@Component({
    templateUrl: './check-new-user.component.html',
    selector: 'page-check-new-user',
    styleUrls: ['./check-new-user.component.scss']
})
export class CheckNewUserPage implements OnInit {

    dtOptions: any = {};

    public usersCollRef: any;
    public users = [];
    public allUsers = [];

    public loaded = false;

    public startDate: any;
    public endDate: any;


    constructor(
        public setting: SettingsService,
        public afs: AngularFirestore,
        public notify: NotifyService
    ) {

    }

    ngOnInit() {
        this.usersCollRef = this.afs.collection('users');
        this.usersCollRef.valueChanges().subscribe(res => {
            console.log(res);
            this.allUsers = res;
            this.doFilter();
            this.users = res;

        });
    }

    doFilter() {
        console.log('changed');
        this.loaded = false;
        this.users = [];

        let _startDate = new Date(this.startDate);

        let _endDate = new Date(this.endDate);
        _endDate.setDate(_endDate.getDate() + 1);

        for (let i=0; i<this.allUsers.length; i++) {
            let tmp = true;
            let item = this.allUsers[i];

            if (_startDate && _startDate.getTime() > item.date.getTime()) tmp = false;
            if (_endDate && _endDate.getTime() < item.date.getTime()) tmp = false;

            if (tmp) this.users.push(item);
        }

        this.loaded = true;
    }
}
