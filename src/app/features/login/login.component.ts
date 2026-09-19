import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/auth/services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit, OnDestroy {
  errMsg = '';
  loading = false;
  showPassword = false;

  loginForm!: FormGroup;

  loginSub$ = new Subscription();

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    this.loginSub$?.unsubscribe();
  }

  submitForm(): void {
    this.errMsg = '';

    if (this.loginForm.valid) {
      this.loading = true;

      this.loginSub$ = this.authService.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.success) {
            localStorage.setItem('socialToken', res.data.token);
            localStorage.setItem('socialUser', JSON.stringify(res.data.user));
            this.router.navigate(['/feed']);
          }
        },

       

        complete: () => {
          this.loading = false;
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
