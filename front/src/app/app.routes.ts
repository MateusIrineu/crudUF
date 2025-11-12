import { Routes, provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { ClientListComponent } from './components/clients/client-list/client-list.component';

export const routes: Routes = [
    // os caminhos com path abaixo são puramente para oc caminhos utilizados nas rotas URL
    // não tendo quaisquer ligação com as rotas providas nas requisições HTTP
    // existe apenas dentro do navegador do usuário
    // as rotas apenas alteram a tela do que o usuário vê, como a tag <a></a> do html
    {
        // path vazio
        path: '',
        // irá sempre redirecionar para /clientes
        redirectTo: 'clientes',
        // se não definir o valor do pathMatch, ele assume 'prefix' como default
        // não posso usar 'prefix' caso o path esteja path: '' (vazio), pois irá corresponder com tudo
        // para esses casos, sempre usar 'full'
        // o full obriga o roteador a só ativar essa regra de ' '(vazio) se a URL for exatamente vazia
        pathMatch: 'full'
    },

    {
        path: 'clientes',
        component: ClientListComponent
    },

    {
        // path: 'clientes/criar',
        // loadComponent: () => 
        //     import ('./components/clients/client-form/client-form.component').then(c => c.ClientFormComponent)
    },

    {
        path: 'clientes/atualizar/:id',
        component: ClientListComponent
    },

    {
        // rota "coringa" (wildcard)
        // checa todas as rotas correspondentes dentro do meu site, se nenhuma corresponder, cai aqui
        // e redireciona para /clientes de novo
        path: '**',
        redirectTo: 'clientes'
    },
];
