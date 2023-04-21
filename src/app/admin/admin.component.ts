import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";

import { AppService } from "../app.service";
import {User} from "../models/user-data.model";
import {from} from "rxjs";
import {SubjModel} from "../models/subj-data.model";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent {
  private defHaslo: string = 'lajdael';

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
    this.appService.addUser(user);
  }
  onAddSubj(form: NgForm) {
    const subj: SubjModel = {
      nazwa: form.value.nazwa,
      liczbaGodzin: form.value.liczbaGodzin,
      tematyka: form.value.tematyka,
      rodzaj: form.value.rodzaj,
      prowadzace: form.value.prowadzace,
      literatura: form.value.literatura
    }
    this.appService.addSubj(subj);
  }

  onDeleteUser(form: NgForm) {
    this.appService.deleteUser(form.value.imie, form.value.nazwisko);
  }

  onDeleteSubj(form: NgForm) {
    console.log(form.value.id);
    this.appService.deleteSubj(+form.value.id);
  }


}
