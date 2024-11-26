import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse<FastifyReply>(); // Fastify response
        const request = context.getRequest<FastifyRequest>(); // Fastify request

        const exceptionResponse = exception.getResponse();
        const error =
            typeof exceptionResponse === 'string' ? { message: exceptionResponse } : exceptionResponse;

        response.status(exception.getStatus()).send({
            ...error,
            statusCode: exception.getStatus(),
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}
