import { JwtPayload } from "jsonwebtoken";
import * as core from "express-serve-static-core";

/* declare function e(): core.Express;


declare namespace e {
   export interface Request extends core.Request {
      user?: JwtPayload|string
   }
}

export = e; */

declare global{
    namespace Express {
        interface Request {
            user?: JwtPayload|string
        }
    }
}