import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { ModalController } from '@ionic/angular';
import { WebsocketService } from '../../services/websocket.service';
import { Articulo } from '../../interfaces/verArticulos';
import { ArticulosService } from '../../services/articulos.service';
import { UsuariosService } from '../../services/usuarios.service';


@Component({
  selector: 'app-articulo-formulario',
  templateUrl: './articulo-formulario.component.html',
  styleUrls: ['./articulo-formulario.component.scss'],
})
export class ArticuloFormularioComponent implements OnInit {

  @Input() articulo: Articulo;

  public articuloData: Articulo = {
    __v: 0,
    _id: '',
    titulo: '',
    portada: '',
    contenido: '',
    descripcionCorta: '',
    estado: false,
    fecha: '',
    terminado: false,
    usuario: null
  };

  articuloFormulario: FormGroup = this.fb.group({
    titulo: [, [Validators.required, Validators.minLength(10)]],
    portada: [, [Validators.required, Validators.minLength(20)]],
    descripcionCorta: [, [Validators.required, Validators.minLength(20)]],
    contenido: [, [Validators.required, Validators.minLength(20)]],
    estado: [],
    fecha: [],
    terminado: [],
    usuario: []
  });

  constructor(private fb: FormBuilder, private modalCtrl: ModalController, private articulosService: ArticulosService, private wsService: WebsocketService, private usuarioService: UsuariosService) {
    if (this.articulo) {
      this.articuloData = this.articulo;
    }
  }

  async ngOnInit() {

    if (this.articulo != undefined) {
      if (this.articulo._id != '') {
        await this.articulosService.verArticulo(this.articulo._id)
          .subscribe(({ titulo, portada, descripcionCorta, contenido, estado, fecha, terminado, usuario }: Articulo) => {
            this.articuloFormulario.reset({
              titulo,
              portada,
              descripcionCorta,
              contenido,
              estado,
              fecha,
              terminado,
              usuario: usuario.uid
            });
          });
      }
    }
  }

  campoEsValido(campo: string) {
    return this.articuloFormulario.controls[campo].errors
      && this.articuloFormulario.controls[campo].touched;
  }

  salirSinArgumentos() {
    this.modalCtrl.dismiss();
  }

  async guardar() {

    if (this.articuloFormulario.invalid) {
      this.articuloFormulario.markAllAsTouched();
      return;
    }
    if (this.articulo != undefined) {
      if (this.articulo._id) {
        this.articulosService.actualizarArticulo(this.articuloFormulario.value, this.articulo._id).subscribe(() => {
          this.wsService.emit('listarArticulos');
        });
      }
    } else {
      this.articuloFormulario.value.estado = true;
      this.articuloFormulario.value.terminado = false;
      this.articuloFormulario.value.fecha = 'hoy';
      this.articuloFormulario.value.usuario = this.usuarioService.usuario.uid;

      await this.articulosService.crearArticulo(this.articuloFormulario.value)
        .subscribe(() => {
          this.wsService.emit('listarArticulos');
        });
    }
    this.articuloFormulario.reset();
    this.salirSinArgumentos();
  }


  activarArticulo(articuloId: string) {
    this.articulo.estado = true;
    this.articulosService.actualizarArticulo(this.articulo, this.articulo._id)
      .subscribe(() => {
        this.wsService.emit('listarArticulos');
        this.modalCtrl.dismiss();
      });
  }

  listarArticulo(articuloId: string) {
    this.articulo.terminado = true;
    this.articulosService.actualizarArticulo(this.articulo, this.articulo._id)
      .subscribe(() => {
        this.wsService.emit('listarArticulos');
        this.modalCtrl.dismiss();
      });
  }

  guardarBorrador(articuloId: string) {
    this.articulo.terminado = false;
    this.articulosService.actualizarArticulo(this.articulo, this.articulo._id)
      .subscribe(() => {
        this.wsService.emit('listarArticulos');
        this.modalCtrl.dismiss();
      });
  }

}
