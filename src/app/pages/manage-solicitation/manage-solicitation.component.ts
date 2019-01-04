/**
 * Created by ApolloYr on 2/27/2018.
 */

import {Component, OnInit} from "@angular/core";
import {SettingsService} from "../../services/settings.service";
import {AngularFirestore} from "angularfire2/firestore";
import {MatDialog} from "@angular/material";
import {SolicitationModal} from "../solicitation-modal/solicitation-modal.component";
@Component({
    templateUrl: './manage-solicitation.component.html',
    selector: 'page-manage-solicitation',
    styleUrls: ['./manage-solicitation.component.scss']
})
export class ManageSolicitationPage implements OnInit {

    public solicitations = [];

    constructor(
        public setting: SettingsService,
        public afs: AngularFirestore,
        public dialog: MatDialog
    ) {

    }

    ngOnInit() {
        this.getSolicitations();
    }

    getSolicitations() {
        let solicitationCollRef = this.afs.collection('simulations');
        solicitationCollRef.valueChanges().subscribe(res => {
            console.log(res);
            this.solicitations = res;
        });
    }

    download_csv() {
        let csv = 'User Id,Created,Product Name,Loan Amount,Total amount,Payment Date,Release Date,Status\n';

        for (let i = 0; i < this.solicitations.length; i++) {
            let item = this.solicitations[i];
            let row = [];
            row.push(item.userId);
            row.push(item.created);
            row.push(item.productName);
            row.push(item.loanAmount);
            row.push(item.totalAmount);
            row.push(item.paymentDate);
            row.push(item.releaseDate);
            row.push(item.status);

            csv += row.join(',');
            csv += "\n";
        }

        console.log(csv);

        let hiddenElement = document.getElementById('link');
        hiddenElement.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURI(csv));
        hiddenElement.click();

        //alert('');
    }

    showDetail(i) {
        let dialogRef = this.dialog.open(SolicitationModal, {
            width: '500px',
            panelClass: 'solicitation_modal',
            data: {
                userid: this.solicitations[i].userId
            }
        });
    }
}
