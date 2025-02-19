export type LoginProps = {
  email: string;
  password: string;
};

export type RegisterProps = {
  username: string;
  email: string;
  password: string;
};

export type IPayload = {
  email: string;
  username: string;
  userId: string;
  expiresAt: Date;
};

export type AuthProps = {
  email: string;
  username: string;
  image: string;
};
