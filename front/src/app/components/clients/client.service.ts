// importação padrão:
// Injectable para serviços
// HttpClient para requisições, raíz lá da app.config.ts
// Observable para tornar assíncrono no Browser (Rede)
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface que representa o modelo de Cliente la no backend
export interface Cliente {
  id: string; // UUID -> lembrar de numa próxima usar Serial
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  // aqui utiliza o modificador de opcionalidade '?' para indicar que podem estar ausentes
  // em certas operações, como na entrada de dados no formulário.
  criado_em?: string;
  atualizado_em?: string;
}

@Injectable({
  // Configura como um Singleton, disponível em toda a aplicação -ÚNICO- todos vão usar somente
  // esse para esse tipo
  providedIn: 'root' // forma de registar um serviço no Angular, sempre do Injectable, acessível em qualquer lugar
})
export class ClienteService {

  // URL base do seu endpoint de Clientes no backend Express/Node.js
  private apiUrl = 'http://localhost:3001/api/cliente'; 

  // O HttpClient é injetado no construtor
  // Httpclient é o módulo nativo do angular para requisições de forma assíncrona via Observable
  constructor(private http: HttpClient) {} 

  // a chamda HTTP é inerente assíncrona, por isso o Observable
  // Observable: mecanismo assíncrono para lidar com operações que demoram no BROWSER(Rede)
  // independe se no backend foi utilizado async function
  // todos as funções terão Observable<nomeDoModel>

  // Omit literalmente omite as informações do modelo que foram listadas logo em seguida
  // é um Utility type do próprio do Typescript
  criarCliente(cliente: Omit<Cliente, 'id' | 'criado_em' | 'atualizado_em'>): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);
    // no return, retornar o tipo da requisição HTTP
  }

  // sempre retornar dentro de um array
  listarClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  // o Partial torna os atributos não obrigatórios de serem editados.
  // o usuário ao editar, pode deixar campos em branco, não acusando erro pelo Typescript.
  // é um Utility Type do Typescript
  // Payload - corpo da mensagem
  atualizarCliente(id: string, cliente: Partial<Cliente>): Observable<Cliente> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<Cliente>(url, cliente);
  }

  excluirCliente(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
};