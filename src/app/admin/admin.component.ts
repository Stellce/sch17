import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";

import { AppService } from "../app.service";
import {User} from "../models/user-data.model";
import {from} from "rxjs";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent {

  constructor(public appService: AppService){};

  onAddUser(form: NgForm) {
    const formV = form.value;
    const user: User = {
      status: formV.status,
      nazwisko: formV.nazwisko,
      imie: formV.imie,
      login: formV.login,
      email: formV.email,
      adres: formV.adres,
      telefon: formV.telefon,
      klasa: formV.klasa,
      haslo: formV.haslo
    };
    this.appService.onAddUser(user);
  }
  onAddSubj(form: NgForm) {

  }

}
