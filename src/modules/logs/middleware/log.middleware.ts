import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LogService } from '../service/logs.service';
import { UserLogService } from '../../userLogs/service/userLogs.service';
import { CreateLogDto } from '../dtos/createLogs.dto';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  constructor(
    private readonly logService: LogService,
    private readonly userService: UserLogService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const userId = req.headers['x-user-id'] as string; // Assumed user ID is sent in headers
    const { method, originalUrl: endpoint, body: requestBody } = req;
    const oldSend = res.send.bind(res); // Binding the response object

    const start = Date.now();

    res.send = (body?: any) => {
      // Call the original send method
      oldSend(body);

      // Perform async operations
      (async () => {
        try {
          await this.userService.checkRequestLimit(userId);

          const logData: CreateLogDto = {
            ip: req.ip,
            userId,
            endpoint,
            system_name: req.headers['x-system-name'] as string,
            method,
            requestBody,
            responseBody: body,
            statusCode: res.statusCode,
            // timestamp: new Date(),
            userAgent: req.headers['user-agent'] as string,
            duration: Date.now() - start,
          };

          await this.logService.createLog(logData);
        } catch (error) {
          // Optional: handle logging error, e.g., notify admin, retry, etc.
          console.error('Logging error:', error.message);
          throw new HttpException(
            'Failed to log request',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      })();

      return res;
    };

    next();
  }
}
