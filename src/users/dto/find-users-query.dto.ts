import { Address } from "../address";

export class FindUsersQueryDto {
    name: string;
    email: string;
    telephone: string;
    address: Address;
}