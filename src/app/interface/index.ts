export interface UserType {
  myProfile: MyProfile;
}

export interface MyProfile {
  __typename: string;
  id: string;
  name: string;
  avatar: string;
}

export interface LoginType {
  login: {
    access_token: string;
    refresh_token: string;
    readonly __typename: string;
  };
}

export interface ErrorValidationTypes {
  email?: string;
  password?: string;
}

export interface ShowErrorFieldProps {
  error: string | undefined;
}
