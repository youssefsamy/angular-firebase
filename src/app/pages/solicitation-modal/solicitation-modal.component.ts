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
    templateUrl: './solicitation-modal.component.html',
    selector: 'page-solicitation-modal',
    styleUrls: ['./solicitation-modal.component.scss']
})
export class SolicitationModal {

    public userId = '';
    public info: any = {
        ownedAreaS: 0,
        leasedAreaS: 0,
        ownedAreaC: 0,
        leasedAreaC: 0,
        ownedAreaW: 0,
        leasedAreaW: 0,
        ownedAreaR: 0,
        leasedAreaR: 0
    };

    constructor(public dialogRef: MatDialogRef<SolicitationModal>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                public api: Api,
                public setting: SettingsService,
                public notify: NotifyService,
                public afStore: AngularFirestore
    )
    {
        this.userId = data.userid;
        this.loadData();
    }

    loadData() {
        let userCollRef = this.afStore.collection('users', ref =>  ref.where('id', '==', this.userId));
        userCollRef.valueChanges().subscribe(res => {
            this.info = res[0];
            console.log(this.info);
        })
    }
}