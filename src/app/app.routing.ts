import {Routes} from '@angular/router';
import {HomePage} from "./home/home.component";
import {LoginPage} from "./login/login.component";
import {LayoutComponent} from "./layout/layout.component";
import {RegisterProductPage} from "./pages/register-products/register-product.component";
import {AuthGuard} from "./services/authguard.service";
import {SendNotificationPage} from "./pages/send-notification/send-notification.component";
import {ManageSolicitationPage} from "./pages/manage-solicitation/manage-solicitation.component";
import {BeansPricePage} from "./pages/beans-price/beans-price.component";
import {CheckNewUserPage} from "./pages/check-new-users/check-new-user.component";
import {RegisterAdminPage} from "./pages/register-admin/register-admin.component";
import {ChangePasswordPage} from "./pages/change-password/change-password.component";
import {ManageProductsPage} from "./pages/manage-products/manage-products.component";

export const AppRoutes: Routes = [
    {
        path: '',
        component: LoginPage
    },
    {
        path: 'login',
        component: LoginPage
    },
    {
        path: 'home',
        component: HomePage,
        resolve: {
            user: AuthGuard
        }
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'register-product',
                pathMatch: 'full'
            },
            {
                path: 'product',
                component: RegisterProductPage
            },
            {
                path: 'manage-product',
                component: ManageProductsPage
            },
            {
                path: 'send-notification',
                component: SendNotificationPage
            },
            {
                path: 'manage-solicitation',
                component: ManageSolicitationPage
            },
            {
                path: 'grains-price',
                component: BeansPricePage
            },
            {
                path: 'check-new-user',
                component: CheckNewUserPage
            },
            {
                path: 'register-admin',
                component: RegisterAdminPage
            },
            {
                path: 'change-password',
                component: ChangePasswordPage
            }
        ],
        resolve: {
            user: AuthGuard
        }
    },
    {path: '**', redirectTo: 'home'}
];
