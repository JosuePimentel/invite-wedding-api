import { BaseModel } from './base.model';

type baseGuestsModel = {
  name: string;
  guests: string;
  accepted: boolean;
}

export type GuestsModel = {
  model: baseGuestsModel,
  dto: baseGuestsModel & BaseModel,
  patch: Partial<baseGuestsModel>
} 