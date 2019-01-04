/**
 * Created by ApolloYr on 1/28/2018.
 */

import {Injectable} from '@angular/core';
import 'rxjs/add/operator/catch';
import {Router} from '@angular/router';
import {SettingsService} from "./settings.service";
import {AngularFireAuth} from "angularfire2/auth";
import {NotifyService} from "./notify.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
import {environment} from "../../environments/environment";

@Injectable()
export class Api {

    public fcmKey = environment.fcmServerKey;

    constructor(
        private router: Router,
        public settings: SettingsService,
        private fAuth: AngularFireAuth,
        public notify: NotifyService,
        private http: HttpClient,
    ) {

    }

    fbLogin(info) {

        return  this.fAuth.auth.signInWithEmailAndPassword(info.email, info.password);
    }

    fbCreateAccount(info) {
        return  this.fAuth.auth.createUserWithEmailAndPassword(info.email, info.password);
    }

    fbLogout() {
        this.fAuth.auth.signOut();
    }

    fbResetPassword(email) {
        return this.fAuth.auth.sendPasswordResetEmail(email);
    }

    sendFBNotification(url, data) {
        let headers = new HttpHeaders().set('Authorization', 'key=' + this.fcmKey);

        return this.http.post(url, data, {
            headers
        }).map(res => res).catch((error: any) => this.handleError(this, error));
    }


    handleError(_parent, error: any) {
        if ((error.status == 401 || error.status == 400) && error.url && !error.url.endsWith('/login')) {
            console.log('unauthorized');
        }
        // In a real world app, you might use a remote logging infrastructure

        return Observable.throw(error);
    }

}
