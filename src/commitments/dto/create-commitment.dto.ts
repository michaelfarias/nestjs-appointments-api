import { User } from "src/users/user.entity";

export class CreateCommitmentDto {
    description: string;
    user: User;
}