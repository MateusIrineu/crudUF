import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  criado_em?: string;
  atualizado_em?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = 'http://localhost:3001/api/cliente'; 

  constructor(private http: HttpClient) {} 

  criarCliente(cliente: Omit<Cliente, 'id' | 'criado_em' | 'atualizado_em'>): Observable<Cliente> {
    const url = `${this.apiUrl}/criar`;
    return this.http.post<Cliente>(url, cliente);
  }

  listarClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  atualizarCliente(id: string, cliente: Partial<Cliente>): Observable<Cliente> {
    const url = `${this.apiUrl}/atualizar/${id}`;
    return this.http.patch<Cliente>(url, cliente);
  }

  excluirCliente(id: string): Observable<void> {
    const url = `${this.apiUrl}/deletar/${id}`;
    return this.http.delete<void>(url);
  }
};