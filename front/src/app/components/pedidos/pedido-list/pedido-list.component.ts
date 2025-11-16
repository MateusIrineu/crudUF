import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PoPageModule, PoTableModule, PoButtonModule, PoModalModule, PoModalComponent } from '@po-ui/ng-components';
import { PedidoService, Pedido } from '../pedidos.service';

@Component({
  selector: 'app-pedido-list',
  standalone: true,
  imports: [CommonModule, RouterLink, PoPageModule, PoTableModule, PoButtonModule, PoModalModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './pedido-list.component.html'
})
export class PedidoListComponent implements OnInit {
  @ViewChild('modalDelecao') modalDelecao!: PoModalComponent;

  pedidos: Pedido[] = [];
  isLoading = false;
  pedidoSelecionado: Pedido | null = null;

  columns = [
    { property: 'id', label: 'ID', width: '15%' },
    { property: 'clienteId', label: 'Cliente ID', width: '20%' },
    { property: 'quantidade', label: 'Quantidade de produtos no pedido', width: '20%' },
    { property: 'criado_em', label: 'Data Criação', width: '25%' },
    { property: 'atualizado_em', label: 'Última Atualização', width: '20%' }
  ];

  primaryAction = {
    label: 'Deletar',
    action: () => this.confirmarDelecao()
  };

  secondaryAction = {
    label: 'Cancelar',
    action: () => this.cancelarDelecao()
  };

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.carregarPedidos();
  }

  carregarPedidos(): void {
    this.isLoading = true;
    this.pedidoService.listarPedidos().subscribe({
      next: (dados) => {
        this.pedidos = dados.map((pedido: any) => ({
          ...pedido,
          quantidade: pedido.DetalheProduto ? pedido.DetalheProduto.length : 0
        }));
        this.isLoading = false;
      },
      error: (erro) => {
        console.error('Erro ao carregar pedidos:', erro);
        this.isLoading = false;
      }
    });
  }

  abrirModalDelecao(pedido: Pedido): void {
    this.pedidoSelecionado = pedido;
    this.modalDelecao.open();
  }

  confirmarDelecao(): void {
    if (this.pedidoSelecionado?.id) {
      this.pedidoService.excluirPedido(this.pedidoSelecionado.id).subscribe({
        next: () => {
          this.carregarPedidos();
          this.pedidoSelecionado = null;
          this.modalDelecao.close();
        },
        error: (erro) => console.error('Erro ao deletar:', erro)
      });
    }
  }

  cancelarDelecao(): void {
    this.pedidoSelecionado = null;
    this.modalDelecao.close();
  }
}