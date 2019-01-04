/**
 * Created by ApolloYr on 3/13/2018.
 */

import {Component, OnInit} from "@angular/core";
import {SettingsService} from "../../services/settings.service";
import {AngularFirestore} from "angularfire2/firestore";
import {Router} from "@angular/router";

@Component({
    templateUrl: './manage-products.component.html',
    selector: 'page-manage-products',
    styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsPage implements OnInit {

    public products = [];
    public productsCollRef: any;

    constructor(
        public setting: SettingsService,
        public afs: AngularFirestore,
        public router: Router,
    ) {

    }

    ngOnInit() {
        this.getProducts().subscribe(res => {
            this.products = res;
        });
    }

    getProducts() {

        this.productsCollRef = this.afs.collection('products');

        return this.productsCollRef.snapshotChanges().map(actions => {
            return actions.map(action => {
                const data = action.payload.doc.data();
                const id = action.payload.doc.id;
                return {id: id, data: data};
            });
        });
    }

    addProduct() {
        this.setting.isAddNewProduct = true;
        this.router.navigate(['/product']);
    }

    editProduct(index) {
        this.setting.isAddNewProduct = false;
        this.setting.selectedProductId = this.products[index].id;
        this.setting.selectedProduct = this.products[index].data;
        this.router.navigate(['/product']);
    }
}