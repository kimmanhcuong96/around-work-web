import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { HttpPath } from 'src/app/_consts/http-path';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  items: MenuItem[];

  activeItem: MenuItem;
  router: Router;
  constructor(private route: Router) {
    this.router = route;
  }

  ngOnInit() {
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: HttpPath.ROUTE_ROOT },
      { label: 'Map', icon: 'pi pi-fw pi-map', routerLink: HttpPath.ROUTE_ROOT + HttpPath.ROUTE_MAP },
      // { label: 'Edit', icon: 'pi pi-fw pi-pencil' },
      // { label: 'Documentation', icon: 'pi pi-fw pi-file' },
      { label: 'Settings', icon: 'pi pi-fw pi-cog' }
    ];

    // this.activeItem = this.items[0];
    // console.log('xxxxxxxxxxxxxxxx', this.router.url);
    // this.router.
    this.router.events.subscribe((route) => {
      if (route instanceof NavigationEnd) {
        this.activeItem = this.items.find(el => el.routerLink === route.url);
      }
    });
  }

}
