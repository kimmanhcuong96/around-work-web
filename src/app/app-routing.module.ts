import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyMapComponent } from './component/company-map/company-map.component';
import { HomeScreenComponent } from './screen/home-screen/home-screen.component';
import { HttpPath } from './_consts/http-path';

const routes: Routes = [
  { path: HttpPath.ROUTE_HOME, component: HomeScreenComponent },
  { path: HttpPath.ROUTE_MAP, component: CompanyMapComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
