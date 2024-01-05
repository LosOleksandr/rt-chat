export type TSignupCreds = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export enum AuthActions {
  SIGNUP = "signup",
  LOGIN = "login",
}
