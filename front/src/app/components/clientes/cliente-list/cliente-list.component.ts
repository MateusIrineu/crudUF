import { Component, OnInit, ViewChild, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PoPageModule, PoTableModule, PoButtonModule, PoModalModule, PoModalComponent } from '@po-ui/ng-components';
import { ClienteService, Cliente } from '../cliente.service';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule, RouterLink, PoPageModule, PoTableModule, PoButtonModule, PoModalModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './cliente-list.component.html'
})
export class ClienteListComponent implements OnInit {
  @ViewChild('modalDelecao') modalDelecao!: PoModalComponent

  clientes: Cliente[] = [];
  isLoading = false;
  clienteSelecionado: Cliente | null = null;

  columns = [
    { property: 'id', label: 'ID', width: '10%' },
    { property: 'nome', label: 'Nome', width: '30%' },
    { property: 'email', label: 'Email', width: '25%' },
    { property: 'telefone', label: 'Telefone', width: '15%' },
    { property: 'endereco', label: 'Endereço', width: '20%' }
  ];

  primaryAction = {
    label: 'Deletar',
    action: () => this.confirmarDelecao()
  };

  secondaryAction = {
    label: 'Cancelar',
    action: () => this.cancelarDelecao()
  };

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes(): void {
    this.isLoading = true;
    this.clienteService.listarClientes().subscribe({
      next: (dados) => {
        this.clientes = dados;
        this.isLoading = false;
      },
      error: (erro) => {
        console.error('Erro ao carregar clientes:', erro);
        this.isLoading = false;
      }
    });
  }

  editarCliente(cliente: Cliente): void {
    console.log('Editar:', cliente);
  }

  abrirModalDelecao(cliente: Cliente): void {
    this.clienteSelecionado = cliente;
    this.modalDelecao.open();
  }

  confirmarDelecao(): void {
    if (this.clienteSelecionado?.id) {
      this.clienteService.excluirCliente(this.clienteSelecionado.id).subscribe({
        next: () => {
          this.carregarClientes();
          this.clienteSelecionado = null;
          this.modalDelecao.close()
        },
        error: (erro) => console.error('Erro ao deletar:', erro)
      });
    }
  }

  cancelarDelecao(): void {
    this.clienteSelecionado = null;
    this.modalDelecao.close();
  }
}