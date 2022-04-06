import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuSemanaComponent } from './tu-semana/tu-semana.component';
import { ContinuaAprendiendoComponent } from './continua-aprendiendo/continua-aprendiendo.component';
import { MisRutasComponent } from './mis-rutas/mis-rutas.component';
import { AdquirirUnPlanComponent } from './adquirir-un-plan/adquirir-un-plan.component';
import { UltimasPublicacionesComponent } from './ultimas-publicaciones/ultimas-publicaciones.component';
import { EscuelasDeTuInteresComponent } from './escuelas-de-tu-interes/escuelas-de-tu-interes.component';



@NgModule({
  declarations: [
    TuSemanaComponent,
    ContinuaAprendiendoComponent,
    MisRutasComponent,
    AdquirirUnPlanComponent,
    UltimasPublicacionesComponent,
    EscuelasDeTuInteresComponent
  ],
  exports: [
    TuSemanaComponent,
    ContinuaAprendiendoComponent,
    MisRutasComponent,
    AdquirirUnPlanComponent,
    UltimasPublicacionesComponent,
    EscuelasDeTuInteresComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
