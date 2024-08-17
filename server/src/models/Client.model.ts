import mongoose from "mongoose";
import { ClientType } from "../shared/Client.types";

const AddressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
});

const ClientSchema = new mongoose.Schema<ClientType>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: AddressSchema, required: true },
    role: { type: String, default: "client" },
    company: { type: String, default: "" },
    bio: { type: String, default: "" },
    website: { type: String, default: "" },
    profilePictureUrl: {
      type: String,
      default:
        "https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg",
    },
    isAdmin: { type: String, default: false },
  },
  { timestamps: true }
);

export const Client = mongoose.model("Client", ClientSchema);
