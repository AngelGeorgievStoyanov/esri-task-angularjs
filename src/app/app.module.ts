import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FindAddressComponent } from './components/find-address/find-address.component';
import { MapComponent } from './components/map/map.component';
import { ArcgisService } from './services/arcgisService';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FindAddressComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [ArcgisService],
  bootstrap: [AppComponent]
})
export class AppModule { }
