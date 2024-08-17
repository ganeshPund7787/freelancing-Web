export type workExperienceType = {
  id: string;
  jobTitle: string;
  company: string;
  experiance: string;
  location: string;
};

export type ProjectsType = {
  id: string;
  _id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  technologies: string[];
  role: string;
  client: string;
  teamSize: number;
};

export type CivilUserType = {
  email: string;
  role: string;
  isAdmin: Boolean;
  password: string;
  fullName: string;
  dateOfBirth: Date;
  photoUrl: string;
  city: string;
  state: string;
  country: string;
  bio: string;
  workExperience: workExperienceType[];
  education: EducationType[];
  skills: string[];
  certifications: string[];
  projects: ProjectsType[];
  languages: string[];
};

export type EducationType = {
  id: string;
  degree: string;
  fieldOfStudy: string;
  university: string;
  collegeName: string;
  duration: string;
  location: string;
};

export type PostType = {
  _id: any;
  image: string;
  userId: any;
  description: string;
  likes: string[];
  comments: {
    userId: string;
    comment: string;
  }[];
};
