import { HttpRequest } from "../request-response/HttpRequestResponse";
import { Server } from "../Server";
export declare class RegisterRequest extends HttpRequest {
    email: string;
    password: string;
    given_name: string;
    family_name: string;
}
export declare class LoginRequest extends HttpRequest {
    email: string;
    password: string;
}
declare const QuickstartServer: Server;
export { QuickstartServer };
//# sourceMappingURL=ServerQuickstart.d.ts.map