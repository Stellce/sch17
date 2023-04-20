import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { NauczComponent } from './naucz/naucz.component';
import { UczenComponent } from './uczen/uczen.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatExpansionModule} from "@angular/material/expansion";


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    NauczComponent,
    UczenComponent,
    LoginComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        MatProgressSpinnerModule,
        HttpClientModule,
        MatExpansionModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
