import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
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
        { label: '1', link: '' }
      ]
    },
    {
      label: 'Configurações', link: '', subItem: [
        { label: 'Shows', link: '' },
        { label: 'Usuários', link: 'register/user' }
      ]
    }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public goTo(link: string) {
    this.router.navigate([link]);
  }

}
