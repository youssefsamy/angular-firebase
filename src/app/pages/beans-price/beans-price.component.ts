/**
 * Created by ApolloYr on 2/27/2018.
 */

import {Component, OnInit} from "@angular/core";
import {SettingsService} from "../../services/settings.service";
import {NotifyService} from "../../services/notify.service";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Router} from "@angular/router";

declare var $: any;
@Component({
    templateUrl: './beans-price.component.html',
    selector: 'page-beans-price',
    styleUrls: ['./beans-price.component.scss']
})
export class BeansPricePage implements OnInit {

    public grainsCollRef: any;
    public grainsPrices = [];

    constructor(
        public setting: SettingsService,
        public router: Router,
        public afs: AngularFirestore,
        public notify: NotifyService
    ) {

    }

    ngOnInit() {
        this.getGrainsPrices().subscribe(res => {
            this.grainsPrices = res;
        });
    }

    getGrainsPrices() {

        this.grainsCollRef = this.afs.collection('grainsPrices');

        return this.grainsCollRef.snapshotChanges().map(actions => {
            return actions.map(action => {
                const data = action.payload.doc.data();
                const id = action.payload.doc.id;
                return {id: id, data: data};
            });
        });
    }

    valueChanged(event) {
        console.log(event);

    }

    edit(event) {
        let target = event.target;
        console.log(event);
        target = $(target);
        if (!target.hasClass('editable')) target = target.parent();

        let input = target.find('input').show();
        input.focus();
        target.find('span').hide();
    }

    keyUp(event) {
        if (event.keyCode == 13) {
            let target = event.target;
            target = $(target).parent().parent().find('.editable');

            target.find('input').hide();
            target.find('span').show();

            this.save();
        }
    }

    save() {
        for (let i = 0; i < this.grainsPrices.length; i++) {
            let item = this.grainsPrices[i];

            this.grainsCollRef.doc(item.id).update(item.data);

            this.getGrainsPrices().subscribe(res => {
                this.grainsPrices = res;
            });
        }
    }
}
