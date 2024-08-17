import mongoose, { SchemaDefinitionProperty } from "mongoose";
import { PostType } from "../shared/types";

const PostSchema = new mongoose.Schema<PostType>({
  userId: {
    type: mongoose.Schema.Types.ObjectId as SchemaDefinitionProperty<
      typeof mongoose.Schema.Types.ObjectId
    >,
    ref: "CivilUser" || "Client",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  comments: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId as SchemaDefinitionProperty<
          typeof mongoose.Schema.Types.ObjectId
        >,
        ref: "CivilUser" || "Client",
        required: true,
      },
      comment: {
        type: String as SchemaDefinitionProperty<StringConstructor>,
        required: true,
      },
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId as SchemaDefinitionProperty<
        typeof mongoose.Schema.Types.ObjectId
      >,
      ref: "CivilUser" || "Client",
      required: false,
    },
  ],
});

export const Post = mongoose.model<PostType>("Post", PostSchema);
