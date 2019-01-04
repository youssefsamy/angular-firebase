/**
 * Created by ApolloYr on 2/25/2018.
 */

import {Component, OnInit} from "@angular/core";
import {SettingsService} from "../../services/settings.service";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Validate} from "../../services/validate.service";
import {Router} from "@angular/router";
import {AngularFirestore} from "angularfire2/firestore";
import {NotifyService} from "../../services/notify.service";
import { DateTimeAdapter } from 'ng-pick-datetime';

@Component({
    templateUrl: './register-product.component.html',
    selector: 'page-register-product',
    styleUrls: ['./register-product.component.scss']
})
export class RegisterProductPage implements OnInit {

    model: NgbDateStruct;
    date: {year: number, month: number};

    form: FormGroup;
    info: any;

    public proCollRef: any;               ///// product collection Reference


    constructor(
        public setting: SettingsService,
        public formBuilder: FormBuilder,
        public validate: Validate,
        public router: Router,
        public afs: AngularFirestore,
        public notify: NotifyService,
        public dateTimeAdapter: DateTimeAdapter<any>
    ) {
        dateTimeAdapter.setLocale('pt-BR');
    }

    ngOnInit() {
        this.init();
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            monthlyCharges: ['', Validators.required],
            iof: ['', Validators.required],
            iofAdditional: ['', Validators.required],
            tlcRegular: ['', Validators.required],
            tlcMinimum: ['', Validators.required],
            tlcMaximum: ['', Validators.required],
            loanMinimum: ['', Validators.required],
            loanMaximum: ['', Validators.required],
            daysToRelease: ['', Validators.required],
            monthsToPayment: ['', Validators.required],
            startingDate: ['', Validators.required],
            expirationDate: ['', Validators.required],
        });

        this.proCollRef = this.afs.collection('products');
    }

    init() {

        if (this.setting.isAddNewProduct) {
            this.info = {
                name: '',
                monthlyCharges: 3.5,
                iof: 0.0083,
                iofAdditional: 0.38,
                tlcRegular: 1.00,
                tlcMinimum: 500,
                tlcMaximum: 2000,
                loanMinimum: 50000,
                loanMaximum: 2500000,
                daysToRelease: 1,
                monthsToPayment: 36,
                startingDate: '',
                expirationDate: ''
            };

            this.info.startingDate = new Date();
            this.info.startingDate.setTime(new Date().getTime() + 60*60*1000);
            this.info.expirationDate = new Date();
            this.info.expirationDate.setDate(new Date().getDate() + 30);
            this.info.expirationDate.setHours(6, 0, 0, 0);
            console.log(this.info.expirationDate);
        } else {
            console.log(this.setting.selectedProduct);
            this.info = this.setting.selectedProduct;
        }

    }

    save() {

        console.log(this.info.startingDate);

        if (this.form.valid) {
            if (this.checkValid()) {
                if (this.setting.isAddNewProduct) {
                    this.addProduct();
                } else {
                    this.editProduct();
                }
            }
        } else {
            this.notify.showNotification('warn', 'all field required');
        }
    }

    checkValid() {
        if (this.setting.isAddNewProduct) {
            for (let i = 0 ; i < this.setting.products.length; i++) {
                if (this.info.name === this.setting.products[i].name) {
                    this.notify.showNotification('warn', 'Product with the name already created');
                    return false;
                }
            }
        }

        if (this.info.startingDate.getTime() >= this.info.expirationDate) {
            this.notify.showNotification('warn', 'Expiration date must be higher than the starting date');
            return false;
        }

        return true;
    }

    addProduct() {
        this.setting.showLoading();
        this.proCollRef.add(this.info).then(res => {
            this.setting.hideLoading();
            this.notify.showNotification('success', 'Successfully added');
            //    this.init();
            console.log(res);
        }).catch(err => {
            this.notify.showNotification('error', 'failed');
            console.log(err);
        });
    }

    editProduct() {
        this.setting.showLoading();

        let ref = this.afs.collection('products').doc(this.setting.selectedProductId);
        ref.update(this.info).then(res => {
            this.setting.hideLoading();
            this.notify.showNotification('success', 'Alteração realizada com sucesso.');
            //    this.init();
            console.log(res);
        }).catch(err => {
            this.notify.showNotification('error', 'failed');
            console.log(err);
        });
    }

    cancel() {
        this.router.navigate(['/manage-product']);
    }
}
