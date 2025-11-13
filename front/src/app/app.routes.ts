import { Routes } from '@angular/router';

// Rotas principais da aplicação (ordem mantida):
// 1) clientes
// 2) produtos
// 3) pedidos
export const routes: Routes = [
  // Clientes (lista e formulário)
  {
    path: 'clientes',
    loadComponent: () => import('./components/clientes/cliente-list/cliente-list.component').then(m => m.ClienteListComponent)
  },
  {
    path: 'clientes/novo',
    loadComponent: () => import('./components/clientes/cliente-form/cliente-form.component').then(m => m.ClienteFormComponent)
  },
  {
    path: 'clientes/:id',
    loadComponent: () => import('./components/clientes/cliente-form/cliente-form.component').then(m => m.ClienteFormComponent)
  },

  // Produtos (lista e formulário)
  {
    path: 'produtos',
    loadComponent: () => import('./components/produtos/produto-list/produto-list.component').then(m => m.ProdutoListComponent)
  },
  {
    path: 'produtos/novo',
    loadComponent: () => import('./components/produtos/produto-form/produto-form.component').then(m => m.ProdutoFormComponent)
  },
  {
    path: 'produtos/:id',
    loadComponent: () => import('./components/produtos/produto-form/produto-form.component').then(m => m.ProdutoFormComponent)
  },

  // Pedidos (lista e formulário)
  {
    path: 'pedidos',
    loadComponent: () => import('./components/pedidos/pedido-list/pedido-list.component').then(m => m.PedidoListComponent)
  },
  {
    path: 'pedidos/novo',
    loadComponent: () => import('./components/pedidos/pedido-form/pedido-form.component').then(m => m.PedidoFormComponent)
  },
  {
    path: 'pedidos/:id',
    loadComponent: () => import('./components/pedidos/pedido-form/pedido-form.component').then(m => m.PedidoFormComponent)
  },

  // Rota padrão -> redireciona para clientes
  {
    path: '',
    redirectTo: '/clientes',
    pathMatch: 'full'
  },

  // Wildcard (404) - redireciona para clientes
  {
    path: '**',
    redirectTo: '/clientes'
  }
];