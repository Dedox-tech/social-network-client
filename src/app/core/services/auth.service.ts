import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Subscription } from 'rxjs';
import { EmptyResponse } from '../models/response.model';
import { UserSignUp } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly httpClient: HttpClient) {}

  signUp(userCredentials: UserSignUp): Subscription {
    const { serverUrl } = environment;
    return this.httpClient
      .post<EmptyResponse>(`${serverUrl}/api/auth/signup`, userCredentials)
      .subscribe((response: EmptyResponse) => {
        console.log(response);
      });
  }
}
