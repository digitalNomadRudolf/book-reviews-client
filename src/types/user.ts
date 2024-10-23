interface UserType {
  userId: string;
  username: string;
  email: string;
  password?: string;
}

type UserResponseType = {
  id: string;
  username: string;
  email: string;
  password: string;
  token: string;
};

export type { UserType, UserResponseType };
