export type Response = {
  statusCode: number;
  status: 'success' | 'failure';
  body: unknown;
  headers?: Record<string, string>[] | undefined;
};
export class CreateUserRequest {
  id: string;
  name: string;
  surname: string;
  username: string;
  birthdate: Date;
  blocked: boolean;
}

export type SearchUserEvent = {
  name: string | undefined;
  minAge: string | undefined;
  maxAge: string | undefined;
  userId: string;
};
