import { StageEnum } from '../enums/stage.enum';

export interface IProjectPayload {
  name: string;
  pitch: string;
  founding_date: Date;
  address: string;
  stage: StageEnum;
  socials: JSON;
  sectors: string[];
}
