import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { AuthData } from './auth-data.model';
import {environment} from "../../assets/environment";

const BACKEND_URL = environment.apiUrl;

@Injectable({ providedIn: 'root'})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private status: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getStatus() {
    return this.status;
  }

  getAuthStatusListener() {
    return this.authStatusListener;
  }

  login(login: string, password: string) {
    const authData: AuthData = {login: login, password: password};
    this.http.post<{token: string, expiresIn: number, status: string}>(
      BACKEND_URL + '/login',
      authData
    )
    .subscribe(response => {
      const token = response.token;
      this.token = token;
      if (token) {
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.isAuthenticated = true;
        this.status = response.status;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() +  expiresInDuration * 1000);
        this.saveAuthData(token, expirationDate, this.status);
        console.log(expirationDate);
        this.router.navigate(['/'+response.status]);
      }
    }, error => {
      this.authStatusListener.next(false);
    })

  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.status = authInformation.status;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.status = null;
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, status: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("status", status);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration")
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const status = localStorage.getItem("status");
    if (!token || !expirationDate || !status) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      status: status,
    }
  }
}
