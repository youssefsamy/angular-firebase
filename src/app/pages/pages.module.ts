/**
 * Created by ApolloYr on 2/25/2018.
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RegisterProductPage} from "./register-products/register-product.component";
import {BeansPricePage} from "./beans-price/beans-price.component";
import {SendNotificationPage} from "./send-notification/send-notification.component";
import {ManageSolicitationPage} from "./manage-solicitation/manage-solicitation.component";
import {CheckNewUserPage} from "./check-new-users/check-new-user.component";
import {RegisterAdminPage} from "./register-admin/register-admin.component";
import {ChangePasswordPage} from "./change-password/change-password.component";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../shared/material.module";
import { DataTablesModule } from 'angular-datatables';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ManageProductsPage} from "./manage-products/manage-products.component";
import {ForgotPasswordDialog} from "./forgot-password/forgot-password.component";
import {NgxMaskModule} from "ngx-mask";
import {SolicitationModal} from "./solicitation-modal/solicitation-modal.component";
import {CurrencyMaskModule} from "ng2-currency-mask";

import { OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        TranslateModule,
        ReactiveFormsModule,
        MaterialModule,
        DataTablesModule,
        NgbModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        BrowserAnimationsModule,
        NgxMaskModule,
        CurrencyMaskModule
    ],
    declarations: [
        RegisterProductPage,
        BeansPricePage,
        SendNotificationPage,
        ManageSolicitationPage,
        CheckNewUserPage,
        RegisterAdminPage,
        ChangePasswordPage,
        ManageProductsPage,
        ForgotPasswordDialog,
        SolicitationModal
    ],
    exports: [
        RegisterProductPage,
        BeansPricePage,
        SendNotificationPage,
        ManageSolicitationPage,
        CheckNewUserPage,
        RegisterAdminPage,
        ChangePasswordPage,
        ManageProductsPage,
        ForgotPasswordDialog,
        SolicitationModal
    ],
    entryComponents: [
        ForgotPasswordDialog,
        SolicitationModal
    ],
    providers: [

    ],
    bootstrap: []
})
export class PagesModule {}
