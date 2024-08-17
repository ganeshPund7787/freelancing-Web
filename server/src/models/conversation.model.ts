import mongoose, {
  Document,
  Schema,
  Model,
  SchemaDefinitionProperty,
} from "mongoose";

// Define an interface representing a document in MongoDB.
interface IConversation extends Document {
  participants: mongoose.Types.ObjectId[];
  messages: mongoose.Types.ObjectId[] | any;
  createdAt?: Date;
  updatedAt?: Date;
}

// Create a Schema corresponding to the document interface.
const conversationSchema = new Schema<IConversation>(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId as SchemaDefinitionProperty<
          typeof mongoose.Schema.Types.ObjectId
        >,
        ref: "CivilUser" || "Client",
        required: true,
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

export const Conversation: Model<IConversation> = mongoose.model<IConversation>(
  "Conversation",
  conversationSchema
);
