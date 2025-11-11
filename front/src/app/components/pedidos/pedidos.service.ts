import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

// será de escrita e rec
// o que será passado no corpo do pedido
// essencial para a função de criarPedido no controller de pedidos
// vinculado com a interface PedidoParaCriacao
export interface ItemPedidoPayload { // enviado como um array
    produtoId: string;
    quantidade: number;
}

// recebe o array de ItemPedidoPayload
// aqui sim que o clienteId é utilizado e tem ligação
// direta com a função de criarPedido no controller
export interface PedidoParaCriacao {
    clienteId: string;
    itens: ItemPedidoPayload[]; // recebido como um array
}

// será de leitura
// demonstra a estrutura de como o Pedido será enviado
export interface ItemPedido { // enviado como um array
    id: string;
    pedidoId: string;
    produtoId: string;
    quantidade: number;
    produto?: { 
        id: string;
        nome: string;
        preco: string;
    };
}
// leitura, demonstra como o pedido será estruturado no frontend
// recebe o array da interface de ItemPedido[]
export interface Pedido {
    id: string;
    clienteId: string;
    itens: ItemPedido[]; // recebido como um array
    criado_em?: string;
    atualizado_em?: string;
}

@Injectable({
    providedIn: 'root'
})

export class PedidoService {
    private apiUrl = 'http://localhost:3001/api/pedido';

    constructor(private http: HttpClient) {}

    // o pedido: faz a chamada de PedidoParaCriacao, que já consta o clientId e o array Itens[]
    // vindo de ItensPedidosPayload
    // salva a exceção que o id deverá ser passado, quando for id de autoincremento, não deverá ser passado.
    // buscando a forma normal criarExemplo(exemplo: Omit<Exemplo>, 'id' | ...<Exemplo>).
    criarPedido(pedido: PedidoParaCriacao): Observable<Pedido> {
        return this.http.post<Pedido>(this.apiUrl, pedido);
    }

    listarPedidos(): Observable<Pedido[]> {
        return this.http.get<Pedido[]>(this.apiUrl);
    }

    atualizarPedido(id: string, pedido: Partial<Pedido>): Observable<Pedido> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.patch<Pedido>(url, pedido);
    }

    excluirPedido(id: string): Observable<void> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete<void>(url)
    }
}