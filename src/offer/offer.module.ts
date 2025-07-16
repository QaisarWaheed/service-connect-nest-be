import { Module } from '@nestjs/common';
import { OfferController } from './controllers/offer.controller';
import { OfferService } from './services/offer.service';
import { MongooseModule } from '@nestjs/mongoose';
import OfferSchema, { Offer } from './entities/offer.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Offer.name, schema: OfferSchema }])
  ],
  controllers: [OfferController],
  providers: [OfferService]
})
export class OfferModule {}
