import {Collection} from "fireorm";
// @ts-ignore
import {v4 as uuidv4} from 'uuid';



@Collection()
export class Report {

    // also the Hash of the report
    id: string = "";

    verifyDiged?: string;

    setHash(hash: string) : this {
        this.id = hash;
        this.verifyDiged = uuidv4().split("-")[0].toUpperCase();
        return this;
    }

}