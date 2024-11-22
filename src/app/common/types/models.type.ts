interface IBase {
  id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
export interface IApplication extends IBase {
  answers: JSON;
  reviews: IReview[];
  program: IProgram;
  applicant: IUser;
}

export enum ReviewStatus {
  PENDING = 'pending',
  SHORTLISTED = 'shortlisted',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected'
}

export interface IReview extends IBase {
  status: ReviewStatus;
  note: number;
  comment: string;
  application: IApplication;
  reviewer: IUser;
}

export interface IUser extends IBase {
  email: string;
  name: string;
  password: string;
  phone_number: string;
  address: string;
  token: string;
  google_image: string;
  profile: string;
  verified_at: Date | null;
  roles: IRoles[];
  programs: IProgram[];
  detail: IDetail;
}

export interface IDetail extends IBase {
  bio: string;
  social: ISocial;
  positions: IPosition[];
  expertises: IExpertise[];
}

export interface ISocial {
  name: string;
  link: string;
}

export interface IExpertise extends IBase {
  name: string;
  description: string;
}

export interface IPosition extends IBase {
  name: string;
  description: string;
}

export interface IRequiremnt extends IBase {
  name: string;
  description: string;
}

export interface IProgram extends IBase {
  name: string;
  description: string;
  image: string;
  started_at: Date;
  ended_at: Date;
  targeted_audience: string;
  user: IUser;
  types: IProgramType[];
  categories: IProgramCategory[];
  phases: IPhase[];
  partners: IPartners[];
}

export interface IPhase extends IBase {
  name: string;
  description: string;
  started_at: Date;
  ended_at: Date;
  requirements: IRequiremnt[];
  form: JSON;
}

export interface IPartners extends IBase {
  name: string;
  website_link: string;
  profile: string;
}

export interface IEvent extends IBase {
  name: string;
  description: string;
  location: string;
  attendees: number;
  online_link: string;
  event_type: string;
  attendees_number: number;
  image: string;
  started_at: Date;
  ended_at: Date;
  responsible: IUser;
  types: IEventType[];
}

export interface IProgramType extends IBase {
  name: string;
  description: string;
}

export interface IEventType extends IBase {
  name: string;
  description: string;
}

export interface IProgramCategory extends IBase {
  name: string;
}

export interface IAttachment extends IBase {
  name: string;
  program: IProgram;
}

export interface IRoles extends IBase {
  name: string;
}
