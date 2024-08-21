export interface IUser {
  id: number;
  email: string;
  first_name: string;
  name: string;
  last_name: string;
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
  projects: IProject[];
  programs: IProgram[];
}

export interface IProject {
  id: number;
  name: string;
  description: string;
  start_at: Date;
  end_at: Date;
  created_at: Date;
  updated_at: Date;
  user: IUser;
  status: IStatus;
  attachments: IAttachment[];
  categories: ICategory[];
}

export interface IProgram {
  id: number;
  name: string;
  description: string;
  start_at: Date;
  end_at: Date;
  created_at: Date;
  updated_at: Date;
  user: IUser;
  attachments: IAttachment[];
}

export interface IAttachment {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  project: IProject;
  program: IProgram;
}

export interface ICategory {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  projects: IProject[];
}

export interface IProgram {
  id: number;
  name: string;
  description: string;
  start_at: Date;
  end_at: Date;
  created_at: Date;
  updated_at: Date;
  user: IUser;
  attachments: IAttachment[];
}

export interface IProject {
  id: number;
  name: string;
  description: string;
  start_at: Date;
  end_at: Date;
  created_at: Date;
  updated_at: Date;
  user: IUser;
  status: IStatus;
  attachments: IAttachment[];
  categories: ICategory[];
}

export interface IStatus {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  projects: IProject[];
}

export interface IRoles {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}
