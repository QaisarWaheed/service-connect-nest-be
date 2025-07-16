import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Offer, OfferStatus } from '../entities/offer.entity';
import { MessageDto } from 'src/common/dtos/message.dto';
import { CreateOfferDto } from '../dto/CreateOfferDto';
import { UpdateOfferDto } from '../dto/UpdateOfferDto';
import { UpdateOfferStatusDto } from '../dto/UpdateOfferSatusDto';

@Injectable()
export class OfferService {
  constructor(
    @InjectModel(Offer.name) private readonly offerModule: Model<Offer>
  ) {}

  async getOffers(): Promise<Offer[]> {
    return await this.offerModule.find();
  }

  async getOfferById(id: string): Promise<Offer | null> {
    const offer = await this.offerModule.findById(id);
    if (!offer) {
      throw new NotFoundException();
    }
    return offer;
  }

  async createOffer(data: CreateOfferDto) {
    const newOffer = await this.offerModule.create(data);

    return newOffer;
  }

  async updateOffer(id: string, data: UpdateOfferDto) {
    const updatedOffer = await this.offerModule.findByIdAndUpdate(
      id,
      {
        ...data
      },
      { new: true }
    );
    if (!updatedOffer) {
      throw new NotFoundException('No Offer found to update');
    }
    return updatedOffer;
  }
  async acceptOrRejectOffer(id: string, data: UpdateOfferStatusDto) {
    const offer = await this.offerModule.findByIdAndUpdate(
      id,
      {
        ...data
      },
      { new: true }
    );
    return offer;
  }
  async deleteOffer(id: string): Promise<MessageDto> {
    const deleteOffer = await this.offerModule.findByIdAndDelete(id);
    if (!deleteOffer) throw new NotFoundException();
    return { message: 'deleted Successfully' };
  }
}
