import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tasks } from 'src/task/entity/tasks.entity';
import { Offer } from '../entities/offer.entity';
import { TasksService } from 'src/task/services/tasks/tasks.service';

@Injectable()
export class OfferService {
  constructor(
    @InjectModel(Offer.name) private readonly offerModule: Model<Offer>,
    private readonly taskService: TasksService
  ) {}

  async getOffers(): Promise<Offer[]> {
    return await this.offerModule.find();
  }

  async getOfferById(id: string): Promise<Offer | null> {
    const offer = await this.offerModule.findById(id);
    return offer;
  }

  async createOffer() {
    // const findTask = await this.taskService.getTaskById({id:string});
  }
}
