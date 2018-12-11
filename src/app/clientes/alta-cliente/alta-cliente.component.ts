/**
 * Este componente serà el encargado de dar de alta a los clientes.
 * #
 * 1) Para poder usar el servicio ClientesService tengo que hacer el import, y posteriormente
 *    inyectarlo en el constructor del componente.
 * #
 * 2) Para poder seguir usando los datos de mi modelo, hacemos el import del archivo donde
 *    se definieron las interfaces.
 * #
 * 3) El componente declara un par de propiedades, el cliente y el array de grupos.
 * #
 * 4) En el constructor, que se ejecuta lo primero, conseguimos una instancia del servicio de clientes,
 *    mediante la inyección de dependencias.
 * #
 * 5) Posteriormente se ejecuta ngOnInit(). En este punto ya se ha recibido el servicio de clientes,
 *    por lo que lo puedo usar para generar los valores que necesito en las propiedades del componente.
 * #
 * 6) El método nuevoCliente() es el que se ejecutará cuando, desde el formulario de alta, se produzca el envío de datos.
 *    En este código usamos el servicio clientesService, para agregar el cliente y generar un cliente nuevo, para que el usuario
 *    pueda seguir dando de alta clientes sin machacar los clientes anteriormente creados.
 * #
 * Este componente lo quiero usar desde el componente raíz de mi aplicación. Como el componente raíz está declarado en otro módulo,
 * necesito hacer que conozca al AltaClienteComponent. Esto lo consigo en dos pasos:
 * - En el módulo de clientes "clientes.module.ts" agrego al exports el componente que quiero usar desde otros módulos.
 * - En el módulo raíz, "app.module.ts", debes declarar que vas a usar componentes que vienen de clientes.module.ts.
 *   Para ello tienes que hacer el correspondiente import:
 *   import { ClientesModule } from './clientes/clientes.module';
 *#
 *   Y luego declaras el módulo en el array de imports:
 *   imports: [
 *     BrowserModule,
 *     ClientesModule
 *   ],
 */
import { Component, OnInit } from '@angular/core';
import { ClientesService } from './../clientes.service';
import { Cliente, Grupo } from './../cliente.model';

@Component({
  selector: 'app-alta-cliente',
  templateUrl: './alta-cliente.component.html',
  styleUrls: ['./alta-cliente.component.css']
})
export class AltaClienteComponent implements OnInit {
  cliente: Cliente;
  grupos: Grupo[];

  constructor(private clientesService: ClientesService) { }

  ngOnInit() {
    this.cliente = this.clientesService.nuevoCliente();
    this.grupos = this.clientesService.getGrupos();
  }

  nuevoCliente(): void {
    this.clientesService.agregarCliente(this.cliente);
    this.cliente = this.clientesService.nuevoCliente();
  }

}
