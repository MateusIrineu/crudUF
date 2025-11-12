import { Component } from '@angular/core';
import { PoTableModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-root, sample-po-table-basic',
  // quando o usuário navega, por exemplo, para a URL de clientes, o Angular verifica as rotas
  // e pega o componente correspondente para a rota
  // o angular então injetará e redenrizará o componente correspondente dentro do espaço ocupado pelo <router-outlet>
  standalone: true,
  imports: [
    PoTableModule
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'front';
};
