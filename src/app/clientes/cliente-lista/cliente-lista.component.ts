import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { from } from 'rxjs';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css'],
})
export class ClienteListaComponent implements OnInit, OnDestroy {

  clientes: Cliente[] = [];

  private clientesSubscription: Subscription;

  constructor(public clienteService: ClienteService) { 

  }

  ngOnInit(): void {
    this.clientes = this.clienteService.getClientes();
    this.clientesSubscription = this.clienteService.getListaDeClientesAtualizadaObservable().subscribe((clientes:Cliente[])=>{
      this.clientes = clientes;
    });
  }

  ngOnDestroy(): void{
    this.clientesSubscription.unsubscribe();
  }
}
