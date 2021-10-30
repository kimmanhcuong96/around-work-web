import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyMapComponent } from './component/company-map/company-map.component';
import { HomeScreenComponent } from './screen/home-screen/home-screen.component';
import { InfoPanelComponent } from './component/company-map/info-panel/info-panel.component';
import { SharedPrimengModule } from './_shared/shared-primeng/shared-primeng.module';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './component/layout/header/header.component';
import { TabMenuModule } from 'primeng/tabmenu';

@NgModule({
  declarations: [
    AppComponent,
    CompanyMapComponent,
    HomeScreenComponent,
    InfoPanelComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TabMenuModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyD3qYuv5tRbY7ygYk9ays05P3GhFlCgIBI",
      libraries: ["places", "geometry"]
    }),
    SharedPrimengModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
