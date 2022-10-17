import { Component, ElementRef, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { UsuarioService } from '../../services/usuario.service';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements AfterViewInit {

  @ViewChild('googleBtn') googleBtn!: ElementRef;

  constructor(private usuarioService: UsuarioService, private router: Router, private ngZone: NgZone) { }

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
      resp => {
        this.ngZone.run(() => {
          //  Navegar al dashboard
          this.router.navigateByUrl('/');
        });
      }
    );
  }


}
