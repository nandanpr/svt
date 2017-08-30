import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import {  HttpModule } from '@angular/http';


import { AppComponent }  from './app.component';
import { Scanner } from './scanner.component';


@NgModule({
    imports:      [
        BrowserModule,
        FormsModule,
        HttpModule,
    ],
    bootstrap:    [ AppComponent ],
    declarations: [
        AppComponent,
        Scanner,
        
    ],
})
export class AppModule { }
