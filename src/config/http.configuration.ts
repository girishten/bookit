import { ConfigService } from '@nestjs/config';

export default async (configService: ConfigService) => ({
  timeout: configService.get('http.timeout'),
  maxRedirects: configService.get('http.maxRedirects'),
});
