import {Collection} from "fireorm";

@Collection()
export class User {
    id: string = "";
    role?: string;
    passwordHash?: string;
    username?: string;
}