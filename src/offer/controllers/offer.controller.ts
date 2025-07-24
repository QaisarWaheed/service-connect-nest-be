import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/account/guards/jwt-guard/jwt-guard.guard';
import { OfferService } from '../services/offer.service';
import { CreateOfferDto } from '../dto/CreateOfferDto';
import { Request } from 'express';
import { UpdateOfferDto } from '../dto/UpdateOfferDto';
import { UpdateOfferStatusDto } from '../dto/UpdateOfferSatusDto';
import { TasksService } from 'src/task/services/tasks/tasks.service';

enum Status {
  Pending = 'Pending',
  Active = 'Active',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
  Revision = 'Revision'
}

@ApiTags('Offer')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('offer')
export class OfferController {
  constructor(
    private readonly offerService: OfferService,
    private readonly taskService: TasksService
  ) {}

  @Get('/all-offers')
  async allOffers() {
    return await this.offerService.getOffers();
  }

  @Get('/:id')
  async getOfferById(@Param('id') id: string) {
    return await this.offerService.getOfferById(id);
  }

  @Post('/create-offer')
  async createOffer(@Body() data: CreateOfferDto, @Req() req: Request) {
    if (req.user.role !== 'Seller') {
      throw new UnauthorizedException('A Buyer cannot create an Offer');
    }
    const offer = await this.offerService.createOffer({
      ...data,
      userId: req.user._id
    });
    console.log(offer);
    return offer;
  }

  @Put('/:id')
  async updateOffer(
    @Param('id') id: string,
    @Body() data: UpdateOfferDto,
    @Req() req: Request
  ) {
    if (req.user.role !== 'Seller') {
      throw new UnauthorizedException('A Buyer cannot udpate an Offer');
    }
    return await this.offerService.updateOffer(id, { ...data });
  }

  @Put('/accept-or-reject/:id')
  async acceptOrRejectOffer(
    @Param('id') id: string,
    @Body() data: UpdateOfferStatusDto
  ) {
    //some thing to do here

    const offer = await this.offerService.acceptOrRejectOffer(id, {
      ...data,
      offerStatus: data.offerStatus
    });
    if (offer) {
      const task = await this.taskService.getTaskById(offer.taskId.toString());

      if (task && offer.offerStatus === 'Accepted') {
        this.taskService.updateSellerId(
          offer.taskId.toString(),

          (task.sellerId = offer.userId.toString()),
          (task.taskStatus = Status.Active)
        );
      }
    }

    return offer;
  }
  @Delete('/:id')
  async deleteOffer(@Param('id') id: string) {
    return await this.offerService.deleteOffer(id);
  }
}
