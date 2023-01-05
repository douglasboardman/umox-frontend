import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class OperacoesService {

  constructor(private webRequestService: WebRequestService, private router: Router) { }
  dadosReq!: any;
  
  consultarEstoque(){
    return this.webRequestService.get('operacoes/itens/consultarEstoque');
  }
}
