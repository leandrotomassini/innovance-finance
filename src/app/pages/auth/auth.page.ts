import { NgZone } from '@angular/core';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


import { UsuarioService } from '../../services/usuario.service';


declare const google: any;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit, AfterViewInit {

  @ViewChild('googleBtn') googleBtn!: ElementRef;

  constructor(private usuarioService: UsuarioService, private ngZone: NgZone, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
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
      header: 'El usuario no existe',
      message: 'Por favor adquiera una subscripción para ingresar al sistema.',
      buttons: ['OK']
    });

    await alert.present();
  }

}
