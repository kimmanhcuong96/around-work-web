import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyMapComponent } from './component/company-map/company-map.component';
import { HomeScreenComponent } from './screen/home-screen/home-screen.component';

const routes: Routes = [
  { path: "", component: HomeScreenComponent },
  { path: "map", component: CompanyMapComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
