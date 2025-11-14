import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PoPageModule, PoTableModule, PoButtonModule, PoModalModule, PoModalComponent } from '@po-ui/ng-components';
import { ProdutoService, Produto } from '../products.service';

@Component({
  selector: 'app-produto-list',
  standalone: true,
  imports: [CommonModule, RouterLink, PoPageModule, PoTableModule, PoButtonModule, PoModalModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './produto-list.component.html'
})
export class ProdutoListComponent implements OnInit {
  @ViewChild('modalDelecao') modalDelecao!: PoModalComponent

  produtos: Produto[] = [];
  isLoading = false;
  produtoSelecionado: Produto | null = null;

  columns = [
    { property: 'id', label: 'ID', width: '10%' },
    { property: 'nome', label: 'Nome', width: '30%' },
    { property: 'descricao', label: 'Descrição', width: '30%' },
    { property: 'preco', label: 'Preço', width: '15%' },
    { property: 'estoque', label: 'Estoque', width: '15%' }
  ];

  primaryAction = {
    label: 'Deletar',
    action: () => this.confirmarDelecao()
  };

  secondaryAction = {
    label: 'Cancelar',
    action: () => this.cancelarDelecao()
  };

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.isLoading = true;
    this.produtoService.listarProdutos().subscribe({
      next: (dados) => {
        this.produtos = dados;
        this.isLoading = false;
      },
      error: (erro) => {
        console.error('Erro ao carregar produtos:', erro);
        this.isLoading = false;
      }
    });
  }

  editarProduto(produto: Produto): void {
    // Navega para edição via routerLink no template; manter para compatibilidade
    console.log('Editar:', produto);
  }

  abrirModalDelecao(produto: Produto): void {
    this.produtoSelecionado = produto;
    this.modalDelecao.open();
  }

  confirmarDelecao(): void {
    if (this.produtoSelecionado?.id) {
      this.produtoService.excluirProduto(this.produtoSelecionado.id).subscribe({
        next: () => {
          this.carregarProdutos();
          this.produtoSelecionado = null;
          this.modalDelecao.close();
        },
        error: (erro) => console.error('Erro ao deletar:', erro)
      });
    }
  }

  cancelarDelecao(): void {
    this.produtoSelecionado = null;
    this.modalDelecao.close();
  }
}
