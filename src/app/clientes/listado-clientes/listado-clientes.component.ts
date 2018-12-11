/**
 * Este componente serà el encargado de mostrar un listado de los clientes
 * que se van generando.
 * #
 * 1) Creamos los import del servicio y de los tipos de datos del modelo.
 * #
 * 2) Inyectamos el servicio en el constructor.
 * #
 * 3) En este componente tendremos como propiedad el array de clientes que el servicio vaya creando.
 *    Así pues, declaras dicho array de clientes.
 * #
 * 4) Cuando se inicialice el componente tienes que solicitar los clientes al servicio.
 *    Esto lo hacemos en el método ngOnInit().
 */
import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Cliente, Grupo } from './../cliente.model';
import { ClientesService } from './../clientes.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.css']
})
export class ListadoClientesComponent implements OnInit {

  clientes: Cliente[] = [];

  // Para comsumir un observable:
  // 1) Importar la clase Observable y crear una propiedad en el componente que permita almacenar el observable.
  // 2) Crear la suscripción a los eventos que nos entrega el observable, y que fueron generados en el servicio usando
  //    el subject.
  //    El lugar adecuado para generar esa suscripción es el método ngOnInit(), que se ejecuta cuando el componente ya
  //    se ha inicializado y por tanto tiene todas sus propiedades ya disponibles.
  clientes$: Observable<Cliente[]>;
  clientesSubscription: Subscription;
  constructor( private clientesService: ClientesService ) { }

  ngOnInit() {
    this.clientes$ = this.clientesService.getClientes$();
    this.clientes$.subscribe(clientes => this.clientes = clientes);
  }

  doBorrarCliente(cliente: Cliente) {
    console.log('yeah!', cliente);
    this.clientesService.borrarCliente(cliente);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    this.clientesSubscription.unsubscribe();
  }

  /**
   * En el código anterior hacemos dos pasos:
   * 1) Se accede al observable, mediante el método getClientes$() del servicio clientesService. Ese observable es
   *    el que puede escuchar los eventos que necesitamos consumir.
   * 2) Se crea una suscripción mediante el método suscribe() del observable. Este método de suscripción debe recibir
   *    la función manejadora de eventos que contiene el código a ejecutar cuando se dispara el evento. La función
   *    manejadora de eventos recibe el array que se está observando como parámetro.
   */

   /**
    * Cómo eliminar una suscripción a un observable
    * 1) Importar la declaración de suscripción de un observable.
    * 2) Declarar la suscripción como propiedad del componente.
    * 3) Guardarnos la suscripción en el paso de su creación.
    * 4) Eliminamos la suscripción al destruirse el elemento.
    */

}
