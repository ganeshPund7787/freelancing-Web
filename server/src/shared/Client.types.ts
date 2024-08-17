export interface ClientType {
  _id: string;
  role?: string;
  isAdmin: Boolean;
  fullName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  company?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  profilePictureUrl?: string;
  website?: string;
  bio?: string;
}

export interface JobPostType {
  _id: string;
  heading: string;
  salary: string;
  experianceLevel: string;
  description: string;
  skills: string[];
  clientId: any;
  location: string;
  HoursePerWeak: number;
  projectDuration: string;
  lastUpdated: Date;
}
