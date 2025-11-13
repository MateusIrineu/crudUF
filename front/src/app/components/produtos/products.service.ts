import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface Produto {
    id: string;
    nome: string;
    descricao: string;
    preco: string;
    estoque: number;
    criado_em?: string;
    atualizado_em?: string;
}

@Injectable({
    providedIn: 'root'
})
export class ProdutoService {
    private apiUrl = 'http://localhost:3001/api/produto';

    constructor(private http: HttpClient) {}

    criarProduto(produto: Omit<Produto, 'id' | 'criado_em' | 'atualizado_em'>): Observable<Produto> {
        return this.http.post<Produto>(this.apiUrl, produto);
    };

    listarProdutos(): Observable<Produto[]> {
        return this.http.get<Produto[]>(this.apiUrl);
    }

    atualizarProduto(id: string, produto: Partial<Produto>): Observable<Produto> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.patch<Produto>(url, produto);
    }

    excluirProduto(id: string): Observable<void> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete<void>(url);
    }
};