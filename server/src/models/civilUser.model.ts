import mongoose from "mongoose";
import {
  CivilUserType,
  EducationType,
  ProjectsType,
  workExperienceType,
} from "../shared/types";

const workExperienceSchema = new mongoose.Schema<workExperienceType>({
  jobTitle: {
    type: String,
    required: true,
  },

  company: {
    type: String,
    required: true,
  },

  experiance: {
    type: String,
    default: "1 Year",
  },

  location: {
    type: String,
    required: true,
  },
});

const projectsSchema = new mongoose.Schema<ProjectsType>({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  startDate: {
    type: Date,
    required: true,
  },

  endDate: {
    type: Date,
    required: true,
  },

  role: {
    type: String,
    required: true,
  },

  client: {
    type: String,
    default: "",
  },

  teamSize: {
    type: Number,
    required: true,
  },
});

const educationDetails = new mongoose.Schema<EducationType>({
  degree: {
    type: String,
    default: "",
  },

  fieldOfStudy: {
    type: String,
    default: "",
  },

  university: {
    type: String,
    default: "",
  },

  collegeName: {
    type: String,
    default: "",
  },
});

const civilUserSchema = new mongoose.Schema<CivilUserType>({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },

  password: {
    type: String,
    required: true,
  },

  fullName: {
    type: String,
    required: true,
  },

  dateOfBirth: {
    type: Date,
    required: true,
  },

  photoUrl: {
    type: String,
    default:
      "https://t3.ftcdn.net/jpg/05/79/55/26/360_F_579552668_sZD51Sjmi89GhGqyF27pZcrqyi7cEYBH.jpg",
  },

  city: {
    type: String,
    required: true,
  },

  state: {
    type: String,
    required: true,
  },

  country: {
    type: String,
    required: true,
  },

  bio: {
    type: String,
    default: "",
  },

  role: {
    type: String,
    default: "engineer",
  },

  skills: [{ type: String, default: "" }],

  certifications: [{ type: String, default: "" }],

  languages: [{ type: String, required: true }],

  education: [educationDetails],
  workExperience: [workExperienceSchema],
  projects: [projectsSchema],
});

export const CivilUser = mongoose.model("CivilUser", civilUserSchema);
