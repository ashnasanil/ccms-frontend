import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  showPassword = signal(false);

  togglePasswordVisibility(): void {
    this.showPassword.update(show => !show);
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const { username, password } = this.loginForm.value;

    this.authService.login(username!, password!).subscribe({
      next: () => {
        this.isLoading.set(false);
        const role = this.authService.getRole();
        if (role === 'CourtOfficer') {
          this.router.navigate(['/court-dashboard']);
        } else if (role === 'BankOfficer') {
          this.router.navigate(['/bank-dashboard']);
        } else {
          this.errorMessage.set('Authorized, but role is unrecognized.');
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        if (err.status === 401) {
          this.errorMessage.set('Invalid username or password.');
        } else {
          this.errorMessage.set('An error occurred. Please try again.');
        }
      }
    });
  }
}
