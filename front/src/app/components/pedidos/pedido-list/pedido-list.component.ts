import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PoPageModule, PoTableModule, PoButtonModule, PoModalModule } from '@po-ui/ng-components';
import { PedidoService, Pedido } from '../pedidos.service';

@Component({
  selector: 'app-pedido-list',
  standalone: true,
  imports: [CommonModule, RouterLink, PoPageModule, PoTableModule, PoButtonModule, PoModalModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './pedido-list.component.html'
})
export class PedidoListComponent implements OnInit {
  pedidos: Pedido[] = [];
  isLoading = false;
  pedidoSelecionado: Pedido | null = null;

  columns = [
    { property: 'id', label: 'ID', width: '15%' },
    { property: 'clienteId', label: 'Cliente ID', width: '20%' },
    { property: 'criado_em', label: 'Data Criação', width: '25%' },
    { property: 'atualizado_em', label: 'Última Atualização', width: '25%' }
  ];

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.carregarPedidos();
  }

  carregarPedidos(): void {
    this.isLoading = true;
    this.pedidoService.listarPedidos().subscribe({
      next: (dados) => {
        this.pedidos = dados;
        this.isLoading = false;
      },
      error: (erro) => {
        console.error('Erro ao carregar pedidos:', erro);
        this.isLoading = false;
      }
    });
  }

  editarPedido(pedido: Pedido): void {
    console.log('Editar:', pedido);
  }

  abrirModalDelecao(pedido: Pedido): void {
    this.pedidoSelecionado = pedido;
  }

  confirmarDelecao(): void {
    if (this.pedidoSelecionado?.id) {
      this.pedidoService.excluirPedido(this.pedidoSelecionado.id).subscribe({
        next: () => {
          this.carregarPedidos();
          this.pedidoSelecionado = null;
        },
        error: (erro) => console.error('Erro ao deletar:', erro)
      });
    }
  }

  cancelarDelecao(): void {
    this.pedidoSelecionado = null;
  }
}
