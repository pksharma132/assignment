export class UpdateUserEvent {
  updateUserReq: {
    id: number;
    name: string;
    surname: string;
    username: string;
    birthdate: string;
  };
  userId: string;
}
