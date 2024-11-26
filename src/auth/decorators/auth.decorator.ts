import { SetMetadata } from "@nestjs/common";
import { AuthType } from "../enums/auth-type.enum";
import { AUTH_TYPE_KEY } from "../constants/auth.constants";

/**
 * Custom decorator to set authorization metadata on route handlers.
 *
 * This decorator accepts one or more AuthType values and associates them
 * with the route handler, allowing for fine-grained access control.
 *
 * @param authTypes - A list of AuthType values indicating the required
 *                    authorization types for the route.
 * @returns A decorator function that applies the specified auth types
 *          as metadata to the route handler.
 */
export const Auth = (...authTypes: AuthType[]) => SetMetadata(AUTH_TYPE_KEY, authTypes);

