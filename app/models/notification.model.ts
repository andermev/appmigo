import { Location } from "~/models/location.model";
import { User } from "~/models/user.model";

export class Notification {
    id: string;
    type: string;
    isAlert: boolean;
    userReported: User;
    countTimeReported: number;
    location: Location;
    creationDate: string;

    constructor(options: any) {
        this.id = options.id;
        this.type = options.type;
        this.isAlert = options.isAlert;
        this.userReported = options.userReported;
        this.countTimeReported = options.countTimeReported;
        this.location = options.location;
        this.creationDate = options.creationDate;
    }
}
