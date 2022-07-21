import { ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): Observable<any>;
}
