import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secretKey',
        });
    }

    // async validate(username: string, password: string): Promise<any> {
    //     const user = await this.
    //     // return { id: payload.sub, username: payload.username };
    // }

    async validate(payload: any) {
        return { userid: payload.sub, username: payload.username };
    }
}