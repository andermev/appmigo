import { Location } from "~/models/location.model";
import { User } from "~/models/user.model";

export class Notification {
    type: string;
    isAlert: boolean;
    userReported: User;
    countTimeReported: number;
    location: Location;
    creationDate: string;

    constructor(options: any) {
        this.type = options.type;
        this.isAlert = options.isAlert;
        this.userReported = options.userReported;
        this.countTimeReported = options.countTimeReported;
        this.location = options.location;
        this.creationDate = options.creationDate;
    }
}
