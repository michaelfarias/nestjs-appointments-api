import { User } from "src/users/user.entity";

export class CreateCommitmentDto {
    description: string;
    user: User;
    date: string;
    time: string;
    place: string;
    email_people_involved: [];

    reminder: {
        days_before: number,
        hours_before: number
    }
}