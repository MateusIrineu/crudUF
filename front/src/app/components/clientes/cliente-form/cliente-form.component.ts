import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PoPageModule, PoFieldModule, PoButtonModule, PoModule, } from '@po-ui/ng-components';
import { ClienteService, Cliente } from '../cliente.service';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PoPageModule, PoFieldModule, PoButtonModule, PoModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './cliente-form.component.html'
})
export class ClienteFormComponent implements OnInit {
  form!: FormGroup;
  isLoading = false;
  isEditando = false;
  clienteId: string | null = null;
  pageTitle = 'Novo Cliente';

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.inicializarForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditando = true;
        this.clienteId = params['id'];
        this.pageTitle = 'Editar Cliente';
      }
    });
  }

  inicializarForm(): void {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      endereco: ['', Validators.required]
    });
  }

  salvar(): void {
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;

    if (this.isEditando && this.clienteId) {
      this.clienteService.atualizarCliente(this.clienteId, this.form.value).subscribe({
        next: () => {
          this.router.navigate(['/clientes']);
          this.isLoading = false;
        },
        error: (erro) => {
          console.error('Erro ao atualizar:', erro);
          this.isLoading = false;
        }
      });
    } else {
      this.clienteService.criarCliente(this.form.value).subscribe({
        next: () => {
          this.router.navigate(['/clientes']);
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
    this.router.navigate(['/clientes']);
  }
}