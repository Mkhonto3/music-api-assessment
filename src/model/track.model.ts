import mongoose from "mongoose";
import { nanoid } from "nanoid";
import { UserDocument } from "./user.model";

export interface TrackDocument extends mongoose.Document {
  user: UserDocument["_id"];
  name: string;
  album: string;
  artist: string;
  duration: number;
  artwork: string;
  audio: string;
  createdAt: Date;
  updatedAt: Date;
}

const TrackSchema = new mongoose.Schema(
  {
    trackId: {
      type: String,
      required: true,
      unique: true,
      default: () => nanoid(10),
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, default: true },
    album: { type: String, default: true },
    artist: { type: String, default: true },
    duration: { type: Number, default: true },
    artwork: { type: String, default: true },
    audio: { type: String, default: true }
  },
  { timestamps: true }
);

const Track = mongoose.model<TrackDocument>("Tracks", TrackSchema);

export default Track;
