import { BrowserModule,Title } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReportsComponent } from './components/reports/reports.component';

import { BrandsModule } from './modules/brands/brands.module';
import { CustomersModule } from './modules/customers/customers.module';
import { ProductsModule } from './modules/products/products.module';
import { PlansModule } from './modules/plans/plans.module';
import { DiscountsModule } from './modules/discounts/discounts.module';
import { PromoCodesModule } from './modules/promo-codes/promo-codes.module';
import { WidgetsModule } from './modules/widgets/widgets.module';
import { MessagingTemplatesModule } from './modules/messaging-templates/messaging-templates.module';

import {CommonService} from './services/common.service';
import {LoginService} from './services/login.service'
import { AuthGuard } from './common/auth.guard';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ChangepwdComponent } from './components/changepwd/changepwd.component';
import { ConfigurationsComponent } from './components/configurations/configurations.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TopNavComponent,
    SideNavComponent,
    DashboardComponent,
    ReportsComponent,
    ChangepwdComponent,
    ConfigurationsComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrandsModule,
    CustomersModule,
    ProductsModule,
    PlansModule,
    DiscountsModule,
    PromoCodesModule,
    WidgetsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
	AlertModule.forRoot()
  ],
  providers: [CommonService, LoginService, AuthGuard, Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
