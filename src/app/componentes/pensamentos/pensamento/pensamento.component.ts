import { PensamentoService } from './../pensamento.service';
import { Pensamento } from './../pensamento';
import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrls: ['./pensamento.component.css']
})
export class PensamentoComponent implements OnInit {

  @Input() pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria:  '',
    modelo: '',
    favorito: false
  }

  constructor(private service: PensamentoService) { }

  ngOnInit(): void {

  }

  larguraPensamento(): string{
    if(this.pensamento.conteudo.length >= 256){
      return 'pensamento-g'
    }
    return 'pensamento-p'
  }

  mudarIconeFavorito(): string{
      if(this.pensamento.favorito == true) return 'ativo'
      return 'inativo'
  }

  mudarFavorito(){
    this.service.mudarFavorito(this.pensamento).subscribe()
  }

}