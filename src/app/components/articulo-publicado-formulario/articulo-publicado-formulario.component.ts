import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Articulo } from '../../interfaces/verArticulos';
import { ArticulosService } from '../../services/articulos.service';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-articulo-publicado-formulario',
  templateUrl: './articulo-publicado-formulario.component.html',
  styleUrls: ['./articulo-publicado-formulario.component.scss'],
})
export class ArticuloPublicadoFormularioComponent implements OnInit, OnDestroy {

  @Input() subscripcion: string;
  articulosSubscription: Subscription;

  articulos: Articulo[];

  constructor(private articulosService: ArticulosService, private wsService: WebsocketService) { }

  ngOnInit() {

    this.wsService.emit('listarArticulos');

    this.articulosSubscription = this.wsService.listen('articulosActualizados')
      .subscribe(() => {
        this.articulosService.obtenerArticulos()
          .subscribe((articulos: Articulo[]) => {
            this.articulos = articulos;
          });
      });
  }

  ngOnDestroy(): void {
    this.articulosSubscription.unsubscribe();
  }

}
