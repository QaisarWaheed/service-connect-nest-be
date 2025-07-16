import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/account/guards/jwt-guard/jwt-guard.guard';
import { OfferService } from '../services/offer.service';
import { CreateOfferDto } from '../dto/CreateOfferDto';
import { Request } from 'express';
import { UpdateOfferDto } from '../dto/UpdateOfferDto';
@ApiTags('Offer')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Get('/all-offers')
  async allOffers() {
    return await this.offerService.getOffers();
  }

  @Get('/get-offer-by-id')
  async getOfferById(@Param('id') id: string) {
    return await this.offerService.getOfferById(id);
  }

  @Post('/create-offer')
  async createOffer(@Body() data: CreateOfferDto, @Req() req: Request) {
    return await this.offerService.createOffer({
      ...data,
      userId: req.user._id
    });
  }

  @Put('/update-offer')
  async updateOffer(@Param('id') id: string, @Body() data: UpdateOfferDto) {
    return await this.offerService.updateOffer(id, { ...data });
  }

  @Delete('/delete-offer')
  async deleteOffer(@Param('id') id: string) {
    return await this.offerService.deleteOffer(id);
  }
}
