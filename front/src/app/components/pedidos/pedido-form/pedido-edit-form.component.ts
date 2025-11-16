import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PoPageModule, PoFieldModule, PoButtonModule, PoModule } from '@po-ui/ng-components';
import { PedidoService, Pedido } from '../pedidos.service';

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
  pedidoId: string | null = null;
  pedidoOriginal: Pedido | null = null;
  pageTitle = 'Editar Pedido';

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
        this.pedidoId = params['id'];
        this.carregarPedido(params['id']);
      }
    });
  }

  inicializarForm(): void {
    this.form = this.formBuilder.group({
      itens: this.formBuilder.array([])
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
    this.pedidoService.obterPedido(id).subscribe({
      next: (pedido) => {
        if (pedido) {
          this.pedidoOriginal = pedido;
          this.preencherFormulario(pedido);
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

    // Preencher com os produtos do pedido
    const pedidoAny = pedido as any;
    if (pedidoAny.DetalheProduto && Array.isArray(pedidoAny.DetalheProduto)) {
      pedidoAny.DetalheProduto.forEach((produto: any) => {
        this.itens.push(
          this.criarItemPedido(produto.id, produto.itemPedido?.quantidade || 1)
        );
      });
    }
  }

  getControl(item: any, controlName: string): any {
    return item.get(controlName);
  }

  salvar(): void {
    if (this.form.invalid || !this.pedidoId || !this.pedidoOriginal) {
      return;
    }

    this.isLoading = true;
    const { itens } = this.form.value;

    this.pedidoService.atualizarPedido(this.pedidoId, {
      clienteId: this.pedidoOriginal.clienteId,
      itens: itens
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
  }

  cancelar(): void {
    this.router.navigate(['/pedidos']);
  }
}