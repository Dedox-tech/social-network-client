import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { DataResponse, EmptyResponse } from '../models/response.model';
import { UserAuthInformation, UserLogIn, UserSignUp } from '../models/user.model';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly httpClient: HttpClient, private readonly datePipe: DatePipe) {}

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
    const { token, expiration } = userData;
    localStorage.setItem('token', token);

    const stringDate: string = this.datePipe.transform(expiration, 'short') as string;
    localStorage.setItem('expiration', stringDate);
  }

  getAuthData(): UserAuthInformation | null {
    const expiration: string | null = localStorage.getItem('expiration');
    const token: string | null = localStorage.getItem('token');

    if (expiration !== null && token !== null) {
      const authData: UserAuthInformation = {
        token,
        expiration: new Date(expiration),
      };

      return authData;
    }

    return null;
  }
}
