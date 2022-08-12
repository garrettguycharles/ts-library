import {Logger} from "./Logger";

export class ApiLogger extends Logger {

    url: string;

    constructor(url: string) {
        super();

        this.url = url;
    }

    log(level: string, message: string) {
        // axios.post(this.url, {level: level, message: message});
    }
}