import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserAuthInformation, UserLogIn, UserSignUp } from '../core/models/user.model';
import { AuthService } from '../core/services/auth.service';
import { passwordValidator } from '../core/validators/password.validator';
import { DataResponse, EmptyResponse } from '../core/models/response.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

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

  // Workaround needed because calling FormGroup.reset does not clear the Angular Material validator messages
  // More info: https://github.com/angular/components/issues/4190
  @ViewChild('signUpFormDirective') private readonly signUpFormDirective: NgForm | null = null;

  signUpForm = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, passwordValidator()]),
  });

  logInForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  handleSignUp(): void {
    const signUpInformation: UserSignUp = this.signUpForm.value as UserSignUp;
    // Only fires the form if the status is valid
    if (this.signUpForm.valid) {
      this.authService.signUp(signUpInformation).subscribe((response: EmptyResponse) => {
        this.snackBarService.open('You have signed up! Now you can login anytime', 'Close');
        // Resetting the form state
        this.signUpForm.reset();
        this.signUpFormDirective?.resetForm();
      });
    } else {
      this.snackBarService.open(
        'Something went wrong, please double-check the information',
        'Close'
      );
    }
  }

  handleLogIn(): void {
    const logInInformation: UserLogIn = this.logInForm.value as UserLogIn;
    if (this.logInForm.valid) {
      this.authService.logIn(logInInformation).subscribe({
        next: (response: DataResponse<UserAuthInformation>) => {
          this.authService.saveAuthData(response.data);
          this.snackBarService.open('Excellent! You have logged in in the system', 'Close');
        },
        error: (errorResponse: HttpErrorResponse) => {
          const customError: EmptyResponse = errorResponse.error;
          this.snackBarService.open(customError.message, 'Close');
        },
      });
    }
  }
}
