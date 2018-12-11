/**
 * En este servicio sono concentradas las tareas de trabajo con los
 * datos de los clientes, descargando da còdigo a los componentes de
 * la aplicaciòn y centralizando en un solo archivo la lògica de la aplicaciòn.
 * #
 * 1) Las dos propiedades del servicio contienen los datos que va a mantener. Sin embargo,
 *    las hemos definido como privadas, de modo que no se puedan tocar directamente y tengamos que usar
 *    los métodos del servicio creados para su acceso.
 * #
 * 2) Los grupos los construyes con un literal en el constructor. Generalmente los traerías de algún servicio REST
 *    o algo parecido, pero de momento está bien para empezar.
 * #
 * 3) Agregar un cliente es un simple "push" al array de clientes, de un cliente recibido por parámetro.
 * #
 * 4) Crear un nuevo cliente es simplemente devolver un nuevo objeto, que tiene que respetar la interfaz, ya que en la función
 *    nuevoCliente() se está especificando que el valor de devolución será un objeto del tipo Cliente.
 * #
 * 5) Fíjate que en general está todo tipado, tarea opcional pero siempre útil.
 */
import { Injectable } from '@angular/core';
import { Cliente, Grupo } from './cliente.model';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private clientes: Cliente[];
  private grupos: Grupo[];

  // Realizamos la declaraciòn privada, para que nadie pueda acceder al subject, excepto el propio servicio.
  // El nombre de la propiedad privada es clientes$. Es normal que los subjects en el trabajo con observables
  // tengan el caràcter "$" al final para dejar claro lo que son.
  private clientes$ = new Subject<Cliente[]>();

  constructor() {
    this.grupos = [
      {
        id: 0,
        nombre: 'Sin definir'
      },
      {
        id: 1,
        nombre: 'Activos'
      },
      {
        id: 2,
        nombre: 'Inactivos'
      },
      {
        id: 3,
        nombre: 'Deudores'
      },
    ];
    this.clientes = [];
  }

  getGrupos() {
    return this.grupos;
  }

  // Generaciòn del observer, que se entregará a todos aquellos componentes que quieran observar
  // cambios en el almacén de datos.
  // Es interesante este paso, puesto que el observable es un consumidor de los eventos del subject y es de sólo lectura.
  // Es decir, puede estar atento a eventos, pero es incapaz de hacer nada más.
  // Por tanto, lo único que el servicio entregará externamente, a cualquier componente que lo necesite, es este observable.
  // Mediante el observable, los componentes sabrán cuando el almacén de datos se ha modificado, pero ningún componente podrá
  // generar nuevos eventos de cambio del almacén de datos, que es una responsabilidad del servicio y tarea principal
  // del subject privado.
  // El observer se creará mediante un método del subject llamado asObservable().

  getClientes$(): Observable<Cliente[]> {
    return this.clientes$.asObservable();
  }

  // Ahora ademàs del push, se genera el evento con el subject con el mèetodo "next", pasàndole
  // el estado dell array para que luego los observadores puedan saber còmo estab el array al
  // producirse el evento.
  agregarCliente(cliente: Cliente) {
    this.clientes.push(cliente);
    this.clientes$.next(this.clientes);
  }

  borrarCliente(cliente: Cliente): void {
    for (let i = 0; i < this.clientes.length; i++) {
      if (cliente === this.clientes[i]) {
        this.clientes.splice(i, 1);
        break;
      }
    }
  }

  nuevoCliente(): Cliente {
    return {
      id: this.clientes.length,
      nombre: '',
      cif: '',
      direccion: '',
      grupo: 0
    };
  }
}
