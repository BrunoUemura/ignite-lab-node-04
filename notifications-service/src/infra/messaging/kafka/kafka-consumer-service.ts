import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: 'notifications',
        brokers: [String(process.env.KAFKA_HOST)],
        sasl: {
          mechanism: 'scram-sha-256',
          username: String(process.env.KAFKA_USER),
          password: String(process.env.KAFKA_PASS),
        },
        ssl: true,
      },
    });
  }

  async onModuleDestroy() {
    await this.close();
  }
}
