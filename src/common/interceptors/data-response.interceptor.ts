import { ConfigService } from '@nestjs/config';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap, map } from 'rxjs';

@Injectable()
export class DataResponseInterceptor implements NestInterceptor {
  constructor(private readonly configService: ConfigService) {}

  /**
   * Intercepts the response and adds the application's environment, version, and name to it.
   * This is useful for debugging and logging purposes.
   *
   * @param context - The execution context.
   * @param next - The call handler.
   * @returns An observable that emits the modified response.
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { environment, apiVersion, appName } = this.configService.get('appConfig');

    return next.handle().pipe(
      map((data) => ({ environment, apiVersion, appName, data })),
    );
  }
}

