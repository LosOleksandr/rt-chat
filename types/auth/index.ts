import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";

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

export type TServerSessionContext = {
  req: GetServerSidePropsContext["req"] | NextApiRequest;
  res: GetServerSidePropsContext["res"] | NextApiResponse;
};
