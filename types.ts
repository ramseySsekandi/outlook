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
  email: string | null;
  username: string | null;
  password: string | null;
  userId: string | null;
  expiresAt: Date;
};

export type AuthProps = {
  email: string;
  username: string;
  password: string;
};
