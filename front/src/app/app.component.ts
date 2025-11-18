import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'
import { RouterLink, RouterOutlet } from '@angular/router';
import { PoMenuModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ 
    CommonModule,
    RouterLink,
    RouterOutlet,
    PoMenuModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'front';
};

// OK po-combo dropdown
// OK precificação unitário / total
// OK nome do cliente e ocultar o id na tabela e valor total do pedido
