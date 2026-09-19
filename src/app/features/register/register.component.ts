import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/auth/services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit, OnDestroy {
  errMsg: string = '';
  loading: boolean = false;
  registerForm!: FormGroup;

  registerSub$: Subscription = new Subscription();

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);

  ngOnInit(): void {
  
    this.registerForm = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],

        username: ['', [Validators.required, Validators.minLength(3)]],

        email: ['', [Validators.required, Validators.email]],

        password: [
          '',
          [
            Validators.required,
            Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
          ],
        ],

        gender: ['', [Validators.required]],

        dateOfBirth: ['', [Validators.required]],

        rePassword: ['', [Validators.required]],
      },
      {
        validators: this.passwordMatchValidator,
      },
    );
  }
  ngOnDestroy(): void {
  this.registerSub$.unsubscribe();
}

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const rePassword = control.get('rePassword')?.value;

    if (password !== rePassword) {
      return {
        passwordMismatch: true,
      };
    }

    return null;
  }

  submitForm(): void {
    this.errMsg = '';

    if (this.registerForm.valid) {
      this.loading = true;

      this.registerSub$ = this.authService.signUp(this.registerForm.value).subscribe({
        next: (res) => {
          if (res.success) {
            this.router.navigate(['/login']);
          }
        },

       

        complete: () => {
          this.loading = false;
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
