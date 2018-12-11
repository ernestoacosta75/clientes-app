/**
 * 1) Declarar en el módulo de clientes que se va a usar la directiva "ngModel". Para ello tenemos que hacer dos pasos:
 *    - Hacer el import del componente "FormsModule"
 *    - Indicar el import de FormsModule en ell array imports del decorador.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesService } from './clientes.service';
import { AltaClienteComponent } from './alta-cliente/alta-cliente.component';
import { FormsModule } from '@angular/forms';
import { ListadoClientesComponent } from './listado-clientes/listado-clientes.component';
import { ItemClienteComponent } from './item-cliente/item-cliente.component';

@NgModule({
  declarations: [
    AltaClienteComponent,
    ListadoClientesComponent,
    ItemClienteComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    AltaClienteComponent,
    ListadoClientesComponent
  ],
  providers: [
    ClientesService
  ]
})
export class ClientesModule { }
