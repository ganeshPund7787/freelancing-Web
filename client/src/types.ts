import { ReactNode } from "react";

export type workExperienceType = {
  id?: string;
  jobTitle?: string;
  company?: string;
  experiance?: string;
  location?: string;
};

export type ProjectsType = {
  id?: string;
  _id?: string;
  title?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  role?: string;
  client?: string;
  teamSize?: number;
};

export type EducationType = {
  id?: string;
  degree?: string;
  fieldOfStudy?: string;
  university?: string;
  collegeName?: string;
};

export type CivilUserType = {
  _id?: string | any;
  email?: string;
  role?: string;
  isAdmin?: Boolean;
  password?: string;
  fullName?: string;
  dateOfBirth?: Date;
  photoUrl?: string;
  city?: string;
  state?: string;
  country?: string;
  bio?: string;
  workExperience?: workExperienceType[];
  education?: EducationType[];
  skills?: string[];
  certification?: string;
  projects?: ProjectsType[];
  languages?: string[];
  language?: string;
};

export type ClientType = {
  _id?: string | any;
  role?: string;
  isAdmin?: Boolean;
  fullName?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  company?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  profilePictureUrl?: string;
  website?: string;
  bio?: string;
};

export type PostType = {
  _id?: any;
  image?: string;
  userId?: any;
  description?: string | ReactNode;
  likes?: string[];
  comments?: {
    userId: string;
    comment: string;
  }[];
  user?: ClientType | CivilUserType;
};

export type JobPostType = {
  _id?: string;
  clientId?: any;
  heading?: string;
  salary?: string;
  description?: string;
  experianceLevel?: string;
  skills?: string[];
  HoursePerWeak?: number | undefined;
  location?: string;
  lastUpdated?: Date;
  user?: ClientType | CivilUserType;
};

export type MessageType = {
  _id: any;
  senderId: any;
  createdAt: Date | any;
  message: string;
  shouldShake: boolean;
};

export type GetUserProfile = {
  user: ClientType | CivilUserType | any;
  Posts?: PostType[];
  JobPosts: JobPostType[];
};
