interface IBase {
  id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export interface ITag extends IBase {
  name: string;
}

export interface IComment extends IBase {
  content: string;
  author: IUser;
  article: IArticle;
}

export interface IArticle extends IBase {
  title: string;
  slug: string;
  image: string;
  content: string;
  published_at: Date;
  tags: ITag[];
  comments: IComment[];
  author: IUser;
}

export interface IUser extends IBase {
  email: string;
  name: string;
  password?: string;
  biography?: string;
  phone_number?: string;
  city?: string;
  country?: string;
  birth_date?: Date;
  reason: string;
  google_image?: string;
  profile?: string;
  roles: IRole[];
  ventures: IVenture[];
}

export interface IProject extends IBase {
  name: string;
  slug: string;
  cover?: string;
  description: string;
  started_at: Date;
  ended_at: Date;
  form_link?: string;
  report?: JSON;
  is_published: boolean;
  place?: string;
  program: IProgram;
  categories: ICategory[];
}

export interface IVenture extends IBase {
  name: string;
  slug: string;
  description: string;
  problem_solved: string;
  target_market: string;
  logo: string;
  cover: string;
  email: string;
  phone_number: string;
  website: string;
  linkedin_url: string;
  sector: string;
  founded_at: Date;
  location: string;
  stage: string;
  owner: IUser;
}

export interface IProgram extends IBase {
  name: string;
  description: string;
  slug: string;
  logo: string;
  is_published: boolean;
  projects: IProject[];
  events: IEvent[];
}

export interface IEvent extends IBase {
  name: string;
  slug: string;
  cover: string;
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
  label: string;
}

export interface ITag extends IBase {
  name: string;
}

export interface IArticle extends IBase {
  title: string;
  tags: [];
  content: string;
}
