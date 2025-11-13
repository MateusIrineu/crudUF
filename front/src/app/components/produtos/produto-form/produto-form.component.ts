import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PoPageModule, PoFieldModule, PoButtonModule, PoModule } from '@po-ui/ng-components';
import { ProdutoService, Produto } from '../products.service';

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PoPageModule, PoFieldModule, PoButtonModule, PoModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './produto-form.component.html'
})
export class ProdutoFormComponent implements OnInit {
  form!: FormGroup;
  isLoading = false;
  isEditando = false;
  produtoId: string | null = null;
  pageTitle = 'Novo Produto';

  constructor(
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.inicializarForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditando = true;
        this.produtoId = params['id'];
        this.pageTitle = 'Editar Produto';
      }
    });
  }

  inicializarForm(): void {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      descricao: ['', Validators.required],
      preco: ['', Validators.required],
      estoque: [0, [Validators.required, Validators.min(0)]]
    });
  }

  salvar(): void {
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;

    if (this.isEditando && this.produtoId) {
      this.produtoService.atualizarProduto(this.produtoId, this.form.value).subscribe({
        next: () => {
          this.router.navigate(['/produtos']);
          this.isLoading = false;
        },
        error: (erro) => {
          console.error('Erro ao atualizar:', erro);
          this.isLoading = false;
        }
      });
    } else {
      this.produtoService.criarProduto(this.form.value).subscribe({
        next: () => {
          this.router.navigate(['/produtos']);
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
    this.router.navigate(['/produtos']);
  }
}
