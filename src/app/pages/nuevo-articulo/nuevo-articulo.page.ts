import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ArticuloService } from 'src/app/services/articulo.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-nuevo-articulo',
  templateUrl: './nuevo-articulo.page.html',
  styleUrls: ['./nuevo-articulo.page.scss']
})
export class NuevoArticuloPage implements OnInit {

  nuevoTitulo: string = '';
  categorias: any = [];

  nuevoArticuloFormulario: FormGroup = this.fb.group({
    titulo: ['', [Validators.required, Validators.minLength(5)]],
    descripcion: ['', [Validators.required, Validators.minLength(5)]],
    categorias: ['', [Validators.required]]
  });

  constructor(
     public modalController: ModalController,
     public fb: FormBuilder,
     public usuarioService: UsuarioService,
     public articuloService: ArticuloService
  ) { }


  async ngOnInit() {
    await this.obtenerSubscripciones();
  }

  guardar() {
    console.log('Guardado: ', this.nuevoArticuloFormulario.value);
    this.articuloService.crearArticulo();
    this.modalController.dismiss();
  }

  salirSinArgumentos() {
    this.modalController.dismiss();
  }

  async obtenerSubscripciones() {
    this.usuarioService.obtenerSubscripciones().then(categorias => this.categorias = categorias);
  }

}
