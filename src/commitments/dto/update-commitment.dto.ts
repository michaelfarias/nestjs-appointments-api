export class UpdateCommitmentDto {
    description: string;
    date: string;
    time: string;
    place: string;
    email_people_involved: [];
    public: boolean;

    reminder: {
        days_before: number,
        hours_before: number
    }
}