import { NgZone } from '@angular/core';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


import { UsuarioService } from '../../services/usuario.service';


declare const google: any;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements AfterViewInit {

  @ViewChild('googleBtn') googleBtn!: ElementRef;

  constructor(private router: Router, private alertController: AlertController, private usuarioService: UsuarioService, private ngZone: NgZone) { }

  ngAfterViewInit() {
    this.googleInit();
  }


  googleInit() {

    google.accounts.id.initialize({
      client_id: "741201888674-e9nb12dhrsi1lsqql4mor1t9980vp132.apps.googleusercontent.com",
      callback: (response: any) => this.handleCredentialResponse(response)
    });

    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse(response: any) {
    // console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle(response.credential).subscribe(
      (resp) => {
        this.ngZone.run(() => {
          //  Navegar al dashboard
          this.router.navigateByUrl('/dashboard');
        });
      }, (err) => {
        this.presentAlert();
      }
    );
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'El usuario no es administrador o instructor',
      message: 'Permiso denegado, hable con un administrador para habilitar su cuenta.',
      buttons: ['OK']
    });

    await alert.present();
  }

}
