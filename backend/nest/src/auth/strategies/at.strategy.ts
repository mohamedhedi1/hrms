import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from 'express';
import { Injectable } from "@nestjs/common";

type JwtPayload = {
    sub : string;
    email: string;
}


@Injectable()
export class AtStrategy extends PassportStrategy(Strategy,'jwt')
{
    constructor(){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration : false,
            secretOrKey: 'at-secret',
            passReqToCallback : true

        })
    }

    validate(req: Request, payload : JwtPayload ){
        return payload;
    }

}