export interface IUser {
  id: string;
  email: string;
  name: string;
  password: string;
  phone_number: string;
  address: string;
  token: string;
  google_image: string;
  profile: string;
  verified_at: Date | null;
  created_at: Date;
  updated_at: Date;
  roles: IRoles[];
  programs: IProgram[];
}

export interface IRequiremnt {
  id: string;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export interface IProgram {
  id: string;
  name: string;
  description: string;
  image: string;
  started_at: Date;
  ended_at: Date;
  created_at: Date;
  updated_at: Date;
  user: IUser;
  attachments: IAttachment[];
  types: IType[];
  categories: ICategory[];
  requirements: IRequiremnt[];
}

export interface IType {
  id: string;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export interface ICategory {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface IAttachment {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  program: IProgram;
}

export interface IRoles {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}
