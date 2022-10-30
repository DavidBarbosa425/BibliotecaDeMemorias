import { PensamentoService } from './../pensamento.service';
import { Pensamento } from './../pensamento';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent implements OnInit {

  listaPensamentos: Pensamento[] = [

  ];
  paginaAtual: number =1;
  haMaisPensamentos: boolean = true;
  filtro : string = '';
  favorito: boolean = false;
  listaFavoritos: Pensamento[] = []

  constructor(private service: PensamentoService) { }

  ngOnInit(): void {
    this.service.listar(this.paginaAtual, this.filtro, this.favorito).subscribe((listaPensamentos)=>{
      this.listaPensamentos = listaPensamentos
    })
  }

  carregarMaisPensamentos() {
    this.service.listar(++this.paginaAtual, this.filtro, this.favorito).subscribe((listarPensamentos)=>{
      this.listaPensamentos.push(...listarPensamentos)
      if(!listarPensamentos.length) this.haMaisPensamentos = false
    })
  }

  pesquisarPensamento(){
    this.haMaisPensamentos = true
    this.paginaAtual = 1
    this.service.listar(this.paginaAtual, this.filtro, this.favorito)
      .subscribe((listaPensamentos) =>{
        this.listaPensamentos = listaPensamentos
      })
  }

  listarFavoritos(){
    this.favorito = true
    this.haMaisPensamentos = true
    this.paginaAtual = 1
    this.service.listar(this.paginaAtual, this.filtro, this.favorito).subscribe((listaPensamentos)=>{
      this.listaPensamentos = listaPensamentos
      this.listaFavoritos = listaPensamentos
    })
  }
}
