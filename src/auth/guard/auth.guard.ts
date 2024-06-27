import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly apiKeyService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];
    if (!apiKey) {
      throw new UnauthorizedException('API key is missing');
    }

    try {
      const isValid = await this.apiKeyService.validateApiKey(apiKey);
      if (!isValid) {
        throw new UnauthorizedException('Invalid API key');
      }
      return true;
    } catch (error) {
      throw new InternalServerErrorException('Error validating API key');
    }
  }
}
