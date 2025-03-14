import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ContainercComponent } from './Components/containerc/containerc.component';
import { NavbarcComponent } from './Components/navbarc/navbarc.component';
import { MaincComponent } from './Components/mainc/mainc.component';
import { FootercComponent } from './Components/footerc/footerc.component';
import { FormcComponent } from './Components/formc/formc.component';
import { TextboxcComponent } from './Components/textboxc/textboxc.component';
import { ButtoncComponent } from './Components/buttonc/buttonc.component';
import { AlertcComponent } from './Components/alertc/alertc.component';
import { CheckboxcComponent } from './Components/checkboxc/checkboxc.component';
import { TablecComponent } from './Components/tablec/tablec.component';

import { ReactiveFormsModule } from '@angular/forms';

import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ContainercComponent,
    NavbarcComponent,
    MaincComponent,
    FootercComponent,
    FormcComponent,
    TextboxcComponent,
    ButtoncComponent,
    AlertcComponent,
    CheckboxcComponent,
    TablecComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent],
})
export class AppModule {}
