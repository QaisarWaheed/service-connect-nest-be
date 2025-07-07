import mongoose from 'mongoose';

export abstract class Entity {
  declare _id: mongoose.Schema.Types.ObjectId;

  declare createdAt: Date;

  declare updatedAt: Date;
}
