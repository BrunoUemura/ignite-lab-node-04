import { Body, Controller, Get, Post } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateNotificationBody } from './create-notification-body';
import { PrismaService } from './prisma.service';

@Controller('notifications')
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  async list() {
    return this.prismaService.notification.findMany();
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    // await this.prismaService.notification.create({
    //   data: {
    //     id: randomUUID(),
    //     content: 'You have a new friend request',
    //     category: 'social',
    //     recipientId: randomUUID(),
    //   },
    // });
  }
}
