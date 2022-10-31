import mongoose from "mongoose";
import { nanoid } from "nanoid";
import { UserDocument } from "./user.model";
import { TrackDocument } from "./track.model";

export interface PlaylistDocument extends mongoose.Document {
  user: UserDocument["_id"];
  name: string;
  creator: string;
  playtime: number;
  trakiList: Array<TrackDocument>;
  createdAt: Date;
  updatedAt: Date;
}

const PlaylistSchema = new mongoose.Schema(
  {
    playlistId: {
      type: String,
      required: true,
      unique: true,
      default: () => nanoid(10),
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, default: true },
    creator: { type: String, default: true },
    playtime: { type: Number, default: true },
    trakiList: { type: mongoose.Schema.Types.ObjectId, ref: "Track" }
  },
  { timestamps: true }
);

const Playlist = mongoose.model<PlaylistDocument>("Playlists", PlaylistSchema);

export default Playlist;
