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
  password: string;
  userId: string;
  expiresAt: Date;
};

export type AuthProps = {
  email: string;
  username: string;
  password: string;
};
