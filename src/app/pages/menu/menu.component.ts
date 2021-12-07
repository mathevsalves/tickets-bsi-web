import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Menu } from 'src/app/interfaces/menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menu: Menu[] = [
    { label: 'DASHBOARD', link: 'dashboard', subItem: [] },
    {
      label: 'SHOW', link: 'show', subItem: []
    },
    {
      label: 'RELATÓRIOS', link: '', subItem: [
        { label: 'VENDAS EFETUADAS', link: 'report/1' },
        { label: 'TOTAL DE INGRESSOS (POR ARTISTAS)', link: 'report/2' },
        { label: 'QTD. TOTAL DE SHOWS (POR CIDADE)', link: 'report/3' }
      ]
    },
    {
      label: 'CONFIGURAÇÕES', link: '', subItem: [
        { label: 'SHOWS', link: 'register/show' },
        { label: 'USUÁRIOS', link: 'register/user' }
      ]
    }
  ];

  constructor(private router: Router,
    private appComponent: AppComponent
    ) { }

  ngOnInit(): void {
  }

  public goTo(link: string) {
    this.router.navigate([link]);
  }

  public logout() {
    localStorage.clear();
    this.router.navigate(['']);
    this.appComponent.showMenu = false;
  }

}
