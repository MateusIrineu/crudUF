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
  templateUrl: './pedido-form.component.html'
})
export class PedidoFormComponent implements OnInit {
  form!: FormGroup;
  isLoading = false;
  isEditando = false;
  pedidoId: string | null = null;
  pageTitle = 'Novo Pedido';

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
      }
    });
  }

  inicializarForm(): void {
    this.form = this.formBuilder.group({
      clienteId: ['', Validators.required],
      itens: this.formBuilder.array([
        this.criarItemPedido()
      ])
    });
  }

  criarItemPedido(): FormGroup {
    return this.formBuilder.group({
      produtoId: ['', Validators.required],
      quantidade: [1, [Validators.required, Validators.min(1)]]
    });
  }

  get itens(): FormArray {
    return this.form.get('itens') as FormArray;
  }

  adicionarItem(): void {
    this.itens.push(this.criarItemPedido());
  }

  removerItem(index: number): void {
    if (this.itens.length > 1) {
      this.itens.removeAt(index);
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
    const { clienteId, itens } = this.form.value;

    if (this.isEditando && this.pedidoId) {
      // Para edição, enviar apenas o clienteId e itens como Partial<Pedido>
      this.pedidoService.atualizarPedido(this.pedidoId, {
        clienteId,
        itens: itens as any // ItemPedido[] para edição
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
      // Para criação, usar a interface PedidoParaCriacao
      this.pedidoService.criarPedido({
        clienteId,
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
