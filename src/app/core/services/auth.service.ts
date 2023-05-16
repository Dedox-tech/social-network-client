import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { DataResponse, EmptyResponse } from '../models/response.model';
import { UserAuthInformation, UserLogIn, UserSignUp } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly httpClient: HttpClient) {}

  signUp(userCredentials: UserSignUp): Observable<EmptyResponse> {
    const { serverUrl } = environment;
    return this.httpClient.post<EmptyResponse>(`${serverUrl}/api/auth/signup`, userCredentials);
  }

  logIn(userCredentials: UserLogIn): Observable<DataResponse<UserAuthInformation>> {
    const { serverUrl } = environment;
    return this.httpClient.post<DataResponse<UserAuthInformation>>(
      `${serverUrl}/api/auth/login`,
      userCredentials
    );
  }

  saveAuthData(userData: UserAuthInformation): void {
    const { token } = userData;
    localStorage.setItem('token', token);
    console.log(userData.expiration);
  }
}
