import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface ItemPedidoPayload {
    produtoId: string;
    quantidade: number;
}

export interface PedidoParaCriacao {
    clienteId: string;
    itens: ItemPedidoPayload[];
}

export interface ItemPedido {
    id: string;
    pedidoId: string;
    produtoId: string;
    quantidade: number;
    produto?: { 
        id: string;
        nome: string;
        preco: number;
    };
}

export interface Pedido {
    id: string;
    clienteId: string;
    itens: ItemPedido[];
    criado_em?: string;
    atualizado_em?: string;
}

@Injectable({
    providedIn: 'root'
})
export class PedidoService {
    private apiUrl = 'http://localhost:3001/api/pedido';

    constructor(private http: HttpClient) {}

    criarPedido(pedido: PedidoParaCriacao): Observable<Pedido> {
        const url = `${this.apiUrl}/criar`;
        return this.http.post<Pedido>(url, pedido);
    }

    listarPedidos(): Observable<Pedido[]> {
        return this.http.get<Pedido[]>(this.apiUrl);
    }

    obterPedido(id: string): Observable<Pedido> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<Pedido>(url);
    }

    atualizarPedido(id: string, pedido: Partial<Pedido>): Observable<Pedido> {
        const url = `${this.apiUrl}/atualizar/${id}`;
        return this.http.patch<Pedido>(url, pedido);
    }

    excluirPedido(id: string): Observable<void> {
        const url = `${this.apiUrl}/delete/${id}`;
        return this.http.delete<void>(url);
    }
}