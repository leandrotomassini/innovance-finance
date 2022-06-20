import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-nuevo-articulo',
  templateUrl: './nuevo-articulo.page.html',
  styleUrls: ['./nuevo-articulo.page.scss']
})
export class NuevoArticuloPage implements OnInit {

  nuevoTitulo: string = '';

  nuevoArticuloFormulario: FormGroup = this.fb.group({
    titulo: ['', [Validators.required, Validators.minLength(5)]],
    descripcion: ['', [Validators.required, Validators.minLength(5)]],
  });

  constructor(public modalController: ModalController, public fb: FormBuilder) { }

  ngOnInit() {
    
  }

  guardar() {
    console.log('Guardado: ', this.nuevoArticuloFormulario.value);
    this.modalController.dismiss();
  }


}
