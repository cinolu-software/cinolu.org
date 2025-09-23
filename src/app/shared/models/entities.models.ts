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

export interface IComment extends IBase {
  content: string;
  author: IUser;
  article: IArticle;
}

export interface IArticle extends IBase {
  title: string;
  slug: string;
  image: string;
  summary: string;
  content: string;
  published_at: Date;
  is_highlighted: boolean;
  tags: ITag[];
  comments: IComment[];
  author: IUser;
}

export interface IUser extends IBase {
  email: string;
  name: string;
  password?: string;
  biography?: string;
  gender?: string;
  referralsCount?: number;
  phone_number?: string;
  city?: string;
  country?: string;
  birth_date?: Date;
  referral_code?: string;
  referrals?: IUser[];
  referred_by?: IUser;
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
  is_highlighted?: boolean;
  program: ISubprogram;
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
  is_highlighted: boolean;
  subprograms: ISubprogram[];
  category: ICategory;
}

export interface ISubprogram extends IBase {
  name: string;
  description: string;
  slug: string;
  logo: string;
  is_published: boolean;
  is_highlighted: boolean;
  program: IProgram;
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
  is_highlighted: boolean;
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

export interface IHighlight {
  programs?: IProgram[];
  subprograms?: ISubprogram[];
  events?: IEvent[];
  projects?: IProject[];
  articles?: IArticle[];
}

export interface IHighlightCard {
  id: string;
  type: 'program' | 'subprogram' | 'event' | 'project' | 'article';
  title: string;
  description: string;
  image?: string | null;
  slug: string;
  link: string;
  dateStart?: string;
  dateEnd?: string;
}
