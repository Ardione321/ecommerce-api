import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { REQUEST_USER_KEY } from "../constants/auth.constants";
import { ActiveUserData } from "../interfaces/active-user-data.interface";

/**
 * Custom parameter decorator for retrieving active user data from the request object.
 *
 * This decorator facilitates the extraction of user-specific information from the request 
 * by accessing the user data stored under the REQUEST_USER_KEY. It can optionally return 
 * a specific field of the ActiveUserData interface if a field name is provided. If no field 
 * is specified, the entire user object is returned.
 *
 * Usage:
 * - To retrieve the entire user object: @ActiveUser() user: ActiveUserData
 * - To retrieve a specific field, e.g., email: @ActiveUser('email') email: string
 *
 * @param field - An optional parameter representing the key of the ActiveUserData field to retrieve.
 * @param ctx - The execution context providing runtime information about the request being handled.
 * @returns The requested user field or the complete user object if no field is specified.
 */
export const ActiveUser = createParamDecorator(
    (field: keyof ActiveUserData | undefined, ctx: ExecutionContext) => {
        // Switch the context to HTTP to access the incoming request.
        const request = ctx.switchToHttp().getRequest();
        // Retrieve the user data from the request object using the REQUEST_USER_KEY.
        const user: ActiveUserData = request[REQUEST_USER_KEY];
        // Return the specified field of the user object if a field key is provided; otherwise, return the entire user object.
        return field ? user?.[field] : user;
    }
);
