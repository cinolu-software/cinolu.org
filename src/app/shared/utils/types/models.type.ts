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
  roles: string[];
  projects: IProject[];
  positions: IPosition[];
  expertises: IExpertise[];
}

export interface IPost extends IBase {
  title: string;
  slug: string;
  views: number;
  content: string;
  image: string;
  commentsCount: number;
  viewsCount: number;
  comments: IComment[];
  categories: ICategory[];
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
  program: IProgram;
  categories: ICategory[];
}

export interface IEnterprise extends IBase {
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
  products: IProduct[];
}

export interface IProduct extends IBase {
  name: string;
  description: string;
  slug: string;
  image: string;
  price: number;
  gallery: IProductImage[];
  enterprise: IEnterprise;
  categories: ICategory[];
}

export interface IProductImage extends IBase {
  image: string;
  product: IProduct;
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
