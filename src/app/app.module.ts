import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyMapComponent } from './component/company-map/company-map.component';
import { HomeScreenComponent } from './screen/home-screen/home-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    CompanyMapComponent,
    HomeScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyD8S609SZ4Ras2gzbhd51ls1DzHzt_5miQ",
      libraries: ["places", "geometry"]
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
