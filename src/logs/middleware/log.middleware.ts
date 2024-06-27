import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LogService } from '../service/logs.service';
import { UserLogService } from '../../userLogs/service/userLogs.service';

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

    res.send = (body?: any) => {
      // Call the original send method
      oldSend(body);

      // Perform async operations
      (async () => {
        await this.userService.checkRequestLimit(userId);

        await this.logService.createLog({
          userId,
          endpoint,
          method,
          requestBody,
          responseBody: body,
          statusCode: res.statusCode,
          timestamp: new Date(),
        });
      })();

      return res;
    };

    next();
  }
}
