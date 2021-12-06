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
    { label: 'Dashboard', link: 'dashboard', subItem: [] },
    {
      label: 'Show', link: 'show', subItem: []
    },
    {
      label: 'Relatórios', link: '', subItem: [
        { label: 'Vendas efetuadas', link: 'report/1' },
        { label: 'Total de ingressos por artista', link: 'report/2' },
        { label: 'Qtd. total de shows por cidade', link: 'report/3' }
      ]
    },
    {
      label: 'Configurações', link: '', subItem: [
        { label: 'Shows', link: 'register/show' },
        { label: 'Usuários', link: 'register/user' }
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
