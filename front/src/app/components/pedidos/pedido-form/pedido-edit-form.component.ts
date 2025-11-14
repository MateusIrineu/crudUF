import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PoPageModule, PoFieldModule, PoButtonModule, PoModule } from '@po-ui/ng-components';
import { PedidoService, Pedido, ItemPedidoPayload } from '../pedidos.service';

@Component({
  selector: 'app-pedido-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PoPageModule, PoFieldModule, PoButtonModule, PoModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './pedido-edit-form.component.html'
})
export class PedidoEditFormComponent implements OnInit {
  form!: FormGroup;
  isLoading = false;
  isEditando = false;
  pedidoId: string | null = null;
  pedidoOriginal: Pedido | null = null;
  pageTitle = 'Editando Pedido';

  constructor(
    private formBuilder: FormBuilder,
    private pedidoService: PedidoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.inicializarForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditando = true;
        this.pedidoId = params['id'];
        this.pageTitle = 'Editar Pedido';
        this.carregarPedido(params['id']);
      }
    });
  }

  inicializarForm(): void {
    this.form = this.formBuilder.group({
      itens: this.formBuilder.array([
        this.criarItemPedido()
      ])
    });
  }

  criarItemPedido(produtoId: string = '', quantidade: number = 1): FormGroup {
    return this.formBuilder.group({
      produtoId: [produtoId, Validators.required],
      quantidade: [quantidade, [Validators.required, Validators.min(1)]]
    });
  }

  get itens(): FormArray {
    return this.form.get('itens') as FormArray;
  }

  carregarPedido(id: string): void {
    this.isLoading = true;
    this.pedidoService.listarPedidos().subscribe({
      next: (pedidos) => {
        // Encontra o pedido específico
        const pedido = pedidos.find(p => p.id === id);
        if (pedido && pedido.itens && pedido.itens.length > 0) {
          this.pedidoOriginal = pedido;
          this.preencherFormulario(pedido);
        } else {
          console.warn('Pedido não encontrado ou sem itens');
          this.router.navigate(['/pedidos']);
        }
        this.isLoading = false;
      },
      error: (erro) => {
        console.error('Erro ao carregar pedido:', erro);
        this.isLoading = false;
      }
    });
  }

  preencherFormulario(pedido: Pedido): void {
    // Limpar o FormArray
    while (this.itens.length > 0) {
      this.itens.removeAt(0);
    }

    // Preencher com os itens do pedido
    if (pedido.itens && Array.isArray(pedido.itens)) {
      pedido.itens.forEach(item => {
        this.itens.push(
          this.criarItemPedido(item.produtoId, item.quantidade)
        );
      });
    }
  }

  getControl(item: any, controlName: string): any {
    return item.get(controlName);
  }

  salvar(): void {
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;
    const { itens } = this.form.value;

    if (this.isEditando && this.pedidoId && this.pedidoOriginal) {
      // Para edição, enviar apenas os itens com as quantidades atualizadas
      this.pedidoService.atualizarPedido(this.pedidoId, {
        clienteId: this.pedidoOriginal.clienteId,
        itens: itens as any
      }).subscribe({
        next: () => {
          this.router.navigate(['/pedidos']);
          this.isLoading = false;
        },
        error: (erro) => {
          console.error('Erro ao atualizar:', erro);
          this.isLoading = false;
        }
      });
    } else {
      // Para criação
      this.pedidoService.criarPedido({
        clienteId: '',
        itens: itens as ItemPedidoPayload[]
      }).subscribe({
        next: () => {
          this.router.navigate(['/pedidos']);
          this.isLoading = false;
        },
        error: (erro) => {
          console.error('Erro ao criar:', erro);
          this.isLoading = false;
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/pedidos']);
  }
}