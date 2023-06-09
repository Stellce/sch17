import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  isLoading = false;

  private authStatusSub: Subscription;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
      this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
        authStatus => {
          this.isLoading = false;
        }
      )
  }

  onLogin(form: NgForm): void {
    if(form.invalid) return;
    this.isLoading = true;
    this.authService.login(form.value.login, form.value.password);
  }

  ngOnDestroy(): void {
      this.authStatusSub.unsubscribe();
  }

}
