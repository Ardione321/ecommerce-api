import { Injectable } from "@nestjs/common";
import * as argon2 from "argon2";
import { HashingProvider } from "./hashing.provider";


@Injectable()
export class Argon2Provider extends HashingProvider {
    public async hashPassword(password: string | Buffer): Promise<string> {
        return argon2.hash(password);
    }

    public async comparePassword(password: string, hash: string): Promise<boolean> {
        return argon2.verify(hash, password);
    }
}
