import { ThrottlerOptions } from '@nestjs/throttler';

export default (): ThrottlerOptions[] => {
  return [
    {
      name: 'short',
      ttl: 1000,
      limit: 3,
    },
    {
      name: 'medium',
      ttl: 10000,
      limit: 20,
    },
    {
      name: 'long',
      ttl: 60000,
      limit: 100,
    },
  ];
};
