import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserSignUp } from '../core/models/user.model';
import { AuthService } from '../core/services/auth.service';
import { passwordValidator } from '../core/validators/password.validator';
import { EmptyResponse } from '../core/models/response.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  constructor(
    private readonly authService: AuthService,
    private readonly snackBarService: MatSnackBar
  ) {}

  signUpForm = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, passwordValidator()]),
  });

  handleSignUp(): void {
    const signUpInformation: UserSignUp = this.signUpForm.value as UserSignUp;
    // Only fires the form if the status is valid
    if (this.signUpForm.valid) {
      this.authService.signUp(signUpInformation).subscribe((response: EmptyResponse) => {
        this.snackBarService.open('Excellent! You have signed up in the system', 'Close');
      });
    }
  }
}
