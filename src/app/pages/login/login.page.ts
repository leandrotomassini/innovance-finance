import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';

import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginUser = {
    email: 'test1@test.com',
    password: '12345678'
  };

  constructor(private usuarioService: UsuarioService, private navCtrl: NavController,
    private uiService: UiServiceService) { }

  ngOnInit() {
  }

  async login(fLogin: NgForm) {

    if (fLogin.invalid) { return; }
    const valido = await this.usuarioService.login(this.loginUser.email, this.loginUser.password);

    if (valido) {
      // Navegar al tabs.
      this.navCtrl.navigateRoot('/aprender', { animated: true });
    } else {
      // Mostrar alerta de usaurio y clavo no son correctos.
      this.uiService.alertaInformativa('Usuario o contraseña no son correctos.')
    }

  }

}
