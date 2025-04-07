interface IBase {
  id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export interface IUser extends IBase {
  email: string;
  name: string;
  password?: string;
  biography?: string;
  phone_number?: string;
  address?: string;
  google_image?: string;
  profile?: string;
  posts: IPost[];
  roles: IRole[];
  projects: IProject[];
  positions: IPosition[];
  expertises: IExpertise[];
}

export interface IPost extends IBase {
  title: string;
  slug: string;
  content: string;
  image: string;
  comments: IComment[];
  category: ICategory;
  author: IUser;
}

export interface IComment extends IBase {
  content: string;
  by: IUser;
  post: IPost;
}

export interface IField {
  type: string;
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
  options: string[];
}

export interface IProject extends IBase {
  name: string;
  slug: string;
  image?: string;
  description: string;
  started_at: Date;
  ended_at: Date;
  form?: IField[];
  report?: JSON;
  is_published: boolean;
  place?: string;
  phases: IPhase[];
  applications: IApplication[];
  program: IProgram;
  categories: ICategory[];
}

export interface IPhase extends IBase {
  name: string;
  description: string;
  started_at: Date;
  ended_at: Date;
  requirements: IRequirement[];
  documents: IDocument[];
  project: IProject;
}

export interface IDocument extends IBase {
  title: string;
  description: string;
  file_name: string;
  phase: IPhase;
}

export interface IRequirement extends IBase {
  name: string;
  description: string;
}

export interface IApplication extends IBase {
  answers: JSON;
  reviews: IReview[];
  project: IProject;
  applicant: IUser;
}

export enum IReviewStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export interface IReview extends IBase {
  status: IReviewStatus;
  note: number;
  comment: string;
  application: IApplication;
  reviewer: IUser;
}

export interface IProgram extends IBase {
  name: string;
  description: string;
  projects: IProject[];
  events: IEvent[];
}

export interface IEvent extends IBase {
  name: string;
  slug: string;
  image: string;
  place: string;
  description: string;
  started_at: Date;
  is_published: boolean;
  link: string;
  ended_at: Date;
  program: IProgram;
  categories: ICategory[];
}

export interface ICategory extends IBase {
  name: string;
}

export interface IRole extends IBase {
  name: string;
}

export interface IPosition extends IBase {
  name: string;
}

export interface IExpertise extends IBase {
  name: string;
}
