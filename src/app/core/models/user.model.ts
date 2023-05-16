export interface UserSignUp {
  userName: string;
  email: string;
  password: string;
}

export interface UserLogIn {
  userName: string;
  password: string;
}

export interface UserAuthInformation {
  token: string;
  expiration: Date;
}
